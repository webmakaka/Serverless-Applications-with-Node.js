# [Book, Manning] Serverless Applications with Node.js Using AWS Lambda and Claudia.js [ENG, 2019]

<br/>

### Chapter 06: Level up your API

<br/>

- AWS Cognito SDK
- API Gateway
- AWS Lambda
- DynamoDB

<br/>

    $ export AWS_DEFAULT_REGION=eu-central-1

<br/>

```
// CREATE USER POOL
$ aws cognito-idp create-user-pool \
    --region ${AWS_DEFAULT_REGION} \
    --pool-name Pizzeria \
    --policies "PasswordPolicy={MinimumLength=8,RequireUppercase=false, RequireLowercase=false,RequireNumbers=false,RequireSymbols=false}" \
    --username-attributes email \
    --query UserPool.Id \
    --output text
```

<br/>

**Returns:**

```
eu-central-1_uSh9A5Glw
```

<br/>

    $ export AWS_USER_POOL_ID=eu-central-1_uSh9A5Glw

<br/>

<!--
enabledAuthFlows: [AuthFlow.USER_PASSWORD]
-->

```
// CREATE CLIENT
$ aws cognito-idp create-user-pool-client \
    --region ${AWS_DEFAULT_REGION} \
    --user-pool-id ${AWS_USER_POOL_ID} \
    --client-name PizzeriaClient \
    --no-generate-secret \
    --query UserPoolClient.ClientId \
    --output text
```

<br/>

**Returns:**

```
1du30g9a9jtf9lc757c87oh4h1
```

    $ export AWS_WEB_CLIENT_ID=1du30g9a9jtf9lc757c87oh4h1

<br/>

<!--
// Facebook
        --supported-login-providers graph.facebook.com=266094173886660 \
-->

```
// CREATE IDENTITY POOL
$ aws cognito-identity create-identity-pool \
    --identity-pool-name Pizzeria \
    --allow-unauthenticated-identities \
    --cognito-identity-providers ProviderName=cognito-idp.${AWS_DEFAULT_REGION}.amazonaws.com/${AWS_USER_POOL_ID},ClientId=${AWS_WEB_CLIENT_ID},ServerSideTokenCheck=false \
    --query IdentityPoolId \
    --output text
```

<br/>

**Returns:**

```
eu-central-1:de2d5342-57a1-46f1-8242-b9cb55b69f4a
```

<br/>

```
$ export AWS_IDENTITY_POOL_ID=eu-central-1:de2d5342-57a1-46f1-8242-b9cb55b69f4a
```

<br/>

AWS web console --> Frankfurt --> Cognito

Manage Identity Pools -> Pizzeria -> Edit identity pool

Create -> Unauthenticated role && Authenticated role

<br/>

![Application](/img/pic-ch06-p01.png?raw=true)

<br/>

Save changes

<br/>

AWS web console --> IAM --> Roles --> Cognito\* --> arn

<br/>

```
$ export AWS_ROLE1_ARN_AUTH=arn:aws:iam::859153500889:role/Cognito_PizzeriaAuth_Role
$ export AWS_ROLE2_ARN_UNAUTH=arn:aws:iam::859153500889:role/Cognito_PizzeriaUnauth_Role
```

<br/>

```
// SET IDENTITY POOL
$ aws cognito-identity set-identity-pool-roles \
    --identity-pool-id ${AWS_IDENTITY_POOL_ID} \
    --roles authenticated=${AWS_ROLE1_ARN_AUTH},unauthenticated=${AWS_ROLE2_ARN_UNAUTH}
```

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

    $ yarn install
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
    "id": "jneuf31gdg",
    "module": "api",
    "url": "https://jneuf31gdg.execute-api.eu-central-1.amazonaws.com/latest"
  }
}
```

<br/>

    $ export AWS_DEFAULT_URL=https://jneuf31gdg.execute-api.eu-central-1.amazonaws.com

<br/>

```
// CREATE DYNAMODB TABLE (Chapter-03)
```

<br/>

    // GET ALL PIZZAZ
    $ curl \
        -H "Content-Type: application/json" \
        -X GET ${AWS_DEFAULT_URL}/latest/pizzas \
        | jq

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

AWS Web Console-> Cognito -> Manage User Pools -> Pizzeria -> Users and groups

<br/>

**Create User**

<br/>

![Application](/img/pic-ch06-p02.png?raw=true)

<br/>

General Settings -> App Clients -> Show Details -> Enable username password based authentication (ALLOW_USER_PASSWORD_AUTH)

Save app client changes

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
  "ClientId": "client_id"
}
```

