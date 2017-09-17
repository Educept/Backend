const express = require('express');
const router = express.Router();
const firebase = require('firebase');
var database = firebase.database();
var bodyParser = require('body-parser');
const io = require('socket.io-client');
var socket = io('http://0.0.0.0:8000');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var provider = new firebase.auth.GoogleAuthProvider();
var userID;

var userIDs = []
var count = 0;

router.get('/questions', function(req,res,next){
  res.send('hello');
});

var user = firebase.auth().currentUser;
router.get('/test', function(req,res,next){
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log(user);
    res.send(user);
  } else {
    // No user is signed in.
    console.log(error);
    res.send('error');
  }
});
  // console.log(firebase.auth().currentUser;);
})

// for signing in
router.post('/signup',urlencodedParser, function(req,res,next){

  var email = req.body.email;
  var password = req.body.password;
  // console.log(req.body);
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user){
    userID = user.uid;
    // console.log(user);
    userIDs.push(userID);
    firebase.database().ref('users/' + userID)
    res.send(user.uid);
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    res.send(error.message);
  });
})

// for validate
router.post('/validate',urlencodedParser, function(req,res,next){
  // function go() {
  // var userId = prompt('Username?', 'Guest');
  var uid = req.body.uid;

  // console.log('array is ' + userIDs);
//   userIDs.forEach(function(userId) {
//     console.log('inside for loop is ' + userId);
//
//   if(userId === uid){
//     res.send(uid);
//   }
// });
var i;
for(i = 0 ; i  < userIDs.length; i++){
  console.log(userIDs[i]);
  if(userIDs[i] === uid){
    console.log('same')
    res.send(uid);
  }
  else{
    console.log('not same');
    res.send('null');
  }
}
  res.send("null");
})


router.post('/login',urlencodedParser, function(req,res,next){

  var email = req.body.email;
  var password = req.body.password;
  // console.log(req.body);
  firebase.auth().signInWithEmailAndPassword(email, password).then(function(user){
    userID = user.uid;
    // console.log(user);
    userIDs.push(userID);
    res.send(user.uid);
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    res.send(error.message);
  });



})




router.post('/signout',function(req,res,next){
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    console.log('signout success');
    res.send('signout success');
  }).catch(function(error) {
    // An error happened.
    res.send(error.message);
  });
})


// function writeUserData(userId, nauserIDs.push(userID);me, email, imageUrl) {
//   var name = name;
//   var email = email;
//   var imageUrl = imageUrl;
//   firebase.database().ref('users/' + userId).set({
//     username: name,
//     email: email,
//     profile_picture : imageUrl
//   }).then(function(){
//     res.send('data added');
//   });
// }

router.post('/addData', function(req,res,next){
var name = req.body.name;
var email = req.body.email;
var imageUrl = req.body.imageUrl;
// writeUserData(userID, name, email, imageUrl);
firebase.database().ref('users/' + userID).set({
  username: name,
  email: email,
  profile_picture : imageUrl
}).then(function(){
  res.send('data added');
});
});

router.get('/getQuestion', function(req,res,next){
  console.log('get req');
  socket.emit('questions', [1,2,3])
  socket.on('reply', function(data){
    console.log(data);
    res.send(data);
  })
})


module.exports = router;
// module.exports = uid;
