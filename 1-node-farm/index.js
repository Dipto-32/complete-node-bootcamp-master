const http = require('http');
const fs = require('fs');
const url = require('url');
const replaceTemplate= require('./starter/modules/replaceTemplate');



/////////////////////////////
//Files
const tempOverview = fs.readFileSync(`${__dirname}/starter/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/starter/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/starter/templates/template-product.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);


///////////////////////////
////////server////////////


const server = http.createServer((req, res) => {

   
    const { query, pathname } = url.parse(req.url,true);


    //Overview Page
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'content-type': 'text/html' });
        const cardHtml = dataObject.map(el => replaceTemplate(tempCard, el)).join('');
    
       const output = tempOverview.replace(/{%PRODUCT_CARDS%}/,cardHtml);
       
        res.end(output);

    }

    // Api
    else if (pathname === '/api') {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(data);
    }

    //Product
    else if (pathname === '/product') {
        res.writeHead(200, { 'content-type': 'text/html' });
        const product = dataObject[query.id];
        const output = replaceTemplate(tempProduct,product);

        res.end(output);
    }
    else {

        res.writeHead(404, {
            'content-type': 'text/html',
            'my-own-header': 'hello world'
        });
        res.end('<h1>Page Not Found</h1>');
    }

});

server.listen(3000, '127.0.0.1', () => {
    console.log('Listening to port 3000');
})


