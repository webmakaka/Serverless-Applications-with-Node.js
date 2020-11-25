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

**Need testing!**

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
eu-central-1_P1gv3h9ve
```

<br/>

    $ export AWS_USER_POOL_ID=eu-central-1_P1gv3h9ve

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
55dddtdi8u1b51i3vlrm64f0d2
```

    $ export AWS_CLIENT_ID=5r2q0ocgeqv42ja2oql69h2708

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
        --cognito-identity-providers ProviderName=cognito-idp.${AWS_DEFAULT_REGION}.amazonaws.com/${AWS_USER_POOL_ID},ClientId=${AWS_CLIENT_ID},ServerSideTokenCheck=false \
        --query IdentityPoolId \
        --output text

<br/>

**Returns:**

```
eu-central-1:3788ebb7-ca02-4d33-aafe-6f3eca29970b
```

    $ export AWS_IDENTITY_POOL_ID=eu-central-1:3788ebb7-ca02-4d33-aafe-6f3eca29970b

<br/>

AWS web console --> Ireland --> Cognito

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

<br/>

### Api

<br/>

    $ cd api/pizza-api

<!--

AWS Web console -> cognito -> create user pool

-->

    $ vi config/env.json

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
    "id": "8spojcz994",
    "module": "api",
    "url": "https://8spojcz994.execute-api.eu-central-1.amazonaws.com/latest"
  }
}

```

<br/>

### Api image processor

    $ cd api/pizza-image-processor

    $ npm install -g claudia

    $ npm install

<br/>

    $ claudia create \
        --region ${AWS_DEFAULT_REGION} \
        --handler index.handler


    // Error occured
    // AccessDenied: Access Denied
    $ claudia add-s3-event-source \
        --region ${AWS_DEFAULT_REGION} \
        --bucket aunt-marias-pizzeria \
        --prefix images/

<br/>

### DB

    $ cd part-01/app

    $ aws dynamodb create-table \
        --table-name pizza-orders \
        --attribute-definitions AttributeName=orderId,AttributeType=S \
        --key-schema AttributeName=orderId,KeyType=HASH \
        --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
        --region ${AWS_DEFAULT_REGION} \
        --query TableDescription.TableArn \
        --output text

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

### Client

    $ cd client
    $ npm install

<br/>

AWS WebConsole --> Cognito --> User Pools --> Pool Id

<br/>

    $ src/config.js

<br/>

    $ npm start

<br/>

### Delete Created AWS Resources

```
AWS Web Console:
    Cognito --> Pools --> Delete Pool
    Cognito --> Identity Pools --> Delete Pool
    IAM -> Roles -> delete ->
        role: pizza-api-executor
        pizza-image-processor-execu
        COgniot_PizzeriaAuth_Role
        COgniot_PizzeriaUnauth_Role

    API Gateway -> Europe (Frankfurt) eu-central-1 -> delete ->
        pizza-api

    Lambda -> Europe (Frankfurt) eu-central-1 -> delete ->
        pizza-api
        pizza-image-processor

    DynamoDB -> Europe (Frankfurt) eu-central-1 -> pizza-orders --> Delete Table

```

<br/>

### [Step by Step Development](./Part1.md)

<br/>

## Part 2: Let's talk

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
