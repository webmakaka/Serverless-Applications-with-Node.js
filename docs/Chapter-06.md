# [Book, Manning] Serverless Applications with Node.js Using AWS Lambda and Claudia.js [ENG, 2019]

<br/>

### Chapter 06: Level up your API

<br/>

- AWS Cognito SDK
- API Gateway
- AWS Lambda

<br/>

    $ cd chapter-06/app/api/pizza-api

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
        "orderId": "b61aceac-6376-4502-9e47-ee8b052acc89",
        "pizza": 4,
        "status": "pending"
    }
]
```

<br/>

### THEY REMOVED GET ALL ORDERS FROM APP IN THE SRC FOR CHAPTER 06 !!!

REQUEST FROM ABOVE WILL NOT WORK AFTER UPDATE APP.

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
eu-central-1_xPY9d5nko
```

<br/>

    $ export AWS_USER_POOL_ID=eu-central-1_xPY9d5nko

<br/>

<!--
enabledAuthFlows: [AuthFlow.USER_PASSWORD]


ОБЯЗАТЕЛЬНО ПРОВЕРЬ!

-->

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
4r1rlfokv9121t4fb48dvoia50
```

    $ export AWS_WEB_CLIENT_ID=4r1rlfokv9121t4fb48dvoia50

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
eu-central-1:2c6b1f13-662b-4c75-9983-8863f28d6f29
```

<br/>

    $ export AWS_IDENTITY_POOL_ID=eu-central-1:2c6b1f13-662b-4c75-9983-8863f28d6f29

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

**Remove from AWS Console if you want to create from the beginning:**

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

    // If you want to create from the beginning
    $ npm run create

or

    // If you want to resume from previous steps
    $ npm run update

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
    "url": "https://co8j9db4nc.execute-api.eu-central-1.amazonaws.com/latest"
  }
}
```

<br/>

    $ export AWS_DEFAULT_URL=https://co8j9db4nc.execute-api.eu-central-1.amazonaws.com

<br/>

    // GET ALL PIZZAZ
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

AWS Web Console-> Cognito -> Manage User Pools -> Pizzeria -> Users and groups

<br/>

**Create User**

<br/>

![Application](/img/pic-ch06-p02.png?raw=true)

<br/>

Your User Pools -> (the user pool) -> General Settings -> App Clients -> Show Details -> Enable username password based authentication (ALLOW_USER_PASSWORD_AUTH)

<br/>

    $ vi user-data.json

<br/>

```json
{
  "AuthParameters": {
    "USERNAME": "myusername@gmail.com",
    "PASSWORD": "mypassword"
  },
  "AuthFlow": "USER_PASSWORD_AUTH",
  "ClientId": "4r1rlfokv9121t4fb48dvoia50"
}
```

<br/>

    $ curl -X POST \
        --data @user-data.json \
        -H 'X-Amz-Target: AWSCognitoIdentityProviderService.InitiateAuth' \
        -H 'Content-Type: application/x-amz-json-1.1' \
        https://cognito-idp.${AWS_DEFAULT_REGION}.amazonaws.com/  \
        | python3 -m json.tool

<br/>

```
***
    "ChallengeName": "NEW_PASSWORD_REQUIRED",
***
```

<br/>

    $ vi user-data-challenge.json

<br/>

```json
{
  "ChallengeName": "NEW_PASSWORD_REQUIRED",
  "ChallengeResponses": {
    "USERNAME": "myusername@gmail.com",
    "NEW_PASSWORD": "mynewpassword"
  },
  "ClientId": "4r1rlfokv9121t4fb48dvoia50",
  "Session": "session id"
}
```

<br/>

    $ curl -X POST \
        --data @user-data-challenge.json \
        -H 'X-Amz-Target: AWSCognitoIdentityProviderService.RespondToAuthChallenge' \
        -H 'Content-Type: application/x-amz-json-1.1' \
        https://cognito-idp.${AWS_DEFAULT_REGION}.amazonaws.com/  \
        | python3 -m json.tool

<br/>

**Response:**

```
{
    "AuthenticationResult": {
        "AccessToken": "AccessToken",
        "ExpiresIn": 3600,
        "IdToken": "IdToken",
        "RefreshToken": "RefreshToken",
        "TokenType": "Bearer"
    },
    "ChallengeParameters": {}
}

```

<br/>

![Application](/img/pic-ch06-p03.png?raw=true)

<br/>

![Application](/img/pic-ch06-p04.png?raw=true)

<br/>

    // CREATE A NEW ORDER
    $ curl -o - -s -w ", status: %{http_code}\n" \
        -H "Content-Type: application/json" \
        -d '{"pizzaId":4, "address":"221B Baker Street"}' \
        -X POST ${AWS_DEFAULT_URL}/latest/orders

<br/>

**Response:**

```
{"message":"Unauthorized"}, status: 401
```

<br/>

**Need to pass IdToken as Authorization. Not AccessToken.**

<br/>

    // CREATE A NEW ORDER
    $ curl -o - -s -w ", status: %{http_code}\n" \
        -H "Content-Type: application/json" \
        -H "Authorization: IdToken" \
        -d '{"pizza":4, "address":"221B Baker Street"}' \
        -X POST ${AWS_DEFAULT_URL}/latest/orders

<br/>

**Response:**

```
{"errorMessage":"getaddrinfo ENOTFOUND some-like-it-hot.effortless-serverless.com"}, status: 400
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
