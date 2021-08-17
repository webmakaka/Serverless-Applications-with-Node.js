# [Book, Manning] Serverless Applications with Node.js Using AWS Lambda and Claudia.js [ENG, 2019]

<br/>

### Chapter 12: Paying for pizza

<br/>

    $ export AWS_DEFAULT_REGION=eu-central-1

<br/>

```
$ claudia create \
    --region ${AWS_DEFAULT_REGION} \
    --api-module payment \
    --set-env STRIPE_SECRET_KEY=<YOUR_STRIPE_SECRET_KEY>
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
