require('dotenv').config();
require('./database/database');
const express = require('express');
const userRouter = require('./routers/userRouter');
const inventoryRoute = require('./routers/inventoryRoute');
const donationRoute = require('./routers/donationRouter');
const analysisRoute = require('./routers/analyticsRouter');
const adminRoute = require('./routers/adminRoute')
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000

app.use(cors({
    origin: ["https://blood-bank-front-end-plum.vercel.app/"],
    methods:["POST","GET","DELETE"],
    credential: true
}));

app.use(express.json());

//Test Rute
app.get('/home',(req,resp)=>{

    resp.send('Hello Vaibhav')

})

//User Routes
app.use('/user',userRouter);

//Inventory Routes
app.use('/inventory',inventoryRoute);

//Donations Route
app.use('/donar',donationRoute)

//Analytics Route

app.use('/analysis',analysisRoute)


//Admin(Donar,Hospitals,Orgs) Routes

app.use('/donarList',adminRoute)

app.listen(PORT,()=>{console.log(`The Server is Running on PORT ${PORT}`)})