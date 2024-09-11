const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors())
const PORT = 3001;

const userRoutes = require('./src/routes/UserRoutes');
const creatorProfileRoutes = require('./src/routes/CreatorProfileRoutes');


app.use('/user', userRoutes);
app.use('/creator-profile', creatorProfileRoutes);





mongoose.connect("mongodb+srv://samir:samir@cluster0.key63fx.mongodb.net/shrinil_project").then((data)=>{
    console.log("Database connected");
}).catch((err)=>{
    console.log(err);
})


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
