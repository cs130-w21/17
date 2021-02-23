import { Router } from 'express';
import Invitation from '../../models/Invitation';
import User from '../../models/User';
require('dotenv').config();
const router = Router();
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose')

//router.use(bodyParser.urlencoded({ extended: false }));
//router.use(bodyParser.json());

/*pass the objectid from invitationpage.tsx
const i = {
            id : this.getId()
        }
        //let id = this.getId();
        axios.post('/api/invitationpage/token', i)
 */
router.route('/token').post((req, res) => {

    //get objectid from front end
    let id = req.body.id;
    let email = '';
    let token = '';
    console.log(id);

    //use id to find the email from mongodb database.
    Invitation.findOne({'_id': String(id)},function(err, result) {
        if (err) throw err;
        email = result.inviter_email;
        //console.log(email);
        //use email to find token
        //email = 'b@';
        console.log(email);
        //console.log(email||'');
        User.findOne({'email': String(email||'')},function(err, result) {
            if (err) throw err;
            token = result.password;
            console.log(token);
        });

    });



    //if i got the token, i will be able to open the calander



});


export default router;