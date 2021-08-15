# [Book, Manning] Serverless Applications with Node.js Using AWS Lambda and Claudia.js [ENG, 2019]

<br/>

### Chapter 10: Jarvis, I mean Alexa, order me a pizza

<br/>

### SMS

    $ export AWS_DEFAULT_REGION=eu-central-1

<br/>

```
$ claudia create
    --region ${AWS_DEFAULT_REGION} \
    --api-module sms-bot
```

<br/>

### Alexa

Possible still only eu-west-1, us-east-1, us-west-1 regions are allowed

```
    claudia create \
        --region --region ${AWS_DEFAULT_REGION} \
        --handler skill.handler \
        --version skill
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
