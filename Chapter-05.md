# [Book, Manning] Serverless Applications with Node.js Using AWS Lambda and Claudia.js [ENG, 2019]

<br/>

### Chapter 05: Houston, we have a problem!

    $ aws logs describe-log-groups --region eu-central-1

<br/>

    $ aws logs \
      filter-log-events \
      --filter='Save an order' \
      --log-group-name=/aws/lambda/pizza-api \
      --region=eu-central-1 \
      --output=json

<br/>

    $ aws logs \
      filter-log-events \
      --filter='Save an order' \
      --log-group-name=/aws/lambda/pizza-api \
      --region=eu-central-1 \
      --output=text

<br/>

    $ aws iam \
        attach-role-policy \
        --policy-arn arn:aws:iam::aws:policy/AWSXrayWriteOnlyAccess \
        --role-name pizza-api-executor \
        --region eu-central-1 \
        --output json

<br/>

    $ aws lambda \
        update-function-configuration \
        --function-name pizza-api \
        --tracing-config Mode=Active \
        --region eu-central-1

<br/>

    $ aws logs \
        filter-log-events \
        --filter='Order is saved!' \
        --log-group-name=/aws/lambda/pizza-api \
        --query='events[0].message' \
        --output=text

<br/>

---

<br/>

**Marley**

Any questions in english: <a href="https://jsdev.org/chat/">Telegram Chat</a>  
Любые вопросы на русском: <a href="https://jsdev.ru/chat/">Телеграм чат</a>
