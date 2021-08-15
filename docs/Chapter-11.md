# [Book, Manning] Serverless Applications with Node.js Using AWS Lambda and Claudia.js [ENG, 2019]

<br/>

### Chapter 11: Testing, Testing, 1, 2, 3

<br/>

    $ yarn test full

<br/>

```
yarn run v1.22.10
$ node spec/support/jasmine-runner.js full
Jasmine started
Oops, order is not saved :( {
  headers: undefined,
  body: '{}',
  statusCode: 500,
  statusMessage: 'Server Error'
}

  Create order handler
    ✓ should reject the promise if something went wrong
Oops, order is not saved :( {
  headers: undefined,
  body: '{}',
  statusCode: 500,
  statusMessage: 'Server Error'
}
    ✓ should not call the DynamoDB DocumentClient.put if Some Like It Hot delivery API request was not successful
Order is saved! undefined
    ✓ should resolve the promise if everything went fine
    ✓ should throw an error if request is not valid
    ✓ should send POST request to Some Like It Hot delivery API
Order is saved! undefined
    ✓ should call the DynamoDB DocumentClient.put if Some Like It Hot delivery API request was successful

Order is saved! undefined
  Create order (integration)
    ✗ should save the order in the DynamoDB table if Some Like It Hot delivery API request was successful
      - Failed: Cannot read property 'body' of undefined

  Get pizzas handler
    ✓ should return a single pizza if the existing ID is passed as a first parameter
    ✓ should throw an error if non-existing ID is passed
    ✗ should return a list of all pizzas if called without pizza ID
      - The pizza you requested was not found thrown

  API
    ✓ should setup / route
    ✓ should setup /pizzas route
    ✓ should setup /orders route
    ✓ should setup /orders/{id} route
    ✓ should setup /delivery route
    ✓ should setup /upload-url route

**************************************************
*                    Failures                    *
**************************************************

1) Create order (integration) should save the order in the DynamoDB table if Some Like It Hot delivery API request was successful
  - Failed: Cannot read property 'body' of undefined

2) Get pizzas handler should return a list of all pizzas if called without pizza ID
  - The pizza you requested was not found thrown

Executed 16 of 16 specs (2 FAILED) in 41 secs.
Randomized with seed 55789.
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.

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
