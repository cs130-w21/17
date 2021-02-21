import app from './app';
import config from './config';

const { PORT } = config;

const portNum = PORT || 5000;
console.log("PORT NO: ");
console.log(portNum);
app.listen(portNum, () => console.log(`Server started on PORT ${portNum}`));
