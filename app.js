const { setupRoutes } = require('./routes');
const cookieParser = require('cookie-parser');
const Session = require('express-session');
const FileStore = require('session-file-store')(Session);
const path = require('path');
const express = require('express');
const app = express();

app.use(Session({
    store: new FileStore({
        path: path.join(__dirname, '/tmp'),
        encrypt: true
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    name : 'sessionId'
  }));

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser())

app.get('/', function (req, res) {
res.sendFile(path.join(__dirname, '/form.html'));
})
setupRoutes(app);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});