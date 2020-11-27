# [Book, Manning] Serverless Applications with Node.js Using AWS Lambda and Claudia.js [ENG, 2019]

<br/>

### Chapter 04: Pizza delivery: Connecting an external service

// external service api
https://github.com/serverlesspub/some-like-it-hot-delivery

<br/>

    $ pwd
    chapter-03/app/api/pizza-api

<br/>

    $ cp claudia.json ../../../../chapter-04/app/api/pizza-api/

<br/>

    $ cd ../../../../chapter-04/app/api/pizza-api/
    $ npm install
    $ npm run update

<br/>

```
{
  "FunctionName": "pizza-api",
  "FunctionArn": "arn:aws:lambda:eu-central-1:859153500889:function:pizza-api:21",
  "Runtime": "nodejs12.x",
  "Role": "arn:aws:iam::859153500889:role/pizza-api-executor",
  "Handler": "api.proxyRouter",
  "CodeSize": 10344025,
  "Description": "A pizza API, an example app from \"Serverless applications with Claudia.js\"",
  "Timeout": 3,
  "MemorySize": 128,
  "LastModified": "2020-11-27T05:35:21.027+0000",
  "CodeSha256": "M7l2LNlnZJlgZzpVz/wkGPFhbiouMF1e/EsumPvk0BI=",
  "Version": "21",
  "KMSKeyArn": null,
  "TracingConfig": {
    "Mode": "PassThrough"
  },
  "MasterArn": null,
  "RevisionId": "3ccf3484-0979-44ff-9817-2256e0c038f9",
  "State": "Active",
  "StateReason": null,
  "StateReasonCode": null,
  "LastUpdateStatus": "Successful",
  "LastUpdateStatusReason": null,
  "LastUpdateStatusReasonCode": null,
  "url": "https://co8j9db4nc.execute-api.eu-central-1.amazonaws.com/latest"
}

```

<br/>

    $ export AWS_DEFAULT_REGION=eu-central-1
    $ export AWS_DEFAULT_URL=https://co8j9db4nc.execute-api.eu-central-1.amazonaws.com

<br/>

    // GET ALL ORDERS
    $ curl \
    -H "Content-Type: application/json" \
    -X GET ${AWS_DEFAULT_URL}/latest/orders \
    | python3 -m json.tool

<br/>

```
[
    {
        "address": "221B Baker Street",
        "orderId": "b61aceac-6376-4502-9e47-ee8b052acc89",
        "pizza": 4,
        "status": "pending"
    }
]

```

<br/>

```
DO NOT FORGET TO REMOVE ALL CREATED RESOURCES !!! IF THEY ARE NOT NEEDED!!!
```

<br/>

```
AWS Web Console Europe (Frankfurt):
    IMA -> Roles -> delete -> role: pizza-api-executor
    API Gateway -> delete -> pizza-api
    Lambda -> delete -> pizza-api
    DynamoDB -> Tables -> delete -> pizza-orders

```

<br/>

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
