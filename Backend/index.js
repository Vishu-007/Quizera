const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

connectToMongo();

const app = express();
app.use(cors());
app.use(express.json());

// CORS
const allowedOrigins = [
  "http://localhost:3000",                
  "https://quizera-kk3p.vercel.app/"     
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); 
    if (allowedOrigins.includes(origin)) {
      callback(null, true); // 
    } else {
      callback(new Error("Not allowed by CORS")); 
    }
  },
  credentials: true,
};

//Port No.
const port = process.env.PORT || 5000;

//Routes
app.use("/api/auth", require("./routes/auth"));

app.use("/api/host", require("./routes/host"));

app.use("/api/join", require("./routes/join"));

app.use("/api/submit", require("./routes/submit"));

app.use("/api/dashboard", require("./routes/dashboard"));

app.use("/api/leaderboard", require("./routes/leaderboard"));

app.use("/api/unpublish", require("./routes/expire"));

//Listen
app.listen(port, () => {
  console.log(`conected with port no: ${port}`);
});
