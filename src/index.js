var express = require('express');
var path = require('path')
let http = require('http');
let fs = require('fs')

const app = express();
const externalUrl = process.env.RENDER_EXTERNAL_URL
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 4080;

app.use(express.urlencoded({ extended: true })); 
app.set("views", path.join(__dirname, "views"));

app.get('/', function (req, res) {
    res.render('index.html');
})

if(externalUrl) {
    const hostname = '0.0.0.0'
    app.listen(PORT, hostname, () => {
      console.log(`Server locally running at http://${hostname}:${PORT}/ and from outside on ${externalUrl}`)
    })
} else {
  fs.readFile('src/index.html', null, function (error, html) {
    if (error) throw error;
    http.createServer(function(request, response) {
      response.writeHeader(200, {"Content-Type":"text/html"});
      response.write(html)
      response.end()
    }).listen(PORT, () => {
      console.log(`Server locally running at http://127.0.0.1:${PORT}/`);
    })
  });
}