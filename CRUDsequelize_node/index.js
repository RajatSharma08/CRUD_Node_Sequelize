const express = require("express");
const { json } = require("express");
const { DataTypes } = require('sequelize');
const Sequelize = require("sequelize");
const app = express();
const User = require('./user');
const dbConf = require('./dbConf.js');
//const cors = require("cors");



//import user from "./public/user.js";

 //app.use(cors());
 app.use(json());
 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

  app.use(express.static('public'));
 
  app.set('view engine', 'ejs');

//functions

// const sequelize = new Sequelize(dbConf.DATABASE, dbConf.USER, dbConf.PASSWORD, {
//   host: dbConf.HOST,
//   dialect: dbConf.DIALECT
// });

const syncUser= async (req,res) =>{
  try{
    await model.User.sync({ alter: true });
    console.log("The table for the User model was just updated!");
  } catch (error){
    console.error('Table was not updated!:', error);
  }
};


// sequelize.query('SET autocommit = 1', { type: Sequelize.QueryTypes.RAW });

//create table

const addUser = async (req, res) => {
  const { userID, userName, userDOB, email, contact, country, updatedAt, createdAt } = req.body;
  try {
    const newUser = User.build({
      userID,
      userName,
      userDOB,
      email,
      contact,
      country,
      updatedAt,
      createdAt
    });

    await newUser.validate();
    await newUser.save();

    console.log('User created:', newUser.toJSON());
    res.redirect('/users');
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      const validationErrors = err.errors.map((error) => error.message);
      console.log('Validation Errors:', validationErrors);
      res.status(400).send('Validation Error: ' + validationErrors.join(', '));
    } else {
      console.error(err);
      res.status(500).send('Error adding user');
    }
  }
};


//fetchUsers
const users = async (req, res) => {
  try {
    const allUsers = await User.findAll();
    res.send(allUsers);
  } catch (err) {
    console.log(err);
  }
};

//updateUsers
const update = async (req, res) => {
  const { userID } = req.params;
  const updatedFields = req.body;

  try {
    const userToUpdate = await User.findByPk(userID);

    if (!userToUpdate) {
      throw new Error('User not found');
    }

    await userToUpdate.update(updatedFields);

    console.log('User updated:', userToUpdate.toJSON());
    console.log('working hai bro!!');
    res.redirect('/users');
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      const validationErrors = err.errors.map((error) => error.message);
      console.log('Validation Errors:', validationErrors);
      res.status(400).send('Validation Error: ' + validationErrors.join(', '));
    } else {
      console.error(err);
      res.status(500).send('Error updating user');
    }
  }
};


//deleteUsers
const deleteUser = async (req, res) => {
  const { userID } = req.params;
  try {
    const deletedUser = await User.destroy({
      where: { userID }
    });
    if (deletedUser === 0) {
      throw new Error('No records were Deleted');
    }
    console.log(deletedUser + ' record(s) deleted');
    console.log('working hai bro!!!');
    res.redirect('/users');
  } catch (err) {
    console.log(err);
    console.log('Nahi working hai bro!!!');
    res.status(500).send('Error deleting user: ' + err.message);
  }
};




//routes.js

app.post("/create", addUser);
app.get("/users",users );
app.put("/update/:userID",update);
app.delete("/delete/:userID", deleteUser);

// console.log(User === sequelize.models.User);

// server
app.listen(3000, function(){
	console.log('Yaay, Server running at port 3000: http://127.0.0.1:3000')
})

module.exports = app;







// const deleteUser = async (req, res) => {
//   const { userID } = req.params;
//   try {
//  User.findByPk(userID).then(user=>{
//   if(!user){
//     throw new Error('UserID invalid');
    
//   }
//  })
//     const deletedUser = await User.destroy({
//       where: { userID }
//     });
//     console.log(deletedUser + ' record(s) deleted');
//     console.log('working hai bro!!!');
//     res.redirect('/users');
//   } catch (err) {
//     console.log(err);
//     console.log('Nahi working hai bro!!!');
//     res.status(500).send('Error deleting user'+ Error );
//   }
// };



















