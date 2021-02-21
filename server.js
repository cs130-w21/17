import app from './app';
import config from './config';

const { PORT } = config;
const detect = require('detect-port');

const portNum = PORT || 5000;
console.log("PORT NO: ");
console.log(portNum);

detect(portNum, (err, _port) => {
    if (err) {
        console.log(err);
    }

    if (portNum === _port) {
        app.listen(portNum, () => console.log(`Server started on PORT ${portNum}`));
    }
});

