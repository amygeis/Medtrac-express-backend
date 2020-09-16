require("dotenv").config();
const express = require("express");
const app = express();
const methodOverride = require("method-override");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const createError = require("http-errors");
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
}
const Medicine = require("./models").Medicine;
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(methodOverride("_method"));

// pillboxkeyid:58d2uwyiuxyy047ww6l592bdp
// pillboxkeysecrect:3vt0sdiglsc1wa3c0ch8lj2mvficq6dumn39nz4rcsinfigusz
// pillboxtoken:VIDIm0qBfE9pdzGQumbVpxZJj
// pillboxsecrettoken:ghQYpjEI6cWR_YeqVuqN1LfFLgHl5eWlMF0L


const verifyToken = (req, res, next) => {
  // console.log("cookie:", req.cookies)
  // let token = req.cookies.jwt;
  let token=req.headers.authorization
  console.log(req.headers)
  // COOKIE PARSER GIVES YOU A .cookies PROP, WE NAMED OUR TOKEN jwt
  //console.log("Cookies: ", req.cookies.jwt);

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
    if (err || !decodedUser) {
      return res.status(401).json({ error: "Unauthorized Request" });
    }
    req.user = decodedUser;
    // ADDS A .user PROP TO REQ FOR TOKEN USER
    console.log(decodedUser);

    next();
  });
};


// HOMEPAGE
app.get("/", (req, res) => {
  res.json({ message: "express api app is working" });
});

app.get("/api/getmedicine", (req,res)=>{
  Medicine.findAll({
    order: ['name']
}).then((medicines) =>{
        res.json({medicines})    
});
});

app.use("/api/auth", require("./controllers/authController.js"));
app.use("/api/users", verifyToken, require("./controllers/usersController.js"));
app.use("/api/medicine", verifyToken, require("./controllers/medicineController.js"))

app.listen(process.env.PORT, () => {
  console.log("Nodemon listening");
});
