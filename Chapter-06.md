# [Book, Manning] Serverless Applications with Node.js Using AWS Lambda and Claudia.js [ENG, 2019]

<br/>

**I did not understand anything from this chapter.**

<br/>

### Chapter 06: Level up your API

- AWS Cognito SDK
- API Gateway
- AWS Lambda

<br/>

**Possible param pizza should be replaced on pizza1**

<br/>

    $ cd chapter-06/app/api/pizza-api

<br/>

    $ curl -o - -s -w ", status: %{http_code}\n" \
        -H "Content-Type: application/json" \
        -d '{"pizza":4, "address":"221B Baker Street"}' \
        -X POST ${AWS_DEFAULT_URL}/latest/orders

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
eu-central-1_WMugfBFIo
```

<br/>

    $ export AWS_USER_POOL_ID=eu-central-1_WMugfBFIo

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
34998jmn4n44lrtsivd45putuj
```

    $ export AWS_WEB_CLIENT_ID=34998jmn4n44lrtsivd45putuj

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
eu-central-1:0c7e6549-fc72-4baa-9cf2-04f58d6981ca

```

    $ export AWS_IDENTITY_POOL_ID=eu-central-1:0c7e6549-fc72-4baa-9cf2-04f58d6981ca

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

<br/>

**Remove from AWS Console if exists:**

```

IAM: pizza-api-executor
Lambda: pizza-api
GateWay: pizza-api
```

<br/>

AWS Web Console-> Cognito -> Manage User Pools -> Pizzeria -> Pool ARN

<br/>

    $ vi config/env.json

Set userPoolArn

<br/>

    $ npm install
    $ npm run create

<br/>

**Output:**

```
{
  "lambda": {
    "role": "pizza-api-executor",
    "name": "pizza-api",
    "region": "eu-central-1"
  },
  "api": {
    "id": "9clq4fz1fj",
    "module": "api",
    "url": "https://9clq4fz1fj.execute-api.eu-central-1.amazonaws.com/latest"
  }
}
```

<br/>

    $ export AWS_DEFAULT_URL=https://9clq4fz1fj.execute-api.eu-central-1.amazonaws.com

<br/>

    // Should return 401
    // But i receive
    // {"errorMessage":"Cannot read property 'claims' of undefined"}, status: 400
    $ curl -o - -s -w ", status: %{http_code}\n" \
        -H "Content-Type: application/json" \
        -d '{"pizzaId":4, "address":"221B Baker Street"}' \
        -X POST ${AWS_DEFAULT_URL}/latest/orders

<br/>

**CloudWatch: request.context**

```
  method: 'POST',
  path: '/orders',
  stage: 'latest',
  sourceIp: '*******',
  accountId: null,
  user: null,
  userAgent: 'curl/7.68.0',
  userArn: null,
  caller: null,
  apiKey: undefined,
  authorizerPrincipalId: null,
  cognitoAuthenticationProvider: null,
  cognitoAuthenticationType: null,
  cognitoIdentityId: null,
  cognitoIdentityPoolId: null,
  authorizer: undefined
}

```

<br/>

    $ curl \
        -H "Content-Type: application/json" \
        -X GET ${AWS_DEFAULT_URL}/latest/orders \
        | python3 -m json.tool

```
{
    "message": "Missing Authentication Token"
}
```

<br/>

    $ curl \
        -H "Content-Type: application/json" \
        -X GET ${AWS_DEFAULT_URL}/latest/pizzas \
        | python3 -m json.tool

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

```
DO NOT FORGET TO REMOVE ALL CREATED RESOURCES !!!
```

<br/>

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
