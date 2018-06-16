// import { Lambda } from 'aws-sdk';

// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');
var fs = require("fs");
var ParseDashboard = require('parse-dashboard');

var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/parseTest',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || 'secret', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse',  // Don't forget to change to https if needed
  liveQuery: {
    classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
  },
  verifyUserEmails: true,

  // if `verifyUserEmails` is `true` and
  //     if `emailVerifyTokenValidityDuration` is `undefined` then
  //        email verify token never expires
  //     else
  //        email verify token expires after `emailVerifyTokenValidityDuration`
  //
  // `emailVerifyTokenValidityDuration` defaults to `undefined`
  //
  // email verify token below expires in 2 hours (= 2 * 60 * 60 == 7200 seconds)
  emailVerifyTokenValidityDuration: 2 * 60 * 60, // in seconds (2 hours = 7200 seconds)

  // set preventLoginWithUnverifiedEmail to false to allow user to login without verifying their email
  // set preventLoginWithUnverifiedEmail to true to prevent user from login if their email is not verified
  preventLoginWithUnverifiedEmail: false, // defaults to false

  // The public URL of your app.
  // This will appear in the link that is used to verify email addresses and reset passwords.
  // Set the mount path as it is in serverURL
  publicServerURL: 'http://localhost:8100/user-verified.html',

  // Your apps name. This will appear in the subject and body of the emails that are sent.
  appName: 'property apps',
  // The email adapter
  emailAdapter: {
    module: 'parse-server-mailgun-adapter-template',
    options: {
      // The address that your emails come from
      fromAddress: 'no-reply@yourdomain.com',
      // Your domain from mailgun.com
      domain: 'mailgun.alpsventures.tech',
      // Your API key from mailgun.com
      apiKey: 'key-3bc8139c4634d41b54df51a176ac89ea',
 
      // Verification email subject
      verificationSubject: 'Please verify your e-mail for %appname%',
      // Verification email body
      verificationBody: 'Hi,\n\nYou are being asked to confirm the e-mail address %email% with %appname%\n\nClick here to confirm it:\n%link%',
      //OPTIONAL (will send HTML version of email):
      // verificationBodyHTML: fs.readFileSync("./verificationBody.html", "utf8") ||  null,
      verificationBodyHTML: null,
 
      // Password reset email subject
      passwordResetSubject: 'Password Reset Request for %appname%',
      // Password reset email body
      passwordResetBody: 'Hi,\n\nYou requested a password reset for %appname%.\n\nClick here to reset it:\n%link%',
      //OPTIONAL (will send HTML version of email):
      passwordResetBodyHTML: "<!DOCTYPE html><html xmlns=http://www.w3.org/1999/xhtml>........",
    }
  },

  // account lockout policy setting (OPTIONAL) - defaults to undefined
  // if the account lockout policy is set and there are more than `threshold` number of failed login attempts then the `login` api call returns error code `Parse.Error.OBJECT_NOT_FOUND` with error message `Your account is locked due to multiple failed login attempts. Please try again after <duration> minute(s)`. After `duration` minutes of no login attempts, the application will allow the user to try login again.
  accountLockout: {
    duration: 5, // duration policy setting determines the number of minutes that a locked-out account remains locked out before automatically becoming unlocked. Set it to a value greater than 0 and less than 100000.
    threshold: 3, // threshold policy setting determines the number of failed sign-in attempts that will cause a user account to be locked. Set it to an integer value greater than 0 and less than 1000.
  },
  // // optional settings to enforce password policies
  // passwordPolicy: {
  //   // Two optional settings to enforce strong passwords. Either one or both can be specified. 
  //   // If both are specified, both checks must pass to accept the password
  //   // 1. a RegExp object or a regex string representing the pattern to enforce 
  //   validatorPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, // enforce password with at least 8 char with at least 1 lower case, 1 upper case and 1 digit
  //   // 2. a callback function to be invoked to validate the password  
  //   validatorCallback: (password) => { return validatePassword(password) }, 
  //   doNotAllowUsername: true, // optional setting to disallow username in passwords
  //   maxPasswordAge: 90, // optional setting in days for password expiry. Login fails if user does not reset the password within this period after signup/last reset. 
  //   maxPasswordHistory: 5, // optional setting to prevent reuse of previous n passwords. Maximum value that can be specified is 20. Not specifying it or specifying 0 will not enforce history.
  //   //optional setting to set a validity duration for password reset links (in seconds)
  //   resetTokenValidityDuration: 24*60*60, // expire after 24 hours
  // }
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKeynpm install -g parse-dashboardnpm install -g parse-dashboard

var dashboard = new ParseDashboard({
  "apps": [
    {
      "serverURL": "http://localhost:1337/parse",
      "appId": "myAppId",
      "masterKey": "secret",
      "appName": "Property-management"
    }
  ]
});

var app = express();

// make the Parse Dashboard available at /dashboard
app.use('/dashboard', dashboard);

var httpServer = require('http').createServer(app);
httpServer.listen(4040);

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('I dream of being a website.  Please star the parse-server repo on GitHub!');
});
app.get('http://localhost:8100/user-verified.html', function(req, res) {
  res.status(200).send('User hs been verified');
  var User = Parse.Object.extend("User");
    var user = new User();
    
   
    user.set("emailVerified", false);
    
    user.save(null, {
      success: function(gameScore) {
        // Execute any logic that should take place after the object is saved.
        
      },
      error: function(gameScore, error) {
        // Execute any logic that should take place if the save fails.
        // error is a Parse.Error with an error code and message.
        alert('Failed to create new object, with error code: ' + error.message);
      }
    });
});
 
// app.get('https://example.com/parse',function(req,res){

// })
// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
