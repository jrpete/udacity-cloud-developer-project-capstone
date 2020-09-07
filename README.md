# Udacity Capstone Project


# Functionality of the application

For my Capstone project, I expanded on the previous Serverless Application by adding the following:

	# Travis:
		Uses Node 12.X to trigger a build.
		Makes sure that the serverless library is installed globally.
		Makes sure that npm is installed in the backend directory.
		Deploys the serverless application from the backend directory.
		Uses environment variables for the AWS Access and Secret Keys during the Travis build.
		Checks to see if the Master Branch of the Github Repo has been updated, and it the STAGE_NAME variables 
			is set to 'dev', triggers a Travis build.
		
	# aws-xray-sdk:
		xray:PutTraceSegments and xray:PutTelemetryRecords are enabled for all resources in both the ATTACHMENTS_TABLE and TODOS_TABLE
		In the todoItemDataAccess.ts file, the aws-xray-sdk library is used to send trace data to the X-Ray daemon.
		
	# Serverless Tests:
		I tried to write both unit tests and Integration tests, however because the application is deployed locally, it cannot be 
		deployed onto Serverless Enterprise where integration and unit tests require networked connections. 
		
		The serverless.test.yml file contains some basic syntax demonstrating how an integration test could be performed. A request 
		can be sent to an endpoint and the expected response captured in the body of the response to confirm that the endpoints are
		generating the correct Inputs and outputs. If deployed to a non-local environment, this integration test could be run using
		the 'sls test' command. 
		
		The test.test.ts file shows how a user could use the chai library to write unit tests for a lambda function. In this case, 
		I have included references to static YOUR_AUTH_TOKEN, YOUR_API_ENDPOINT, and YOUR_API_ID variables that could be substituted
		to run this test in a networked environment. However, because this application is deployed locally, the YOUR_AUTH_TOKEN will
		change based on the generated JWT, so the test cannot be run locally. If deployed to a non-local environment, this test
		could be run using the 'npm test' command. 
	
The original serverless application allowed for creating/removing/updating/fetching TODO items. Each TODO item can optionally have an attachment image. Each user only has access to TODO items that he/she has created.



# How to run the application

## Backend

To deploy the application run the following commands:

```
cd backend
npm install
sls deploy -v
```

## Frontend

To run a client application first edit the `client/src/config.ts` file to set correct parameters. And then run the following commands:

```
cd client
npm install
npm run start
```

## Testing

Because the Unit Tests and Integration Tests cannot be run locally and require that the application be deployed to Serverless Enterprise, 
the best way to test this application is to use the 'Final Project.postman_collection.json file'

