
import { Router } from 'express';
import {google, GoogleApis} from 'googleapis';
import dotenv from 'dotenv';
import * as routeutils from '../utils/routeutils'

dotenv.config();

const router = Router();

  /**
   * Returns a user's google calendar events.
   *
   * @route   {POST} api/calendar/getcalendar
   * @routeparam {request} req - contains a field 'token' which contains an access token for the calendar.
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


/**
 * Adds an event to a user's Google Calendar.
 *
 * @route   {POST} api/calendar/addEvent
 * @routeparam {request} req - contains a field 'token' which contains an access token for the calendar,
 * as well as a field 'event' which contains data about the event.
 */
router.post('/addEvent', async (req, res) => {
    try {
        const oauth2Client = routeutils.createOauthClient();
          oauth2Client.setCredentials( {
              access_token : req.body["token"]
            });  
          const calendar = google.calendar({version: 'v3', auth: oauth2Client});

         calendar.events.insert({ calendarId: 'primary', resource: req.body["event"] });
        res.status(200).json({data: "success!!"});
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });

/**
 * Removes an event from a user's Google Calendar.
 *
 * @route   {POST} api/calendar/removeEvent
 * @routeparam {request} req - contains a field 'token' which contains an access token for the calendar,
 * and a field 'id' which is the id of the event to remove.
 */

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

/**
 * Edits an event on a user's Google Calendar.
 *
 * @route   {POST} api/calendar/editEvent
 * @routeparam {request} req - contains a field 'token' which contains an access token for the calendar,
 * a field 'id' which is the id of the event to edit, and 'event' which contains the new event info.
 */

  router.post('/editEvent', async (req, res) => {
    try {

        const oauth2Client = routeutils.createOauthClient();

        oauth2Client.setCredentials( {
             access_token : req.body["token"]
        });  
        const calendar = google.calendar({version: 'v3', auth: oauth2Client});
        calendar.events.patch({calendarId : 'primary', eventId : req.body["id"], resource : req.body["event"]});
        res.status(200).json({data: "success!!"});
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });

export default router;
