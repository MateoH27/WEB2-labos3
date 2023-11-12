var path = require('path')
let http = require('http');
let fs = require('fs')

const externalUrl = process.env.RENDER_EXTERNAL_URL
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 4080;

fs.readFile('src/index.html', null, function (error, html) {
  if (error) throw error;
  http.createServer(function(request, response) {
    response.writeHeader(200, {"Content-Type":"text/html"});
    response.write(html)
    response.end()
  }).listen(PORT, () => {
    if(externalUrl) {
      const hostname = '0.0.0.0'
      console.log(`Server locally running at http://${hostname}:${PORT}/ and from outside on ${externalUrl}`)
    } else {
      console.log(`Server locally running at http://127.0.0.1:${PORT}/`);
    }
  })
});