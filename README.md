<h1 align="center">Backend - Coffeshop RESTfull API</h1>

Backend Server for <a href="https://github.com/CUPAXX/b22-frontend-coffeshop">Coffeshop Web App</a>

[More about Express](https://en.wikipedia.org/wiki/Express.js)


## Built With

[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.12.13-green.svg?style=rounded-square)](https://nodejs.org/)


## Requirements

1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. xampp)


## How to run the app ?

1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name #nama_database, and Import file sql to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:3000/)
8. You can see all the end point [here](https://documenter.getpostman.com/view/15940810/TzscomKH)


# Feature
<ul>
<li>Login & Register</li>
<li>Get User</li>
<li>delete User</li>
<li>Update Profile</li>
<li>Get Items</li>
<li>Transaction</li>
<li>Add to Cart</li>
<li>History Transaction</li>
<li>chat</li>
</ul>


## Set up .env file

Open .env file on your favorite code editor, and copy paste this code below :

```
NODE_ENV = development

APP_URL=http://localhost:8080 //app url access
APP_KEY=MyBackend //key access
APP_UPLOAD_ROUTE=/upload // route upload file
APP_UPLOAD_PATH=assets/images //route upload path
APP_TRANSACTION_PREFIX=CS //transaction code prefix

DB_HOST = localhost // db host
DB_USER = root // db user
DB_PASSWORD =  //db password
DB_DATABASE = coffeeshop //db name
```


## License
© [M Fiqry Arahmansyah](https://github.com/CUPAXX)
