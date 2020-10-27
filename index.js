const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((request, response) => {
  if (request.method === 'GET') {
    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })

    if (request.url === '/') {
      fs.readFile(path.join(__dirname, 'views', 'index.html'), 'utf-8', (err, content) => {
        if(err) {
          throw  err
        }

        response.end(content)
      })
    } else if(request.url === '/about') {
      fs.readFile(path.join(__dirname, 'views', 'about.html'), 'utf-8', (err, content) => {
        if(err) {
          throw  err
        }

        response.end(content)
      })
    }

  } else if(request.method === 'POST') {
    const body = [];
    response.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })

    request.on('data', data => {
      body.push(Buffer.from(data))
    })


    request.on('end', () => {
      const message = body.toString().split('=')[1]

      response.end(`
      <h1>Ваше сообщение: ${message}</h1>
    `)

    })


  }

})

server.listen(3000, () => {
  console.log('Server is starting')
})
