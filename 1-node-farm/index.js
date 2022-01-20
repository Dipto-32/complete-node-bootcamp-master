const http = require('http');
const fs = require('fs');
const url = require('url');
/////////////////////////////
//Files
const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`,'utf-8');
const dataObject = JSON.parse(data);




///////////////////////////
//server
const server = http.createServer((req,res) => {
  
    const url= req.url;
    if(url=='/' || url=='/open')
    {
        res.end('Hello from open or root');
    }
    else if(url==='/api')
    {
        res.writeHead(200, {'content-type':'application/json'});
        res.end(data);
  
    }
    else if(url==='/product'){
        res.end('Product');
    }
    else{
    
        res.writeHead(404,{
            'content-type' : 'text/html',
            'my-own-header': 'hello world'
        });
        res.end('<h1>Page Not Found</h1>');
    }

});

server.listen(3000,'127.0.0.1',()=>{
    console.log('Listening to port 3000');
})


