# [Book, Manning] Serverless Applications with Node.js Using AWS Lambda and Claudia.js [ENG, 2019]

<br/>

### Chapter 13: Migrating your existing Express.js app to AWS Lambda

<br/>

    $ export AWS_DEFAULT_REGION=eu-central-1

<br/>

    $ claudia generate-serverless-express-proxy --express-module app

<br/>

    $ claudia create \
        --region ${AWS_DEFAULT_REGION} \
        --handler lambda.handler \
        --deploy-proxy-api

<br/>

```
DO NOT FORGET TO REMOVE ALL CREATED RESOURCES !!!
```

<br/>

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
