const http = require('http');
const fs = require('fs');
const url = require('url');
/////////////////////////////
//Files
const tempOverview = fs.readFileSync(`${__dirname}/starter/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/starter/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/starter/templates/template-product.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);


///////////////////////////
//server

const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCT_NAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%ID%}/g, product.id);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%PRODUCTNUTRIENTSNAME%}/g, product.nutrients);
    if (!product.organic) {
        output = output.replace(/{%NOT_ORGANIC%}/, 'not-organic');
    }
    return output;
}

const server = http.createServer((req, res) => {

    const url = req.url;
    //Overview Page
    if (url === '/' || url === '/overview') {
        res.writeHead(200, { 'content-type': 'text/html' });
        const cardHtml = dataObject.map(el => replaceTemplate(tempCard, el)).join('');
        //console.log(cardHtml);
       const output = tempOverview.replace(/{%PRODUCT_CARDS%}/,cardHtml);


        res.end(output);

    }

    // Api
    else if (url === '/api') {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(data);
    }

    //Product
    else if (url === '/product') {
        res.end('Product');
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


