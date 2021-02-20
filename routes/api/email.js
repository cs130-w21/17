/** TEMPORARY USE FOR REFERENCE, CAN DELETE LATER**/

// "hides" the email we use if we put .env in .gitignore
require('dotenv').config();


const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');


// import { Router } from 'express';

//
const router = express();



// View engine setup
router.engine('handlebars', exphbs());
router.set('view engine', 'handlebars');
router.set('port', 3000);

// // Static folder
// router.use('../../../client', express.static(path.join(__dirname, 'client')));

let server = router.listen(router.get('port'), function() {
    let port = server.address().port;
    console.log('this port is open: ' + port);
});

// Body Parser Middleware
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


router.get('.', (req, res) => {

});

router.route('/new').post((req, res) => {

    const invitationData = {
        invitee_name: req.body.invitee_name,
        invitee_email: req.body.invitee_email
    }

    console.log("Testing posting email");
    // console.log(invitationData);
    //   const output = `
    //   <p>You have a new contact request</p>
    //   <h3>Contact Details</h3>
    //   <ul>
    //     <li>Name: ${req.body.name}</li>
    //     <li>Company: ${req.body.company}</li>
    //     <li>Email: ${req.body.email}</li>
    //     <li>Phone: ${req.body.phone}</li>
    //   </ul>
    //   <h3>Message</h3>
    //   <p>${req.body.message}</p>
    // `;
});




// Connects to GMAIL Service
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EM_EMAIL,
        pass: process.env.EM_PW
    }
});

// What to send
let mailOptions = {
    from: 'easymeethermes@gmail.com',
    to: 'emailmeav1@gmail.com',
    subject: 'TESTING SUBJECT',
    text: 'TESTING BODY'
};

// Sending Email
transporter.sendMail(mailOptions,function(err, data){
    if (err){
        console.log('Error sending email');
    }
    else{
        console.log('Email sent')
    }
});

// export default router;