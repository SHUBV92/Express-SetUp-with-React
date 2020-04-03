const client_id = "20b61f17832e4d8ab068feff8b953745";
const apiSecret = "402a242bf75245e8a2c236728ccd0787";
var redirect_uri = "http://localhost:5000/callback"; // Your redirect uri

const express = require("express");
const bodyParser = require("body-parser");
var querystring = require("querystring");
var cookieParser = require("cookie-parser");
var cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/api/login', (req, res) => {
//     var scopes = 'user-read-private user-read-email';
//     res.redirect('https://accounts.spotify.com/authorize' +
//     '?response_type=code' +
//     '&client_id=' + my_client_id +
//     (scopes ? ' &scope=' + encodeURIComponent(scopes) : '') +
//     '&redirect_uri=' + encodeURIComponent(redirect_uri)
//     )
// })

var stateKey = "spotify_auth_state";

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

app.get("/login", function(req, res) {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = "user-read-private user-read-email";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      })
  );
});

app.get("/callback", (req, res) => {
  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch"
        })
    );
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code"
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + client_secret).toString("base64")
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token,
          refresh_token = body.refresh_token;

        var options = {
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: "Bearer " + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          "/#" +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token
            })
        );
      } else {
        res.redirect(
          "/#" +
            querystring.stringify({
              error: "invalid_token"
            })
        );
      }
    });
  }
});

// Example Routes -------- -------- -------- -------- -------- --------->

app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
  req.express;
});

app.post("/api/world", (req, res) => {
  console.log(req, body);
  res.send(
    `I recieved you POST request. This is what you sent me: ${req.body.post}`
  );
});

app.get("/api/example", (req, res) => {
  res.send({ route: "Hi i am an example route" });
});

app.listen(port, () => console.log(`Listening on port: ${port}`));
