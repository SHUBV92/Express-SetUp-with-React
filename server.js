const my_client_id= "20b61f17832e4d8ab068feff8b953745";
const apiSecret = "402a242bf75245e8a2c236728ccd0787";

const express = require('express')
const bodyParser = require('body-parser')

const app = express();
const port = process.env.PORT || 5000;
// redirect_uri = "http://localhost:8888/callback"

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get('/api/hello', (req, res) => {
    res.send({express: 'Hello From Express'});
    req.express
});

app.post('/api/world', (req, res) => {
    console.log(req,body);
    res.send(
        `I recieved you POST request. This is what you sent me: ${req.body.post}`,
    );
})

app.get('/api/example', (req, res) => {
    res.send({route: 'Hi i am an example route'});
});

app.get('/api/login', (req, res) => { 
    var scopes = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize' + 
    '?response_type=code' + 
    '&client_id=' + my_client_id + 
    (scopes ? ' &scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent(redirect_uri)
    )
})

app.get('/callback', (req, res) => {
    
})

app.listen(port, () => console.log(`Listening on port: ${port}`));