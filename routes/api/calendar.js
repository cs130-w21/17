
import { Router } from 'express';
import {google, GoogleApis} from 'googleapis';
import dotenv from 'dotenv';

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
        const oauth2Client = new google.auth.OAuth2(
          process.env.OAUTH_CLIENT_ID,
          process.env.OAUTH_CLIENT_SECRET,
          process.env.OAUTH_REDIRECT_URI
          );
          
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
router.post('/action', async (req, res) => {
    try {
       
        const oauth2Client = new google.auth.OAuth2(
            OAUTH_CLIENT_ID,
            OAUTH_CLIENT_SECRET,
            OAUTH_REDIRECT_URI
          );
          
          oauth2Client.setCredentials( {
              access_token : req.body["token"]
            });  
          const calendar = google.calendar({version: 'v3', auth: oauth2Client});
  

          const eventStartTime = new Date();
          eventStartTime.setDate(eventStartTime.getDay() + 2);
          const eventEndTime = new Date();
          eventEndTime.setDate(eventEndTime.getDay() + 2);
          eventEndTime.setMinutes(eventEndTime.getMinutes() + 45)
          const event = {
            summary: `Meeting with David`,
            location: `3595 California St, San Francisco, CA 94118`,
            description: `Meet with David to talk about the new client project and how to integrate the calendar for booking.`,
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
          
        //   Check if we a busy and have an event on our calendar for the same time.
          calendar.freebusy.query(
            {
              resource: {
                timeMin: eventStartTime,
                timeMax: eventEndTime,
                timeZone: 'America/Denver',
                items: [{ id: 'primary' }],
              },
            },
            (err, res) => {
              // Check for errors in our query and log them if they exist.
              if (err) return console.error('Free Busy Query Error: ', err)
          
              // Create an array of all events on our calendar during that time.
              const eventArr = res.data.calendars.primary.busy
          
              // Check if event array is empty which means we are not busy
              if (eventArr.length === 0)
                // If we are not busy create a new calendar event.
                return calendar.events.insert(
                  { calendarId: 'primary', resource: event },
                  err => {
                    // Check for errors and log them if they exist.
                    if (err) return console.error('Error Creating Calender Event:', err)
                    // Else log that the event was created.
                    return console.log('Calendar event successfully created.')
                  }
                )
          
              // If event array is not empty log that we are busy.
              return console.log(`Sorry I'm busy...`)
            }
          )

        res.status(200).json({data: "success!!"});
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });

export default router;
