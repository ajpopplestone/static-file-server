// Using 'expressjs' to create node server
const express = require('express');
//Using 'handlebars' template engine
const handlebars = require('express-handlebars');
// Using 'markdown-it' to render markdown content as html
var md = require('markdown-it')({
    html: true
});
const url = require('url');
const fs = require('fs')

//create server
const app = express();
const port = 3000;

// set server to use handlebars engine
app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    // set layout directory 
    layoutsDir: __dirname + '/views/layouts',
    // create shortened handlebars extension name
    extname: 'hbs',
    // set default layout
    defaultLayout: 'template'
}));

//define middleware to parse and render each file path
app.use('/', (req, res) => {
    // parse content path from url
    const path = url.parse(req.url).path
    try {
        // try to fetch file form path
        const data = fs.readFileSync("./content" + path + "/index.md", 'utf8')
        // render as html from markdown
        const rendered = md.render(data);
        // set status
        res.status(200);
        // render using handlebars template engine
        res.render('markdown', {markdown: rendered});
    } catch (err) {
        // catch if file not found and set 404 status
        res.status(404)
        // render error page
        res.render('error', {layout : 'template', path});
    }
});

// start the server listening for requests
app.listen(process.env.PORT || port, () => console.log(`App listening to port ${port}`));

module.exports = app; 