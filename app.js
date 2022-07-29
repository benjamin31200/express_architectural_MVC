const { setupRoutes } = require('./routes');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cookieParser())

app.get('/', function (req, res) {
  console.log('Cookies: ', req.cookies)
  console.log('Signed Cookies: ', req.signedCookies)
})
setupRoutes(app);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});