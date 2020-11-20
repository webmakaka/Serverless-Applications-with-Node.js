# [Book, Manning] Serverless Applications with Node.js Using AWS Lambda and Claudia.js [ENG, 2019]

<br/>

**I did not understand anything from this chapter.**

<br/>

### Chapter 06

- AWS Cognito SDK
- API Gateway
- AWS Lambda

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

<br/>

    $ claudia update

<br/>

    $ curl -o - -s -w ", status: %{http_code}\n" \ -H "Content-Type: application/json" \
    -X POST \
    -d '{"pizzaId":1,"address":"221B Baker Street"}' \
    https://21cioselv9.execute-api.us-east-1.amazonaws.com/latest/orders

<br/>

should return 401.

<br/>

**How to check right requset in command line?**

<br/>

```
AWS Web Console:
    IMA -> Roles -> delete -> pizza roles
    Cognito -> Manage User Pools -> delete upsers pool

```

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>

```

```
