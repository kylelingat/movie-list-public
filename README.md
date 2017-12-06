# Movie List

[Intermediate] AWS, S3, Api-Gatway, Lambda, RDS, Serverless - Intro full stack project using amazon rds

## Objective
You will be creating a full stack application. A client will be able to make HTTP requests to a PostgreSQL database through Amazon RDS.

## Prerequisites
- Basic knowledge of HTTP requests using jQuery.
- Basic understanding of API's.
- Basic understanding of JSON.
- Basic understanding of AWS Lambda
- Basic understanding of Amazon S3
- Basic understanding of Amazon API-Gateway
- Basic understanding of Serverless & CLI
- Basic understanding of AWS CLI
- Basic understanding of PostgreSQL
- Basic understanding of HTTP Methods

## Setup
- Fork and Clone Repo
- create serverless template ```serverless create --template aws-nodejs```
- npm install `pg`
- npm install `pg-pool`
#### File Structure 
```
movie-list
|
+-- client
|    |
|    +-- index.html
|    +-- styles.css
+-- lambdas
|    |
|    +-- config.json
|    +-- get.js
|    +-- post.js
|    +-- update.js
|    +-- delete.js
+-- test-data
|    +-- delete.json
|    +-- post.json
|    +-- update.json
+-- node_modules
+-- .gitignore
+-- handler.js
+-- package-lock.json
+-- package.json
+-- serverless.yml
```
#### Setup PosgreSQL Instance in AWS
- create a PostgreSQL database instance in AWS. Run the following: <br>
```aws rds create-db-instance --db-instance-identifier identifier --db-name dbname --allocated-storage 20 --db-instance-class db.t2.micro --engine postgres --master-username username --master-user-password password --port 5432 --availability-zone us-west-2a```<br>
 *NOTE: Please use your name as the identifier <br>
 *NOTE: Please add '_YOUR NAME' to the end of dbname. Ex. `movies_tyler`<br>
 *NOTE: Database instance will take 5 mins or more to be created

- run `aws rds describe-db-instances` to check if your database has been created

- run `psql --host instanceendpoint --port 5432 --username username --dbname dbname` to connect to your database instance 

- When connected to your database, create a table with the following columns:
  - id, title , year, genre
  
 ## Steps
 1. Inside your `lambdas` directory, you will create 4 lambda function routes (GET, POST, UPDATE, DELETE)
    - Add the following code snippet in your POST function in your `serverless.yml`:
    ```integration: lambda
         request:
            passThrough: WHEN_NO_TEMPLATES
            template:
              application/x-www-form-urlencoded: '{ "body" : "$input.body" }'
    ```
    *HINT #1: use the data in your `test-data` directory to run the POST, UPDATE, and DELETE routes<br>
    *HINT #2: make sure you test every lambda function LOCALLY!
  2. Create client side
