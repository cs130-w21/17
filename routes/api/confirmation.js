import { Router } from 'express';

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
 * @route   POST api/confirmation
 * @desc    Sends the inviter and invitee confirmation email for new event.
 * @access  public
 */
router.route('/added').post((req, res) => {
    // info from front end
    const invitee_name = req.body.invitee_name;
    const invitee_email = req.body.invitee_email;
    const inviter_name = req.body.inviter_name;
    const inviter_email = req.body.inviter_email;
    const event_start = req.body.event_start;
    const event_end = req.body.event_end;
    const event_location = req.body.event_location;

    // invitee email content
    let invitee_email_html = '<p> Hello ' + invitee_name + '. <br>' +
        'You have successfully made an appointment with ' + inviter_name + '.<br>' +
        'Your appointment is from ' + event_start + ' to ' + event_end;

    if (event_location !=null)
        invitee_email_html += ' at ' + event_location;

    invitee_email_html +='.</p>';

    // inviter email content
    let inviter_email_html = '<p> Hello ' + inviter_name + '. <br>' +
        invitee_name + ' recently scheduled a new appointment with you.<br>' +
        'Your appointment is from ' + event_start + ' to ' + event_end;
    if (event_location !=null)
        inviter_email_html += ' at ' + event_location;
    inviter_email_html +='<br>View your calendar for more details!' + '</p>';


    /**
     * Email Options for the INVITEE
     * @type {{subject: string, from: string, html: string, to: (*|string|string), text: string}}
     */
    const invitee_mailOptions = {
        from: process.env.EM_EMAIL,
        to: invitee_email,
        subject: 'EasyMeet Confirmation!',
        text: ''
        , html: invitee_email_html
    };

    /**
     * Email Options for the INVITER
     * @type {{subject: string, from: string, html: string, to: (*|string|string), text: string}}
     */
    const inviter_mailOptions = {
        from: process.env.EM_EMAIL,
        to: inviter_email,
        subject: 'EasyMeet: You have a new meeting!',
        text: ''
        , html: inviter_email_html
    };

    // sends confirmation email to invitee
    transporter.sendMail(invitee_mailOptions, function (err, data) {
        if (err) {
            console.log('Error sending confirmation email to invitee');
        }
        else {
            console.log('Email confirmation sent to invitee');
        }
    });

    // send confirmation to inviter
    transporter.sendMail(inviter_mailOptions, function (err, data) {
        if (err) {
            console.log('Error sending confirmation email to inviter');
        }
        else {
            console.log('Email confirmation sent to inviter');
        }
    });
});

export default router;