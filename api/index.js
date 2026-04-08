import express from 'express';
import mongoose from 'mongoose';
import dns from 'dns';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';    

dotenv.config();

dns.setServers(['8.8.8.8', '1.1.1.1']);
console.log('Using DNS servers for MongoDB SRV lookup:', dns.getServers());

mongoose.connect(process.env.MONGO, {
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.log('Error connecting to MongoDB:', error);
});

const app = express();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.use("/api/user", userRouter)
