import { Router } from 'express';

// Invitation Model
import Invitation from '../../models/Invitation';

require('dotenv').config();
const router = Router();
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');

// Body Parser Middleware
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


/**
 * Creates transporter that connects to GMAIL services *
 * @type {transporter}
 */
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EM_EMAIL,
        pass: process.env.EM_PW
    }
});

/**
 * @route   GET api/invitations
 * @desc    Get All Invitations
 * @access  Public
 */

router.route('/').get((req, res) => {
    Invitation.find()
        .then(invitations => res.json(invitations))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.post('/delete', async (req, res) => {
    try {
      const invite = await Invitation.findById(req.body['id']);
      console.log(req.body['id']);
      if (!invite) throw Error('No item found');
  
      const removed = await invite.remove();
      if (!removed)
        throw Error('Something went wrong while trying to delete the item');
  
      res.status(200).json({ success: true });
    } catch (e) {
      res.status(400).json({ msg: e.message, success: false });
    }
  });
  

/**
 * @route   POST api/invitations
 * @desc    Create An Invitation & emails invitation link (appends id to invitation page)
 * @access  public
 */
router.route('/add').post((req, res) => {
    // info from front end
    const invitee_name = req.body.invitee_name;
    const invitee_email = req.body.invitee_email;
    const inviter_name = req.body.inviter_name;
    const inviter_email = req.body.inviter_email;
    // const expiration_date = Date.parse(req.body.expiration_date);

    let error_message = "";
    let error_flag = false;


    /**
     * Invitation Object
     * @type {Document}
     */
    const newInvitation = new Invitation({
        invitee_name,
        invitee_email,
        inviter_email
        // expiration_date
    });


    /**
     * Saves invitation to database
     */
    newInvitation.save()
        .then(() => error_message += 'Invitation added!')
        .catch(err => {
            error_flag = true;
            error_message = "Error adding invitation to db. Please check your inputs."
        });


    // Email contents
    let email_html = '<p> Hello ' + invitee_name + '. <br>' +
        'Click the following link to make an appointment with ' + inviter_name + ': ' +
        '<a href=' +
        'http://www.easy-meet-w21project.com/invitation?id=' + newInvitation._id + '>' +
        'EasyMeet</a></p>';

    // Use local host if in testing mode
    if (process.env.NODE_ENV !== 'production') {
        email_html = '<p> Hello ' + invitee_name + '. <br />' +
            'Click the following link to make an appointment with ' + inviter_name + ': ' +
            '<a href=' +
            'http://localhost:3000/invitation?id=' + newInvitation._id + '>' +
            'EasyMeet</a></p>';
    }

    /**
     * Email Options
     * @type {{subject: string, from: string, html: string, to: (*|string|string), text: string}}
     */
    const mailOptions = {
        from: 'easymeethermes@gmail.com',
        to: invitee_email,
        subject: 'EasyMeet Invitation!',
        text: 'insert link here'
        , html: email_html
    };

    /**
     * Sends email using previously defined mail options.
     * @param mailOptions (includes from, to, subject, text and html data)
     */
    if (!error_flag)
    {
        transporter.sendMail(mailOptions, function (err, data) {
            if (!error_flag) {
                if (err) {
                    error_message += 'Error sending invitation to the email: ' + invitee_email + '. Please check your inputs.';
                    error_flag = true;

                } else {
                    error_message += 'Email sent.';
                }
            }

            if (error_flag)
                return res.status(400).json(error_message); // error
            else {
                return res.status(200).json(error_message); // success
            }
        });
    }
});

export default router;
