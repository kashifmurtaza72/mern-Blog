import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js";

dotenv.config();
mongoose.connect(process.env.MONGO).then(() => {
    console.log("Mongodb is connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json()); // this is going to allow json as the input of the backend. 

app.get("/", function (req, res) {
  res.send("Hello World!");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// app.get("/test", (req, res) => {
//   res.json({message: 'API is working'});
// });

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes)