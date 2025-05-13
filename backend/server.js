var express = require('express');
var cors = require('cors');
require('dotenv').config();
const fetch = (...args) =>
  import('node-fetch').then(({default: fetch}) => fetch(...args));
var bodyParser = require('body-parser');

const GITHUB_CLIENT_ID = `${process.env.NEXT_PUBLIC_GITHUB_APP_CLIENT_ID}`;
const GITHUB_CLIENT_SECRET = `${process.env.GITHUB_APP_CLIENT_SECRET}`;
const LINKEDIN_CLIENT_ID = `${process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID}`;
const LINKEDIN_CLIENT_SECRET = `${process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_SECRET}`;
const redirectUri = 'http://localhost:3000/GetStarted';

var app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen(4000, function() {
  console.log("CORS server running on port 4000");
});

// Trade Github code for access token
app.get('/getGithubAccessToken', async function(req, res) {
  const params = `?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_CLIENT_SECRET}&code=${req.query.code}`;

  await fetch(`https://github.com/login/oauth/access_token${params}`, {
    method: "POST",
    headers: {
      "Accept": "application/json"
    }
  }).then((response) => {
    return response.json();
  }).then((data) => {
    console.log(data);
    res.json(data);
  });
});

// Get Github User Data
app.get('/getGithubUserData', async function(req, res) {
  await fetch(`https://api.github.com/user`, {
    method: "GET",
    headers: {
      "Authorization": req.get("Authorization") // Bearer ACCESSTOKEN
    }
  }).then((response) => {
    return response.json();
  }).then((data) => {
    console.log(data);
    res.json(data);
  })
});

// Trade LinkedIn code for access token
app.get('/getLinkedInAccessToken', async function(req, res) {
  const params = `?grant_type=authorization_code&code=${req.query.code}&client_id=${LINKEDIN_CLIENT_ID}&client_secret=${LINKEDIN_CLIENT_SECRET}&redirect_uri=${redirectUri}`;
  console.log("Client ID:", LINKEDIN_CLIENT_ID);
  console.log("Client Secret:", LINKEDIN_CLIENT_SECRET);

  await fetch(`https://www.linkedin.com/oauth/v2/accessToken${params}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  }).then((response) => {
    return response.json();
  }).then((data) => {
    console.log(data);
    res.json(data);
  });
});

// Get LinkedIn User Data
app.get('/getLinkedInUserData', async function(req, res) {
  await fetch(`https://api.linkedin.com/v2/userinfo`, {
    method: "GET",
    headers: {
      "Authorization": req.get("Authorization") // Bearer ACCESSTOKEN
    }
  }).then((response) => {
    return response.json();
  }).then((data) => {
    console.log(data);
    res.json(data);
  })
});