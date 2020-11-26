# [Book, Manning] Serverless Applications with Node.js Using AWS Lambda and Claudia.js [ENG, 2019]

<br/>

https://www.manning.com/books/serverless-applications-with-node-js

<br/>

**[Frontend] Aunt Maria's pizzeria**  
https://github.com/serverlesspub/pizzeria-web-app

<br/>

**[External delivery service] Some Like It Hot Delivery**  
https://github.com/serverlesspub/some-like-it-hot-delivery

<br/>

## Part 1: Serverless pizzeria

<br/>

### [Step by Step Development](./Part1.md)

<br/>

## Run final project from part 1

<br/>

### AWS roles, gropus, etc

    $ export AWS_DEFAULT_REGION=eu-central-1

<br/>

    $ aws cognito-idp create-user-pool \
        --region ${AWS_DEFAULT_REGION} \
        --pool-name Pizzeria \
        --policies "PasswordPolicy={MinimumLength=8,RequireUppercase=false, RequireLowercase=false,RequireNumbers=false,RequireSymbols=false}" \
        --username-attributes email \
        --query UserPool.Id \
        --output text

<br/>

**Returns:**

```
eu-central-1_hWRkJVwjP
```

<br/>

    $ export AWS_USER_POOL_ID=eu-central-1_hWRkJVwjP

<br/>

    $ aws cognito-idp create-user-pool-client \
        --region ${AWS_DEFAULT_REGION} \
        --user-pool-id ${AWS_USER_POOL_ID} \
        --client-name PizzeriaClient \
        --no-generate-secret \
        --query UserPoolClient.ClientId \
        --output text

<br/>

**Returns:**

```
n2ft7fdh0ekmqqoc2lcjl81kl
```

    $ export AWS_WEB_CLIENT_ID=n2ft7fdh0ekmqqoc2lcjl81kl

<!--
    $ export userPoolClientId=4j9cmdpq5hqqomnd7pf66pn7hk

-->

<br/>

<!--
// Facebook
        --supported-login-providers graph.facebook.com=266094173886660 \
-->

    $ aws cognito-identity create-identity-pool \
        --identity-pool-name Pizzeria \
        --allow-unauthenticated-identities \
        --cognito-identity-providers ProviderName=cognito-idp.${AWS_DEFAULT_REGION}.amazonaws.com/${AWS_USER_POOL_ID},ClientId=${AWS_WEB_CLIENT_ID},ServerSideTokenCheck=false \
        --query IdentityPoolId \
        --output text

<br/>

**Returns:**

```
eu-central-1:47970ce8-1c69-4263-b76a-d213ac12cf21
```

    $ export AWS_IDENTITY_POOL_ID=eu-central-1:47970ce8-1c69-4263-b76a-d213ac12cf21

<br/>

AWS web console --> Frankfurt --> Cognito

Manage Identity Pools -> Pizzeria -> Edit identity pool

Create -> Unauthenticated role && Authenticated role

<br/>

![Application](/img/pic-ch06-p01.png?raw=true)

<br/>

AWS web console --> IAM --> Roles --> arn

<br/>

```
$ export AWS_ROLE1_ARN_AUTH=arn:aws:iam::859153500889:role/Cognito_PizzeriaAuth_Role
$ export AWS_ROLE2_ARN_UNAUTH=arn:aws:iam::859153500889:role/Cognito_PizzeriaUnauth_Role
```

<br/>

    $ aws cognito-identity set-identity-pool-roles \
    --identity-pool-id ${AWS_IDENTITY_POOL_ID} \
    --roles authenticated=${AWS_ROLE1_ARN_AUTH},unauthenticated=${AWS_ROLE2_ARN_UNAUTH}

### Api

<br/>

    $ cd part-01-final/app/api/pizza-api/

<!--

AWS Web console -> cognito -> create user pool

-->

    $ vi config/env.json

