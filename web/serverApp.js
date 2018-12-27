const express = require('express')
const https = require('https')
const fs = require('fs')
const history = require('connect-history-api-fallback')

const privateKey = fs.readFileSync('/home/anderson/projects/nodeJs/express-demo/ssl_cert.key')
const certificate = fs.readFileSync('/home/anderson/projects/nodeJs/express-demo/ssl_cert.crt')
const port = 5000
const app = express()
app.use('/static', express.static('/home/anderson/projects/agro-data/web/build/static'))
//app.use('/*', express.static('./public'))
//app.use('/static', express.static('/home/anderson/projects/agro-data/web/build/static'))

app.use(history({
  index: '/',
  rewrites: [
    {from: "/\/*/", to: '/index.html'}
  ]
})) 

app.get('/', (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' })
  fs.readFile('/home/anderson/projects/agro-data/web/build/index.html', function(err, html) {
    if (err) {
      throw err
    }
    response.end(html)
  })
  console.log("ruta: " + request.url)
})

app.get("/service-worker.js", (req, res) => {
  res.sendFile("/home/anderson/projects/agro-data/web/build/service-worker.js");
});
app.get("/manifest.json", (req, res) => {
  res.sendFile("/home/anderson/projects/agro-data/web/build/manifest.json");
});


const server = https
  .createServer(
    {
      key: privateKey,
      cert: certificate
    },
    app
  )
  .listen(port, () => {
    console.log('Server listening on: http://localhost:%s', port)
  })
