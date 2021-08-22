# Task

Business Scenario: Acme Co's marketing department want a simple content management system and you've been tasked with building the MVP.

The challenge here is to create a node.js application that displays HTML pages at URLs that match the paths of the folders and sub-folders in the `content` folder. The content of these pages should come from a combination of the template HTML file and a markdown file containing the content.

For example, for a folder called `about-page`, a request to `/about-page` would return a HTML page created from the `template.html` template and the `about-page/index.md` content file. The `template.html` file contains a `{{content}}` placeholder that would be replaced by the content for each page. A request to `/blog/june/company-update` would return a HTML page using the content file at `blog/june/company-update/index.md`.

Acme's marketing department should be able to add extra folders to the `content` folder and the application should work with those without any requiring any code changes.

This repository contains a `template.html` template file and a sample `content` folder with sub-folders containing `index.md` markdown files (or other sub-folders).

Your application may make use of open-source code libraries. It is entirely up to you how the application performs the challenge.

## Design decisions

Setup server with node and express
Use middleware in express to catch all routes and then parse url to get file path.
Use readFileSync() inside try/catch statements to open required file, if performance on the server was an issue this could be done asynchronously 
If file is found use 'markdown-it', an open source library to render html from markdown
Use handlebars template engine to insert rendered markdown content
For this template.html will be changed to template.hbs and {{content}} will be changed to {{{content}}} to insert non escaped html

## Dependencies

express
express-handlebars
markdown-it
jest
supertest

## Testing

The application has three tests:

* one that verifies that requests to valid URLs return a 200 HTTP status code
* one that verifies that requests to valid URLs return a body that contains the HTML generated from the relevant `index.md` markdown file
* one that verifies that requests to URLs that do not match content folders return a 404 HTTP status code
* NB: the tests should not depend on the existing sub-folders in the `content` folder, so the tests do not break as the content changes

## Deployment

App deployed to heroku https://stat-file-serv.herokuapp.com/
Valid routes:
https://stat-file-serv.herokuapp.com/about-page/
https://stat-file-serv.herokuapp.com/blog/june/company-update