//extras

// const sequelize = createConnection({
//   HOST: 'loc_mysql.smart24x7.com',
//   PORT: '3306',
//   USER: 'root',
//   PASSWORD: 'Rootunlock@22', 
//   DATABASE: 'test_rjt',
//   DIALECT: 'mysql'
// });

// sequelize.query('SET autocommit =1', console.log('Auto commit!!'), (error)=>{
// if (error){
//   console.error('Error enabling auto commit.',error);
// }
// });

// const addUser = async (req, res) => {
//   const { userID, userName, userDOB, email, contact, country } = req.body;

//   console.log('addUser userID : ', userID);
//   console.log('addUser userName : ', userName);
//   console.log('addUser userDOB : ', userDOB);
//   console.log('addUser email : ', email);
//   console.log('addUser contact : ', contact);
//   console.log('addUser country : ', country);

//   try {
//     const result = await sequelize.query(
//       "INSERT INTO users (userID, userName, userDOB, email, contact, country ) VALUES (?, ?, ?, ?, ?, ?)",
//       { replacements: [userID, userName, userDOB, email, contact, country], type: Sequelize.QueryTypes.INSERT }
//     );
//     console.log(result);
//     res.redirect('/users');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error adding user');
//   }
// };



// const users = async (req, res) => {
//   try {
//     const result = await sequelize.query("SELECT * FROM users", {
//       type: Sequelize.QueryTypes.SELECT,
//     });
//     res.send(result);
//   } catch (err) {
//     console.log(err);
//   }
// };
  
// const update = async (req, res) => {
//   const { userID } = req.params;
//   const { contact } = req.body;

//   console.log("req.params.userID:", req.params.userID);
//   console.log("req.body.contact:", req.body.contact);

//   try {
//     const result = await sequelize.query(
//       "UPDATE users SET contact = ? WHERE userID = ?",
//       { replacements: [contact, userID], type: Sequelize.QueryTypes.UPDATE }
//     );
//     console.log(result);
//     console.log(result.affectedRows + " record(s) updated");
//     console.log("working hai bro!!");
//     res.redirect("/users");
//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Error updating user");
//   }
// };



// const deleteUser = async (req, res) => {
  //   const { userID } = req.params;
//   console.log('req.params.userID: ', userID);

//   try {
//     const result = await sequelize.query(
//       "DELETE FROM users WHERE userID = :userID", {
//         replacements: { userID: userID },
//         type: Sequelize.QueryTypes.DELETE
//       }
//     );
    
//     console.log('working hai bro!!!');
//     console.log(result);
//     res.redirect('/users');

//   } catch (err) {
//     console.log(err);
//     res.status(500).send('Error deleting user');
//   }
// };
// await sequelize.users.destroy({
//   where: {
//     userID,
//   },
// })

// await sequelize.User.create({
//   userID,
//   userName,
//   userDOB,
//   email,
//   contact,
//   country,
// });


// # userID, userName, userDOB, email, contact, country
// // '1', 'Cardinal', '25/06/1995', 'Skagen21@gmail.com', '9690151515', 'Norway'
// // '2', 'knight', '29/05/1998', 'knight02@gmail.com', '9690181815', 'Iceland'
// // '3', 'pawn', '22/07/1996', 'pawn07@gmail.com', '9690181515', 'Vinland'
// INSERT INTO users VALUES ( '1', 'Cardinal', '25/06/1995', 'Skagen21@gmail.com', '9690151515', 'Norway');
// INSERT INTO users VALUES ( '2', 'knight', '29/05/1998', 'knight02@gmail.com', '9690181815', 'Iceland');
// INSERT INTO users VALUES ('3', 'pawn', '22/07/1996', 'pawn07@gmail.com', '9690181515', 'Vinland');
// // # userID, userName, userDOB, email, contact, country
//'4', '', '', '', '', ''
