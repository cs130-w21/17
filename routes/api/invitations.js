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

/**
 * @route   POST api/items
 * @desc    Create An Invitation & emails invitation link (appends id to invitation page)
 * @access  public
 */
router.route('/add').post((req, res) => {
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


    // console.log("Invitation id: ");
    // console.log(newInvitation._id);

    // Email contents
    let email_html = '<p> Hello ' + invitee_name + '. <br>' +
        'Click the following link to make an appointment with ' + inviter_name + ': ' +
        '<a href=' +
        'http://www.easy-meet-w21project.com/invitation?id=' + newInvitation._id + '>' +
        'EasyMeet</a></p>';

    // Use local host if in testing mode
    if (process.env.NODE_ENV !== 'production') {
        console.log('in testing mode');
        email_html = '<p> Hello ' + invitee_name + '. <br />' +
            'Click the following link to make an appointment with ' + inviter_name + ': ' +
            '<a href=' +
            'http://localhost:3000/invitation?id=' + newInvitation._id + '>' +
            'EasyMeet</a></p>';
        console.log('email string');
        console.log(email_html);
    }


    /**
     * Email Options
     * @type {{subject: string, from: string, html: string, to: (*|string|string), text: string}}
     */
    const mailOptions = {
        from: 'easymeethermes@gmail.com',
        to: invitee_email,
        subject: 'Hello EasyMeet Invitation!',
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
                    console.log('Error sending email');
                    error_message += 'Error sending invitation to the email: ' + invitee_email + '. Please check your inputs.';
                    error_flag = true;

                } else {
                    console.log('Email sent');
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

// I JUST TOOK THESE OFF THE TUTORIAL, DOES NOT DO ANYTHING YET

// router.route('/:id').get((req, res) => {
//     Invitation.findById(req.params.id)
//         .then(invitation => res.json(invitation))
//         .catch(err => res.status(400).json('Error: ' + err));
// });
//
// router.route('/:id').delete((req, res) => {
//     Invitation.findByIdAndDelete(req.params.id)
//         .then(() => res.json('Invitation deleted.'))
//         .catch(err => res.status(400).json('Error: ' + err));
// });


export default router;
