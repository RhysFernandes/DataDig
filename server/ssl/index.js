'use strict'

const express = require('express')
const cookieParser = require('cookie-parser');
const fs = require('fs')
// const http = require('http')
const https = require('https')
const path = require('path')

const app = express()
const directoryToServer = 'DataDig'
const port = 8080

app.use(cookieParser());

app.use(function (req, res, next) {
  // check if client sent cookie
  // no: set a new cookie
  console.log('cookie created successfully');
  res.cookie('same-site-cookie', 'foo', { sameSite: 'lax' });
  console.log('cookie created successfully');
  res.cookie('cross-site-cookie', 'bar', { sameSite: 'none', secure: true });
  console.log('cookie created successfully');
  next();
});

app.use('/', express.static(path.join(__dirname, '../..')))

const httpsOptions = {
  cert: fs.readFileSync(path.join(__dirname, 'client-cert.pem')),
  key: fs.readFileSync(path.join(__dirname,'client-key.pem'))
}

// http.createServer(app).listen(port, function(){
//   console.log('Set the ', directoryToServer, ' directory to port', port)
// })

https.createServer(httpsOptions, app).listen(port, function(){
  console.log('Set the ', directoryToServer, ' directory to port', port)
})
