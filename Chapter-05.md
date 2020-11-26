# [Book, Manning] Serverless Applications with Node.js Using AWS Lambda and Claudia.js [ENG, 2019]

<br/>

### Chapter 05: Houston, we have a problem!

    $ export AWS_DEFAULT_REGION=eu-central-1

<br/>

    $ aws logs describe-log-groups --region ${AWS_DEFAULT_REGION}

<br/>

    $ aws logs \
      filter-log-events \
      --filter='Save an order' \
      --log-group-name=/aws/lambda/pizza-api \
      --region=${AWS_DEFAULT_REGION} \
      --output=json

<br/>

    $ aws logs \
      filter-log-events \
      --filter='Save an order' \
      --log-group-name=/aws/lambda/pizza-api \
      --region=${AWS_DEFAULT_REGION} \
      --output=text

<br/>

    $ aws iam \
        attach-role-policy \
        --policy-arn arn:aws:iam::aws:policy/AWSXrayWriteOnlyAccess \
        --role-name pizza-api-executor \
        --region ${AWS_DEFAULT_REGION} \
        --output json

<br/>

    $ aws lambda \
        update-function-configuration \
        --function-name pizza-api \
        --tracing-config Mode=Active \
        --region ${AWS_DEFAULT_REGION}

<br/>

    $ aws logs \
        filter-log-events \
        --filter='Order is saved!' \
        --log-group-name=/aws/lambda/pizza-api \
        --query='events[0].message' \
        --output=text

```
DO NOT FORGET TO REMOVE ALL CREATED RESOURCES !!!
```

<br/>

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
