require('dotenv').config()
const express = require("express");
const app = express();
const connectDB = require('./Db/Db');
const userRoutes = require('./Routes/userRouter');
const postRoutes = require('./Routes/postRoutes');
const adminRoutes = require('./Routes/adminRoutes');


connectDB();
app.use(express.json());

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
