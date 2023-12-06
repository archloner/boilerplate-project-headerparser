import express, { Router } from 'express';
import serverless from 'serverless-http';

require('dotenv').config();
let app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

const router = Router();

// http://expressjs.com/en/starter/basic-routing.html
router.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
router.get('/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

router.get('/whoami', function (req, res) {
    res.json({ 'ipaddress': req.ip, 'language': req.get('Accept-Language'), 
                'software': req.get('User-Agent')})
});
  
// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


app.use('/api', router);

export const handler = serverless(app); 