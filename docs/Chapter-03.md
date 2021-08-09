# [Book, Manning] Serverless Applications with Node.js Using AWS Lambda and Claudia.js [ENG, 2019]

<br/>

### Chapter 03: Asynchronous work is easy, we Promise()

<br/>

**Remove from AWS Console if exists:**

```

IAM: pizza-api-executor
Lambda: pizza-api
GateWay: pizza-api
```

<br/>

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
    "id": "co8j9db4nc",
    "module": "api",
    "url": "https://co8j9db4nc.execute-api.eu-central-1.amazonaws.com/latest"
  }
}
```

<br/>

    $ export AWS_DEFAULT_REGION=eu-central-1
    $ export AWS_DEFAULT_URL=https://co8j9db4nc.execute-api.eu-central-1.amazonaws.com

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

    // CREATE A NEW ORDER
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
date: Fri, 27 Nov 2020 05:30:25 GMT
x-amzn-requestid: eeae88cf-152c-4d0a-8785-88e953416446
access-control-allow-origin: *
access-control-allow-headers: Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token
x-amz-apigw-id: WptFeHheFiAFjMQ=
access-control-allow-methods: GET,POST,OPTIONS
x-amzn-trace-id: Root=1-5fc08eef-1cd4c43e349382d30c40d5c4;Sampled=0
access-control-max-age: 0
access-control-allow-credentials: true
x-cache: Miss from cloudfront
via: 1.1 e0a5445a9b6b20c3399e57d2c05d4520.cloudfront.net (CloudFront)
x-amz-cf-pop: ARN1-C1
x-amz-cf-id: TZ_5A1GAzN4ScRxSXh0Aq4jHcytCMv8o-SSuLCP8UC86GHRNMkHuZw==
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
                "S": "b61aceac-6376-4502-9e47-ee8b052acc89"
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

    // CREATE A NEW ORDER
    $ curl -o - -s -w ", status: %{http_code}\n" \
        -H "Content-Type: application/json" \
        -d '{"pizza":4, "address":"221B Baker Street"}' \
        -X POST ${AWS_DEFAULT_URL}/latest/orders

<br/>

```
{"errorMessage":"getaddrinfo ENOTFOUND fake-delivery-api.effortlessserverless.com"}, status: 400
```

<br/>

**Something not working!**

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
