const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const bp = require('body-parser');
const votingRoutes = require('./api/routes/voting');
const cors = require('cors');
const http = require('http');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(fileUpload());
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use('/voting', votingRoutes);


const server = http.createServer(app);

server.listen(port, function () {
    console.log("Server Listening on port: ", port);
});
