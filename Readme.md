# [Book, Manning] Serverless Applications with Node.js Using AWS Lambda and Claudia.js [ENG, 2019]

<br/>

https://www.manning.com/books/serverless-applications-with-node-js

<br/>

### Chapter 02

    $ cp api
    $ npm install
    $ npm run create

<br/>

    $ curl https://x3p6livr48.execute-api.eu-central-1.amazonaws.com/latest/pizzas

<br/>

```
"Welcome to Pizza API"
```

<br/>

    $ curl \
    -H "Content-Type: application/json" \
    -X GET https://x3p6livr48.execute-api.eu-central-1.amazonaws.com/latest/pizzas \
    | python3 -m json.tool

<br/>

```
[
    {
        "id": 1,
        "name": "Capricciosa",
        "ingredients": [
            "tomato sauce",
            "mozzarella",
            "mushrooms",
            "ham",
            "olives"
        ]
    },
    {
        "id": 2,
        "name": "Quattro Formaggi",
        "ingredients": [
            "tomato sauce",
            "mozzarella",
            "parmesan cheese",
            "blue cheese",
            "goat cheese"
        ]
    },
    {
        "id": 3,
        "name": "Napoletana",
        "ingredients": [
            "tomato sauce",
            "anchovies",
            "olives",
            "capers"
        ]
    },
    {
        "id": 4,
        "name": "Margherita",
        "ingredients": [
            "tomato sauce",
            "mozzarella"
        ]
    }
]

```

<br/>

    $ curl \
    -H "Content-Type: application/json" \
    -X GET https://x3p6livr48.execute-api.eu-central-1.amazonaws.com/latest/pizzas/3 \
    | python3 -m json.tool

<br/>

```
{
    "id": 3,
    "name": "Napoletana",
    "ingredients": [
        "tomato sauce",
        "anchovies",
        "olives",
        "capers"
    ]
}

```

    $ npm run update

```
{
  "FunctionName": "pizza-api",
  "FunctionArn": "arn:aws:lambda:eu-central-1:859153500889:function:pizza-api:2",
  "Runtime": "nodejs12.x",
  "Role": "arn:aws:iam::859153500889:role/pizza-api-executor",
  "Handler": "api.proxyRouter",
  "CodeSize": 7243472,
  "Description": "A pizza API, an example app from \"Serverless applications with Claudia.js\"",
  "Timeout": 3,
  "MemorySize": 128,
  "LastModified": "2020-11-13T03:48:23.940+0000",
  "CodeSha256": "tAk0SYDnJyy2k5QNCfFMbQWs4RFBwxRGhhTiaijSdRA=",
  "Version": "2",
  "KMSKeyArn": null,
  "TracingConfig": {
    "Mode": "PassThrough"
  },
  "MasterArn": null,
  "RevisionId": "847e4fca-34a1-4702-bd65-30fc1176d5a8",
  "State": "Active",
  "StateReason": null,
  "StateReasonCode": null,
  "LastUpdateStatus": "Successful",
  "LastUpdateStatusReason": null,
  "LastUpdateStatusReasonCode": null,
  "url": "https://x3p6livr48.execute-api.eu-central-1.amazonaws.com/latest"
}
```

<br/>

    $ curl -i \
    -d '{"pizzaId":1, "address":"221B Baker Street"}' \
    -H "Content-Type: application/json" \
    -X POST https://x3p6livr48.execute-api.eu-central-1.amazonaws.com/latest/orders

<br/>

```
HTTP/2 201
content-type: application/json
content-length: 2
date: Fri, 13 Nov 2020 03:57:39 GMT
x-amzn-requestid: 0d810a50-8af3-425a-af0e-60d27e74da79
access-control-allow-origin: *
access-control-allow-headers: Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token
x-amz-apigw-id: V7WYEECgliAFmYA=
access-control-allow-methods: POST,OPTIONS
x-amzn-trace-id: Root=1-5fae0433-689f9096158ad69778f2d0fd;Sampled=0
access-control-max-age: 0
access-control-allow-credentials: true
```

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