AWS Web Console-> Cognito -> Manage User Pools -> Pizzeria -> Pool ARN

Set userPoolArn

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
    "id": "tp63u5qr3l",
    "module": "api",
    "url": "https://tp63u5qr3l.execute-api.eu-central-1.amazonaws.com/latest"
  }
}
```

    $ export AWS_DEFAULT_URL=https://tp63u5qr3l.execute-api.eu-central-1.amazonaws.com

<br/>

    // Should return 401
    // But i receive 400
    $ curl -o - -s -w ", status: %{http_code}\n" \
        -d '{"pizzaId":1, "address":"221B Baker Street"}' \
        -H "Content-Type: application/json" \
        -X POST ${AWS_DEFAULT_URL}/latest/orders

<br/>

### Api image processor

    $ cd api/pizza-image-processor

    $ npm install -g claudia

    $ npm install

<br/>

    $ export AWS_DEFAULT_BUCKET=aunt-marias-pizzeria1

    $ aws s3 mb s3://${AWS_DEFAULT_BUCKET} --region ${AWS_DEFAULT_REGION}

<br/>

    $ claudia create \
        --region ${AWS_DEFAULT_REGION} \
        --handler index.handler

<br/>

**Output:**

```
{
  "lambda": {
    "role": "pizza-image-processor-executor",
    "name": "pizza-image-processor",
    "region": "eu-central-1"
  }
}

```

<br/>

    $ claudia add-s3-event-source \
        --region ${AWS_DEFAULT_REGION} \
        --bucket ${AWS_DEFAULT_BUCKET} \
        --prefix images/

<br/>

### DB

    $ cd part-01-final/app

    $ aws dynamodb create-table \
        --table-name pizza-orders \
        --attribute-definitions AttributeName=orderId,AttributeType=S \
        --key-schema AttributeName=orderId,KeyType=HASH \
        --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
        --region ${AWS_DEFAULT_REGION} \
        --query TableDescription.TableArn \
        --output text

<br/>

**Output:**

```
arn:aws:dynamodb:eu-central-1:859153500889:table/pizza-orders
```

<br/>

    $ aws iam put-role-policy \
      --region ${AWS_DEFAULT_REGION} \
      --role-name pizza-api-executor \
      --policy-name PizzaApiDynamoDB \
      --policy-document file://./roles/dynamodb.json

<br/>

    $ aws dynamodb scan \
      --region ${AWS_DEFAULT_REGION} \
      --table-name pizza-orders \
      --output json

<br/>

**Output:**

```
{
    "Items": [],
    "Count": 0,
    "ScannedCount": 0,
    "ConsumedCapacity": null
}
```

<br/>

### Client

    $ cd client
    $ npm install

<br/>

**aws_cognito_identity_pool_id**

    $ echo ${AWS_IDENTITY_POOL_ID}

<br/>

**aws_user_pools_id **

AWS Web Console-> Cognito -> Manage User Pools -> Pizzeria -> Pool Id

or

    $ echo ${AWS_USER_POOL_ID}
    eu-central-1_hWRkJVwjP

<br/>

**aws_user_pools_web_client_id**

    $ echo ${AWS_WEB_CLIENT_ID}
    n2ft7fdh0ekmqqoc2lcjl81kl

<br/>

    // SET VARIABLES
    $ src/config.js

<br/>

    $ npm start

<br/>

![Application](/img/pic-ch06-p02.png?raw=true)

<br/>

![Application](/img/pic-ch06-p03.png?raw=true)

<br/>

![Application](/img/pic-ch06-p04.png?raw=true)

<br/>

### Delete Created AWS Resources

```
AWS Web Console:
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

    Lambda -> Europe (Frankfurt) eu-central-1 -> delete ->
        pizza-api
        pizza-image-processor

    DynamoDB -> Europe (Frankfurt) eu-central-1 -> pizza-orders --> Delete Table

```

<br/>

## Part 2: Let's talk

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
