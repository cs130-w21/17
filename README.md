# EasyMeet

## Installation and usage locally
The repo requires specific environment variables in order to work. Visit the team google drive and open a file called "logins". This file contains all the variables needed, without them, you would be unable to trigger the build.\n
To start hosting our app locally, use the following command in your desired location:
```
git clone https://github.com/cs130-w21/17
```
Always run:
```
git pull
```
This command ensures that you have the latest version available, though it is unlikely that there will be newer versions from this point on. Open terminal and change your directory into the top level folder of our application. Run these commands to install the required libraries and dependencies:
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
