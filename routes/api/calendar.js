
import { Router } from 'express';
import {google, GoogleApis} from 'googleapis';
import dotenv from 'dotenv';
import * as routeutils from '../utils/routeutils'

dotenv.config();

const router = Router();
  /**
   * This route takes a access token obtained from the google login button
   * and produces a authentication client that can access google calendar information
   * on behalf of the user. The function currently contains test code that uploads an
   * event to the calender. In the future this should be implemented to fit our app usage
   * 
   * Below are example usage case of the route in the login.tsx file
   */

  /**
      const access_token = response.accessToken;
      console.log(access_token);
      const config = {
        headers: { 'Content-Type': 'application/json' },
      };
      const body = JSON.stringify({ token: access_token });
      axios.post('/api/calendar/action', body, config);
   */
  router.post('/getcalendar', async (req, res) => {
    try {
      const oauth2Client = routeutils.createOauthClient();
          oauth2Client.setCredentials( {
              access_token : req.body["token"]
            });  
            
          const calendar = google.calendar({version: 'v3', auth: oauth2Client});
          const events = calendar.events.list({ calendarId: 'primary'})
          events.then((value) => {
            res.status(200).json({googleresponse : value});})
        
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });
router.post('/addEvent', async (req, res) => {
    try {
       
        const oauth2Client = routeutils.createOauthClient();
          
          oauth2Client.setCredentials( {
              access_token : req.body["token"]
            });  
          const calendar = google.calendar({version: 'v3', auth: oauth2Client});
  
          const appointment = req.body["appointment"];
          const eventStartTime = new Date(appointment.startDate);
          const eventEndTime = new Date(appointment.endDate);
          const event = {
            summary: appointment.title,
            description: appointment.notes,
            colorId: 1,
            start: {
              dateTime: eventStartTime,
              timeZone: 'America/Denver',
            },
            end: {
              dateTime: eventEndTime,
              timeZone: 'America/Denver',
            },
          }
          
         calendar.events.insert({ calendarId: 'primary', resource: event });
        res.status(200).json({data: "success!!"});
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });

  router.post('/removeEvent', async (req, res) => {
    try {
        const oauth2Client = routeutils.createOauthClient();
           oauth2Client.setCredentials( {
             access_token : req.body["token"]
            });  
          const calendar = google.calendar({version: 'v3', auth: oauth2Client});
          const id = req.body["id"];
         calendar.events.delete({calendarId : 'primary', eventId : id});
        res.status(200).json({data: "success!!"});
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });

  router.post('/editEvent', async (req, res) => {
    try {

        const oauth2Client = routeutils.createOauthClient();

        oauth2Client.setCredentials( {
             access_token : req.body["token"]
        });  
        const calendar = google.calendar({version: 'v3', auth: oauth2Client});
        const id = req.body["id"];
        const appointment = req.body["appointment"];
          const eventStartTime = new Date(appointment.startDate);
          const eventEndTime = new Date(appointment.endDate);
          const event = {
            summary: appointment.title,
            description: appointment.notes,
            colorId: 1,
            start: {
              dateTime: eventStartTime,
              timeZone: 'America/Denver',
            },
            end: {
              dateTime: eventEndTime,
              timeZone: 'America/Denver',
            },
          }
        calendar.events.patch({calendarId : 'primary', eventId : id, resource : event});
        res.status(200).json({data: "success!!"});
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });

export default router;
