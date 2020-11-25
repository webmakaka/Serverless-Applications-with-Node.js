# [Book, Manning] Serverless Applications with Node.js Using AWS Lambda and Claudia.js [ENG, 2019]

<br/>

### Chapter 03: Asynchronous work is easy, we Promise()

    $ cp api
    $ npm install
    $ npm run create

<br/>

```
{
  "lambda": {
    "role": "pizza-api-executor",
    "name": "pizza-api",
    "region": "eu-central-1"
  },
  "api": {
    "id": "igb087eobf",
    "module": "api",
    "url": "https://igb087eobf.execute-api.eu-central-1.amazonaws.com/latest"
  }
}
```

<br/>

    $ aws dynamodb create-table \
        --table-name pizza-orders \
        --attribute-definitions AttributeName=orderId,AttributeType=S \
        --key-schema AttributeName=orderId,KeyType=HASH \
        --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
        --region eu-central-1 \
        --query TableDescription.TableArn \
        --output text

<br/>

    $ npm run putRolePolicy

<br/>

    $ curl -i \
    -d '{"pizza":4, "address":"221B Baker Street"}' \
    -H "Content-Type: application/json" \
    -X POST https://igb087eobf.execute-api.eu-central-1.amazonaws.com/latest/orders

<br/>

    $ aws dynamodb scan \
        --table-name pizza-orders \
        --region eu-central-1 \
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
                "S": "3aa08dc2-4bde-45f8-abea-1d313cde7bd3"
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
    -X GET https://igb087eobf.execute-api.eu-central-1.amazonaws.com/latest/orders \
    | python3 -m json.tool

<br/>

```
[
    {
        "address": "221B Baker Street",
        "orderId": "3aa08dc2-4bde-45f8-abea-1d313cde7bd3",
        "pizza": 4,
        "status": "pending"
    }
]
```

<br/>

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
