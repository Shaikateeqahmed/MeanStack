const express = require('express');
const {connection} = require('./config/connection.js');
const {User} = require('./Routers/UserRouter.js');
const cors = require('cors');
const { UserDetails } = require('./Routers/UserDetailsRouter.js');
const { authenticate } = require('./middlewares/authentication.js');
const { ChatRoom } = require('./Routers/ChatRoomRouter.js');
const { ChatRouter } = require('./Routers/ChatRouter.js');
const { FeedBack } = require('./Routers/FeedbackRouter.js');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());
app.use('/feedback',FeedBack)
app.use('/user',User);
app.use(authenticate);
app.use('/userDetails',UserDetails);
app.use('/chatRoom',ChatRoom);
app.use('/chat',ChatRouter);
let port = process.env.Port;

app.listen(port,async()=>{
    try {
        console.log(`Server is running on Port ${port}`);
        await connection;
    } catch (error) {
        console.log(error);
    }
})