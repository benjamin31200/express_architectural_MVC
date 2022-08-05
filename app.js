import { setupRoutes } from './routes/index.js';
import dotenv from "dotenv";
import "dotenv/config";
dotenv.config();
import cookieParser from 'cookie-parser';
import express, { json } from 'express';
const app = express();

const port = process.env.PORT;

app.use(json());
app.use(cookieParser())

app.get('/', function (req, res) {

})
app.post('/', function (req, res) {
  res.json('good');
  })
setupRoutes(app);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});