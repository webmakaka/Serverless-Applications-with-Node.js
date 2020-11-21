# [Book, Manning] Serverless Applications with Node.js Using AWS Lambda and Claudia.js [ENG, 2019]

<br/>

https://www.manning.com/books/serverless-applications-with-node-js

<br/>

**Aunt Maria's pizzeria**  
https://github.com/serverlesspub/pizzeria-web-app

<br/>

**External delivery service**  
https://github.com/serverlesspub/some-like-it-hot-delivery

<br/>

## Part 1: Serverless pizzeria

**Need testing!**

<br/>

### AWS roles, gropus, etc

<br/>

    $ aws cognito-idp create-user-pool \
    --pool-name Pizzeria \
    --policies "PasswordPolicy={MinimumLength=8,RequireUppercase=false, RequireLowercase=false,RequireNumbers=false,RequireSymbols=false}" \
    --username-attributes email \
    --query UserPool.Id \
    --output text

<br/>

**Returns:**

```
eu-west-1_OXklzcFOg
```

<br/>

    $ export clientId=4j9cmdpq5hqqomnd7pf66pn7hk
    $ export userPoolId=eu-west-1_OXklzcFOg

<br.>

    $ aws cognito-idp create-user-pool-client \
        --user-pool-id ${userPoolId} \
        --client-name PizzeriaClient \
        --no-generate-secret \
        --query UserPoolClient.ClientId \
        --output text

<br/>

**Returns:**

```
4j9cmdpq5hqqomnd7pf66pn7hk
```

    $ export userPoolClientId=4j9cmdpq5hqqomnd7pf66pn7hk

<br/>

<!--
// Facebook
        --supported-login-providers graph.facebook.com=266094173886660 \
-->

<br/>

    $ aws cognito-identity create-identity-pool \
        --identity-pool-name Pizzeria \
        --allow-unauthenticated-identities \
        --cognito-identity-providers ProviderName=cognito-idp.eu-west-1.amazonaws.com/${userPoolId},ClientId=${clientId},ServerSideTokenCheck=false \
        --query IdentityPoolId \
        --output text

<br/>

**Returns:**

```
eu-west-1:0515e7ae-1b93-4799-ac67-ef580c23869a
```

    $ export identityPoolId=eu-west-1:0515e7ae-1b93-4799-ac67-ef580c23869a

<br/>

aws web console --> Ireland --> Cognito

Manage Identity Pools -> Pizzeria -> Edit identity pool

Create -> Unauthenticated role && Authenticated role

<br/>

![Application](/img/pic-ch06-p01.png?raw=true)

<br/>

aws web console --> Iam --> arn

<br/>

```
$ export ROLE1_ARN=arn:aws:iam::859153500889:role/Cognito_PizzeriaUnauth_Role

$ export ROLE2_ARN=arn:aws:iam::859153500889:role/Cognito_PizzeriaAuth_Role
```

<br/>

    $ aws cognito-identity set-identity-pool-roles \
    --identity-pool-id ${identityPoolId} \
    --roles authenticated=${ROLE1_ARN},unauthenticated=${ROLE2_ARN}

### DB

    $ cd part-01/app

    $ aws dynamodb create-table \
        --table-name pizza-orders \
        --attribute-definitions AttributeName=orderId,AttributeType=S \
        --key-schema AttributeName=orderId,KeyType=HASH \
        --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
        --region eu-central-1 \
        --query TableDescription.TableArn \
        --output text

<br/>

    $ aws iam put-role-policy \
      --role-name pizza-api-executor \
      --policy-name PizzaApiDynamoDB \
      --policy-document file://./roles/dynamodb.json


    $ aws dynamodb scan \
      --table-name pizza-orders \
      --region eu-central-1 \
      --output json

<br/>

### Api

    $ cd api/pizza-api
    $ npm install
    $ npm run create

<br/>

    $ cd api/pizza-image-processor
    $ npm install

<br/>

    $ claudia create \
        --region eu-central-1 \
        --handler index.handler

    $ claudia add-s3-event-source \
        --bucket aunt-marias-pizzeria \
        --prefix images/

<br/>

### Client

    $ cd client
    $ npm install

update:

    $ npm start

<br/>

```
AWS Web Console:
    IMA -> Roles -> delete -> role: pizza-api-executor
    API Gateway -> Europe (Frankfurt)eu-central-1 -> delete -> pizza-api
    Lambda -> Europe (Frankfurt)eu-central-1 -> delete -> pizza-api
    DynamoDB -> Europe (Frankfurt)eu-central-1 -> Tables -> delete -> pizza-orders

```

<br/>

### [Chapter to Chapter Development](./Part1.md)

<br/>

## Part 2: Let's talk

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
