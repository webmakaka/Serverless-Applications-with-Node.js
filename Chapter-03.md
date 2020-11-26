# [Book, Manning] Serverless Applications with Node.js Using AWS Lambda and Claudia.js [ENG, 2019]

<br/>

### Chapter 03: Asynchronous work is easy, we Promise()

    $ cp chapter-03/app/api/pizza-api
    $ npm install
    $ npm run create

<br/>

**Output:**

<br/>

```
{
  "lambda": {
    "role": "pizza-api-executor",
    "name": "pizza-api",
    "region": "eu-central-1"
  },
  "api": {
    "id": "xw6a7iej4d",
    "module": "api",
    "url": "https://xw6a7iej4d.execute-api.eu-central-1.amazonaws.com/latest"
  }
}
```

<br/>

    $ export AWS_DEFAULT_REGION=eu-central-1
    $ export AWS_DEFAULT_URL=https://xw6a7iej4d.execute-api.eu-central-1.amazonaws.com

<br/>

    $ aws dynamodb create-table \
        --region ${AWS_DEFAULT_REGION} \
        --table-name pizza-orders \
        --attribute-definitions AttributeName=orderId,AttributeType=S \
        --key-schema AttributeName=orderId,KeyType=HASH \
        --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
        --query TableDescription.TableArn \
        --output text

<br/>

    $ npm run putRolePolicy

<br/>

    $ curl -i \
    -d '{"pizza":4, "address":"221B Baker Street"}' \
    -H "Content-Type: application/json" \
    -X POST ${AWS_DEFAULT_URL}/latest/orders

<br/>

**Output:**

```
HTTP/2 201
content-type: application/json
content-length: 2
date: Thu, 26 Nov 2020 07:05:58 GMT
x-amzn-requestid: 7cf02d62-9e15-45b7-b52a-5ff1dbb725ef
access-control-allow-origin: *
access-control-allow-headers: Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token
x-amz-apigw-id: WmoJRETzliAFaIg=
access-control-allow-methods: GET,POST,OPTIONS
x-amzn-trace-id: Root=1-5fbf53d4-42e1b271543ea63f19a1ffe6;Sampled=0
access-control-max-age: 0
access-control-allow-credentials: true
x-cache: Miss from cloudfront
via: 1.1 fa679145440a8b5dfc579eecfc89d9d8.cloudfront.net (CloudFront)
x-amz-cf-pop: ARN54-C1
x-amz-cf-id: wkscMWCLW_Mrc89fyjFXsu6ZxODCtkb5K2zK0rTrtvGpynbIiF3XSw==
```

<br/>

    $ aws dynamodb scan \
        --region ${AWS_DEFAULT_REGION} \
        --table-name pizza-orders \
        --output json

<br/>

```
{
    "Items": [
        {
            "address": {
                "S": "221B Baker Street"
            },
            "orderId": {
                "S": "5f761093-b805-4603-b951-c36704d22182"
            },
            "pizza": {
                "N": "4"
            },
            "status": {
                "S": "pending"
            }
        }
    ],
    "Count": 1,
    "ScannedCount": 1,
    "ConsumedCapacity": null
}

```

<br/>

    $ curl \
    -H "Content-Type: application/json" \
    -X GET ${AWS_DEFAULT_URL}/latest/orders \
    | python3 -m json.tool

<br/>

```
[
    {
        "address": "221B Baker Street",
        "orderId": "5f761093-b805-4603-b951-c36704d22182",
        "pizza": 4,
        "status": "pending"
    }
]
```

<br/>

```
DO NOT FORGET TO REMOVE ALL CREATED RESOURCES !!!
```

```
AWS Web Console:
    IMA -> Roles -> delete -> role: pizza-api-executor
    API Gateway -> Europe (Frankfurt)eu-central-1 -> delete -> pizza-api
    Lambda -> Europe (Frankfurt)eu-central-1 -> delete -> pizza-api
    DynamoDB -> Europe (Frankfurt)eu-central-1 -> Tables -> delete -> pizza-orders

```

<br/>

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
