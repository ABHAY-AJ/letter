require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
const MongoStore = require("connect-mongo");
require("./passportConfig");

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

app.use(
    session({
      secret: "your_secret_key",
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }), // Persistent session storage
      cookie: { secure: false }, // Change to `true` if using HTTPS
    })
  );

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=>{
    console.log("db connected")}
)
.catch((err)=>{
    console.log("db not connected",err)
});

app.use("/auth", require("./routes/auth"));
app.use("/letters", require("./routes/letters"));


// deployment config
const path = require("path");
__dirname = path.resolve();

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/build")));
    app.get("*", (req, res)=>{
        res.sendFile(path.join(__dirname, "frontend", "build", "index.html"));
    });
}

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
