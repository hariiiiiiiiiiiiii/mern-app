const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

app.get('/favicon.ico', (req, res) => {
    res.sendStatus(204).end(); // Send "No Content" for favicon requests
  });

const cors = require("cors");

app.use(cors());

const userRoute = require("./routes/userRoute");

app.use(express.json());

mongoose.connect(process.env.URI).then(() => {
    console.log("connected successfuly");
    app.listen(process.env.PORT || 8000 , (err)=>{
        if(err) console.log(err);
        console.log("running successfully at",process.env.PORT)
    });
})
.catch((error) => {
    console.log("error",error)
});

app.use(userRoute);


  

  app.get('/example', (req, res) => {
    if (someCondition) {
      return res.sendStatus(400).json({ error: 'Bad request' }); // Use `return` to stop execution
    }
    res.json({ message: 'Success' });
  });
  