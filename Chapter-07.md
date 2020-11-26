# [Book, Manning] Serverless Applications with Node.js Using AWS Lambda and Claudia.js [ENG, 2019]

<br/>

### Chapter 07: Working with files

- AWS S3 Bucket

<br/>

    $ export AWS_DEFAULT_REGION=eu-central-1

<br/>

    $ aws s3 mb s3://aunt-marias-pizzeria --region ${AWS_DEFAULT_REGION}

<br/>

    $ cd api/
    $ claudia update

<br/>

    $ cd api/pizza-image-processor
    $ npm install

<br/>

    $ claudia create \
        --region ${AWS_DEFAULT_REGION} \
        --handler index.handler

<br/>

    $ claudia add-s3-event-source \
        --bucket aunt-marias-pizzeria \
        --prefix images/

<br/>

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
