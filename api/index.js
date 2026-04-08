import express from 'express';
import mongoose from 'mongoose';
import dns from 'dns';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';  
import authRouter from './routes/auth.route.js';  

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({ 
    success: false,
    statusCode,
    message });
});
