# EasyMeet

## Installation and usage locally
**Disclaimer: Building and testing our app requires specific environment variables to work. Only the developers have access to these variables. Unfortunately we cannot publish this information as it contains the team's sensitive information. You can however, visit our website linked below to see what we have launched. In addition, we have two databases: one for testing and one for the production version. If you decide to register on localhost, then you will NOT be able to register on the production version, our website, and vice versa.**    
To start hosting our app locally, use the following command in your desired location:
```
git clone https://github.com/cs130-w21/17
```
Open terminal and change your directory into the top level folder of our application. Run these commands to install the required libraries and dependencies:
```
npm install
npm run client-install
```
The first command is for the backend, and the second command is a custom script to install the frontend dependencies without having to change directories. All that remains is to run the web app! To do so, run the following command in terminal:
```
npm run dev
```
This opens the EasyMeet homepage in your browser on port 3000. Since our app is not yet verified by Google, the common man would not be able to login and view their Google calendar through our website. However, if you are either Keerti or Doruk, then we have whitelisted your emails to allow registration and continue navigating our app. To see more information on how to navigate our website, turn to our GitHub Wiki's page labelled 'User Manual'.

## Testing
**Disclaimer: Again, if you do not have our environment variables, most of these tests will be unlikely to succeed.**  
If you would like to run the test cases we have built for our app, then the directory you are currently on determines which test cases you run. To test the backend, simply remain in the top level folder and run:
```
npm run test
```
This runs the Jest framework that tests our backend test suites. For the front end, simply change directory into /client and then run the same command.

## Our Website
If you would just like to skip hosting locally and see the website we have launched, then visit [Easy Meet](http://www.easy-meet-w21project.com/)!

## API Documentation
Visit our [GitHub Pages](https://cs130-w21.github.io/17/index.html) website to see the API documentation. It is separated between Client and Server documentation.

## User Manual
[User Manual](https://github.com/cs130-w21/17/wiki/User-Manual)

## Citations
We used [this](https://www.youtube.com/watch?v=PBTYxXADG_k&list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE&ab_channel=TraversyMedia) tutorial to set up skeleton code for our project.
The repo for it is [here](https://github.com/bradtraversy/mern_shopping_list).