<br/>

```
$ curl -X POST \
    --data @user-data.json \
    -H 'X-Amz-Target: AWSCognitoIdentityProviderService.InitiateAuth' \
    -H 'Content-Type: application/x-amz-json-1.1' \
    https://cognito-idp.${AWS_DEFAULT_REGION}.amazonaws.com/  \
    | jq
```

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
  "ClientId": "client_id",
  "Session": "session_id"
}
```

<br/>

```
// NEW PASSWORD
$ curl -X POST \
    --data @user-data-challenge.json \
    -H 'X-Amz-Target: AWSCognitoIdentityProviderService.RespondToAuthChallenge' \
    -H 'Content-Type: application/x-amz-json-1.1' \
    https://cognito-idp.${AWS_DEFAULT_REGION}.amazonaws.com/  \
    | jq
```

<br/>

**Response:**

<br/>

```
{
    "AuthenticationResult": {
        "AccessToken": "<AccessToken>",
        "ExpiresIn": 3600,
        "IdToken": "<IdToken>",
        "RefreshToken": "<RefreshToken>",
        "TokenType": "Bearer"
    },
    "ChallengeParameters": {}
}

```

<br/>

API Gateway -> pizza-api -> Authorizers -> Create New Authorizer

<br/>

![Application](/img/pic-ch06-p03.png?raw=true)

<br/>

**Need to pass IdToken as Authorization. Not AccessToken.**

Test -> <IdToken>

<br/>

![Application](/img/pic-ch06-p04.png?raw=true)

<br/>

API Gateway -> pizza-api -> post -> Method Request

Authorization -> cognitoAuthorizer -> save

<br/>

![Application](/img/pic-ch06-p05.png?raw=true)

<br/>

**Actions -> Deploy API**

<br/>

```
$ export ID_TOKEN=<IdToken>
```

<br/>

```
// CREATE A NEW ORDER WITH AUTH
$ curl -o - -s -w ", status: %{http_code}\n" \
    -H "Content-Type: application/json" \
    -H "Authorization: ${ID_TOKEN}" \
    -d '{"pizza":4, "address":"221B Baker Street"}' \
    -X POST ${AWS_DEFAULT_URL}/latest/orders
```

<br/>

**Response:**

<br/>

```
{}, status: 201
```

<br/>

```
$ aws logs \
    filter-log-events \
    --filter='Request context' \
    --log-group-name=/aws/lambda/pizza-api \
    --region=${AWS_DEFAULT_REGION} \
    --output=text
```

<br/>

**response:**

<br/>

```
{
****
  authorizer: {
    claims: {
      sub: 'f8876662-51a8-444b-9859-239b93b6dd7c',
      email_verified: 'true',
      iss: 'https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_uSh9A5Glw',
      phone_number_verified: 'true',
      'cognito:username': 'f8876662-51a8-444b-9859-239b93b6dd7c',
      origin_jti: 'b10075af-c78e-4a3c-9d7f-516bfc4a7385',
      aud: '1du30g9a9jtf9lc757c87oh4h1',
      event_id: '859369da-ca4f-4dd5-b5c9-d7b4597e0e52',
      token_use: 'id',
      auth_time: '1628686765',
      phone_number: '+75555555',
      exp: 'Wed Aug 11 13:59:25 UTC 2021',
      iat: 'Wed Aug 11 12:59:25 UTC 2021',
      jti: '906867c9-8055-450b-bf1c-ec098b96028f',
      email: 'myEmail@gmail.com'
    }
  }
}

}
```

<br/>

![Application](/img/pic-ch06-p06.png?raw=true)

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
