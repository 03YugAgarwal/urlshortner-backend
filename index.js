const express = require("express");
let mongoose = require("mongoose");
var bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const cors = require('cors') 

const corsOptions = { 
  // origin:'https://abc.onrender.com',
  AccessControlAllowOrigin: '*',  
  origin: '*',  
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' 
}
app.use(cors(corsOptions))

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/', (req, res) => res.send('Hello World!'));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("DB Connected"));

function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

let URLSchema = mongoose.Schema({
    url: { type: String },
    short: { type: String },
});

let URL = mongoose.model('url', URLSchema);

app.post("/create", async (req, res) => {
    const short = generateRandomString(5);
    const url = req.body.url;
    const newURL = new URL({ url: url, short: short });

    try {
        await newURL.save();
        res.json(newURL);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while saving the URL." });
    }
});


app.get('/:url',(req,res)=>{
    const url = req.params.url;
    // console.log(url);
    URL.findOne({short: url}).then((data)=>{
        res.json({url: data.url})
    })
})


app.listen(process.env.PORT, () => console.log("Started"));
