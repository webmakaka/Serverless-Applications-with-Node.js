# [Book, Manning] Serverless Applications with Node.js Using AWS Lambda and Claudia.js [ENG, 2019]

<br/>

https://www.manning.com/books/serverless-applications-with-node-js

<br/>

**[Frontend] Aunt Maria's pizzeria**  
https://github.com/serverlesspub/pizzeria-web-app

<br/>

**[External delivery service] Some Like It Hot Delivery**  
(possible external service from the book is not working)  
https://github.com/serverlesspub/some-like-it-hot-delivery

<br/>

## Part 1: Serverless pizzeria

<br/>

### [Step by Step Development](./docs/Part1.md)

<br/>

### Client

<br/>

    $ cd client
    $ npm install

<br/>

    // SET VARIABLES
    $ src/config.js

<br/>

**aws_cognito_identity_pool_id**

    $ echo ${AWS_IDENTITY_POOL_ID}

<br/>

**aws_user_pools_id**

AWS Web Console-> Cognito -> Manage User Pools -> Pizzeria -> Pool Id

or

    $ echo ${AWS_USER_POOL_ID}
    eu-central-1_hWRkJVwjP

<br/>

**aws_user_pools_web_client_id**

    $ echo ${AWS_WEB_CLIENT_ID}
    n2ft7fdh0ekmqqoc2lcjl81kl

<br/>

    $ npm start

<br/>

![Application](/img/pic-part01-p01.png?raw=true)

<br/>

![Application](/img/pic-part01-p02.png?raw=true)

<br/>

## Part 2: Let's talk

<br/>

### [Step by Step Development](./docs/Part2.md)

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
