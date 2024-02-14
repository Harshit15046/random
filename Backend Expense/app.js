const express = require("express");
const userRoutes= require('./routers/user');
const expenseRoutes= require('./routers/expense');
const User = require("./Models/users"); 
const sequelize = require("./util/database");
const app = express();

const cors = require('cors');
const Expense = require("./Models/expenses");


// Enable CORS for all routes
app.use(cors());

const port = 3000;
//app.use(cors());
app.use(express.json());

//const dotenv= require('dotenv');
//dotenv.config();

app.use('/user', userRoutes);
app.use('/expense',expenseRoutes);
app.get('/',function(req,res){
    res.send("api is running");
});

User.hasMany(Expense);
Expense.belongsTo(User);

// sequelize.sync({force:true})
//    .then(() => {
//     app.listen(3000);
//    })
//    .catch(err=>
//     {
//         console.log(err);
//     })
sequelize
    .sync()
    .then(() => {
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
   