# Dynamodb Generic Repository

## Install

### Deploying DynamoDB Locally on Your Computer

- Docker

   ```shell script
    docker run -p 8000:8000 -it --rm instructure/dynamo-local-admin
   ```
    

- Amazon DynamoDB is provided as an executable .jar file

    [Documentation](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html)
    
    
## Migrate database

### Create tables

```shell script
ts-node ./src/migrate/create-tables.ts
```

### Load Sample Data

[moviedata.zip](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/samples/moviedata.zip)

```shell script
ts-node ./src/migrate/load-simple-movies.ts
```





