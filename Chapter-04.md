# [Book, Manning] Serverless Applications with Node.js Using AWS Lambda and Claudia.js [ENG, 2019]

<br/>

### Chapter 04: Pizza delivery: Connecting an external service

// external service api
https://github.com/serverlesspub/some-like-it-hot-delivery

<br/>

**Remove from AWS Console if exists:**

```

IAM: pizza-api-executor
Lambda: pizza-api
GateWay: pizza-api
```

<br/>

    $ chapter-04/app/api/pizza-api
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
    "id": "vgdvqla71j",
    "module": "api",
    "url": "https://vgdvqla71j.execute-api.eu-central-1.amazonaws.com/latest"
  }
}
```

<br/>

    $ export AWS_DEFAULT_URL=https://vgdvqla71j.execute-api.eu-central-1.amazonaws.com

<br/>

    $ curl \
    -H "Content-Type: application/json" \
    -X GET ${AWS_DEFAULT_URL}/latest/orders \
    | python3 -m json.tool

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
