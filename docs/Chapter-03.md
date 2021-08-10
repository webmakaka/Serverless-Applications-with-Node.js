# [Book, Manning] Serverless Applications with Node.js Using AWS Lambda and Claudia.js [ENG, 2019]

<br/>

### Chapter 03: Asynchronous work is easy, we Promise()

<br/>

**Remove from AWS Console if exists:**

<br/>

```
IAM: pizza-api-executor
Lambda: pizza-api
GateWay: pizza-api
```

<br/>

    $ cp chapter-03/app/api
    $ yarn install
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
    "id": "8kcum9jvta",
    "module": "api",
    "url": "https://8kcum9jvta.execute-api.eu-central-1.amazonaws.com/latest"
  }
}
```

<br/>

    $ export AWS_DEFAULT_REGION=eu-central-1
    $ export AWS_DEFAULT_URL=https://8kcum9jvta.execute-api.eu-central-1.amazonaws.com

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

```
// CREATE A NEW ORDER
$ curl -i \
    -d '{"pizza":4, "address":"221B Baker Street"}' \
    -H "Content-Type: application/json" \
    -X POST ${AWS_DEFAULT_URL}/latest/orders
```

<br/>

**Output:**

```
HTTP/2 201
content-type: application/json
content-length: 2
date: Tue, 10 Aug 2021 15:44:08 GMT
x-amzn-requestid: 2f8959d8-5f19-40ba-905c-aaf37211fdca
access-control-allow-origin: *
access-control-allow-headers: Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token
x-amz-apigw-id: D22_GENtFiAFrYw=
access-control-allow-methods: GET,POST,OPTIONS
x-amzn-trace-id: Root=1-61129ec6-28e8ad732a7170d353fe3023;Sampled=0
access-control-max-age: 0
access-control-allow-credentials: true
x-cache: Miss from cloudfront
via: 1.1 66be79bde9fd204b1a11f560cee8fff4.cloudfront.net (CloudFront)
x-amz-cf-pop: ARN1-C1
x-amz-cf-id: wUva0b3ADttWTMDvhG8TLVKgMiPLchKyG77F26dtxCY-sy9f5vY0Mw==

{}
```

<br/>

```
$ aws dynamodb scan \
    --region ${AWS_DEFAULT_REGION} \
    --table-name pizza-orders \
    --output json
```

<br/>

```
{
    "Items": [
        {
            "address": {
                "S": "221B Baker Street"
            },
            "orderId": {
                "S": "3be9f229-28ea-454e-a5de-9ae9d4301bcb"
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
    }
]
```

<br/>

```
// CREATE A NEW ORDER
```

<br/>

```
// GET ALL ORDERS
```

<br/>

```
DO NOT FORGET TO REMOVE ALL CREATED RESOURCES !!! IF THEY ARE NOT NEEDED!!!
```

<br/>

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
