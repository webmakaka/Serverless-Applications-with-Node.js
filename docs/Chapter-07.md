# [Book, Manning] Serverless Applications with Node.js Using AWS Lambda and Claudia.js [ENG, 2019]

<br/>

### Chapter 07: Working with files

<br/>

- AWS S3 Bucket

<br/>

    $ export AWS_DEFAULT_REGION=eu-central-1
    $ export AWS_DEFAULT_BUCKET=aunt-marias-pizzeria1

<br/>

    $ aws s3 mb s3://${AWS_DEFAULT_BUCKET} --region ${AWS_DEFAULT_REGION}

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
        --region ${AWS_DEFAULT_REGION} \
        --bucket ${AWS_DEFAULT_BUCKET} \
        --prefix images/

<br/>

```
DO NOT FORGET TO REMOVE ALL CREATED RESOURCES !!!
```

<br/>

```
AWS Web Console -> Region Frankfurt:

    Cognito --> Pools --> Delete Pool
    Cognito --> Identity Pools --> Delete Pool

    IAM -> Roles -> delete -> role:
        pizza-api-executor
        pizza-image-processor-execu
        COgniot_PizzeriaAuth_Role
        COgniot_PizzeriaUnauth_Role

    API Gateway -> Europe (Frankfurt) eu-central-1 -> delete ->
        pizza-api

    S3 -> delete bucket -> aunt-marias-pizzeria1

    Lambda -> delete ->
        pizza-api
        pizza-image-processor

    DynamoDB -> Europe (Frankfurt) eu-central-1 -> pizza-orders --> Delete Table

```

<br/>

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
