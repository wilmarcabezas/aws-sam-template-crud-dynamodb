const AWS =  require('aws-sdk');

exports.PutInfo = async (event, context) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const id = context.awsRequestId;
    const {name, age} = JSON.parse(event.body);
    const data = {id,name,age}

    var params = {
        TableName: 'person',
        Item: data
    }

    await dynamodb.put(params).promise();

    return {        
        'statusCode': 201,
        'body': JSON.stringify({
            message: 'Success',
        })
    }
};

exports.GetAllInfo = async(event,context)=>{

    const dynamodb = new AWS.DynamoDB();
    const params = {
        TableName:'person',
    }
    const result = await dynamodb.scan(params).promise();

    return{
        statusCode:200,
        body:JSON.stringify(result),
    }
}

exports.GetInfo = async (event, context) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const id = event.pathParameters.id;
    console.log(`Event ID:${id}`);
    const params = {
        Key:{
            id: id
        },
        TableName: 'person',
    }

    const result = await dynamodb.get(params).promise();

    return {
        statusCode: 200,
        body: JSON.stringify(result),
    }
}

exports.DeleteInfo = async(event, context)=>{
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const id = event.pathParameters.id;
    const params = {
        Key:{
            id: id,
        },
        TableName: 'person',
    }

    await dynamodb.delete(params).promise();
    return {
        statusCode: 200,
        body: JSON.stringify({message:'OK Delete'})
    }
}

exports.UpdateInfo = async(event, context)=>{
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const id = event.pathParameters.id;
    const {age} = JSON.parse(event.body);

    const params = {
        TableName: "person",
        Key: {
          "id": id
        },
        UpdateExpression: "set age = :age",
        ExpressionAttributeValues: {
          ":age": age
        }
      };
        await dynamodb.update(params).promise();
    
    return {
        statusCode: 200,
        body: JSON.stringify('Update')
    }
}