# [Book, Manning] Serverless Applications with Node.js Using AWS Lambda and Claudia.js [ENG, 2019]

<br/>

### Chapter 04: Pizza delivery: Connecting an external service

<br/>

// external service api  
https://github.com/serverlesspub/some-like-it-hot-delivery

<br/>

    $ pwd
    chapter-03/app/api/pizza-api

<br/>

    $ cp claudia.json ../../../chapter-04/app/api/

<br/>

    $ cd ../../../chapter-04/app/api/
    $ yarn install
    $ npm run update

<br/>

```
{
  "FunctionName": "pizza-api",
  "FunctionArn": "arn:aws:lambda:eu-central-1:859153500889:function:pizza-api:28",
  "Runtime": "nodejs14.x",
  "Role": "arn:aws:iam::859153500889:role/pizza-api-executor",
  "Handler": "api.proxyRouter",
  "CodeSize": 11365113,
  "Description": "A pizza API, an example app from \"Serverless applications with Claudia.js\"",
  "Timeout": 3,
  "MemorySize": 128,
  "LastModified": "2021-08-10T15:49:04.503+0000",
  "CodeSha256": "3pWW5Zy0TOI635SeDaeOEeSYr4HFkqcnXx/wBXyomxY=",
  "Version": "28",
  "KMSKeyArn": null,
  "TracingConfig": {
    "Mode": "PassThrough"
  },
  "MasterArn": null,
  "RevisionId": "14cdf499-1911-4a54-b09d-78621aba3daa",
  "State": "Active",
  "StateReason": null,
  "StateReasonCode": null,
  "LastUpdateStatus": "Successful",
  "LastUpdateStatusReason": null,
  "LastUpdateStatusReasonCode": null,
  "PackageType": "Zip",
  "SigningProfileVersionArn": null,
  "SigningJobArn": null,
  "url": "https://8kcum9jvta.execute-api.eu-central-1.amazonaws.com/latest"
}
```

<br/>

    $ export AWS_DEFAULT_REGION=eu-central-1
    $ export AWS_DEFAULT_URL=https://8kcum9jvta.execute-api.eu-central-1.amazonaws.com

<br/>

```
// CREATE A NEW ORDER
$ curl -i \
    -d '{"pizza":3, "address":"Moscow"}' \
    -H "Content-Type: application/json" \
    -X POST ${AWS_DEFAULT_URL}/latest/orders
```

<br/>

```
// GET ALL ORDERS
$ curl \
    -H "Content-Type: application/json" \
    -X GET ${AWS_DEFAULT_URL}/latest/orders \
    | jq
```

<br/>

```
[
  {
    "address": "221B Baker Street",
    "orderId": "3be9f229-28ea-454e-a5de-9ae9d4301bcb",
    "pizza": 4,
    "status": "pending"
  },
  {
    "address": "221B Baker Street",
    "orderId": "edcc420f-dd93-415b-a0df-236fed3c6625",
    "pizza": 4,
    "status": "pending"
  },
  {
    "address": "Moscow",
    "orderStatus": "pending",
    "orderId": "0d55afb1-9eab-4ea5-9023-5003a65414d5",
    "pizza": 3
  }
]
```

```
// DELETE ORDER
$ curl -i \
    -H "Content-Type: application/json" \
    -X DELETE ${AWS_DEFAULT_URL}/latest/orders/0d55afb1-9eab-4ea5-9023-5003a65414d5
```

<br/>

```
DO NOT FORGET TO REMOVE ALL CREATED RESOURCES !!! IF THEY ARE NOT NEEDED!!!
```

<br/>

```
AWS Web Console Europe (Frankfurt):
    IAM -> Roles -> delete -> role: pizza-api-executor
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
