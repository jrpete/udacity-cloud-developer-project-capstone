# Udacity Capstone Project


# Functionality of the application

For my Capstone project, I expanded on the previous Serverless Application from the 5th module by adding the following:

	# Travis (.travis.yml):
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

The images/App_screenshots shows the succesfull deployment of the application along with screenshors of the demonstrated functionality
working in a local client. 


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
The images/Commands_Screenshots folder shows the succesfull completion of executing these commands


## auth0
An auth0 application was created to authenticate local users using an Auth0 domain connected to a secret. A call back URL of http://localhost:3000/callback
was specified to allow users to be redirected to the same page after making API calls. 

The images/auth0_Screenshots folder shows the succesfull creation of this application along with the corresponding client details


## Travis
By deploying the application to Github with the .travis.yml file located in the root, Travis will automically build the project 
based on the parameters specified in this file. 

The images/Travis_Screenshots folder shows the succesfull Travis build triggered by a new deployment to Github. 


## X-Ray
AWS X-ray is used to collect trace data from the lambda functions to visualize application bottlenecks, the flow of API requests, and 
relationship between different applicaiton components. 

The images/AWS_Xray_Screenshots folder shows an X-ray Service Map and Trace after interatcting with the application locally. 


## Testing

Because the Unit Tests and Integration Tests cannot be run locally and require that the application be deployed to Serverless Enterprise, 
the best way to test this application is to use the 'Final Project.postman_collection.json file'.

The images/Postman_Screenshots folder shows the succesfull completion of running these tests


## Project Rubric
Based on these updates, I believe the following 5 items from the Project Rubric have been completed
 
(Option 1): CI/CD, Github & Code Quality 
* The project demonstrates an understanding of CI and Github.
	* All project code is stored in a GitHub repository and a link to the repository has been provided for reviewers. The student uses a CI tool to build the application
* The project has a proper documentation.
	* The README file includes introduction how to setup and deploy the project. It explains the main building blocks and has comments in the important files.
* The project use continuous deployments (CD). 
	* A CD tool is in place to deploy new version of the app automatically to production. The way is described and easy to follow.

(Option 2): Functionality
* The application allows users to create, update, delete items. 
	* A user of the web application can use the interface to create, delete and complete an item.
* The application allows users to upload a file. 
	* A user of the web interface can click on a "pencil" button, then select and upload a file. A file should appear in the list of items on the home page.
* The application only displays items for a logged in user.	
	* If you log out from a current user and log in as a different user, the application should not show items created by the first account.
* Authentication is implemented and does not allow unauthenticated access. 
	* A user needs to authenticate in order to use an application.


(Option 2):Codebase
* The code is split into multiple layers separating business logic from I/O related code. 
	* Code of Lambda functions is split into multiple files/classes. The business logic of an application is separated from code for database access, file storage, and code related to AWS Lambda.
* Code is implemented using async/await and Promises without using callbacks.
	* To get results of asynchronous operations, a student is using async/await constructs instead of passing callbacks.


(Option 2):Best practices
* All resources in the application are defined in the "serverless.yml" file. 
	* All resources needed by an application are defined in the "serverless.yml". A developer does not need to create them manually using AWS console.
* Each function has its own set of permissions. 
	* Instead of defining all permissions under provider/iamRoleStatements, permissions are defined per function in the functions section of the "serverless.yml".
* Application has sufficient monitoring. 
	* Application has at least some of the following:
		* Distributed tracing is enabled
		* It has a sufficient amount of log statements
		* It generates application level metrics
* HTTP requests are validated. 
	* Incoming HTTP requests are validated either in Lambda handlers or using request validation in API Gateway. The latter can be done either using the serverless-reqvalidator-plugin or by providing request schemas in function definitions.


(Option 2):Architecture
* Data is stored in a table with a composite key. 
	* 1:M (1 to many) relationship between users and items is modeled using a DynamoDB table that has a composite key with both partition and sort keys. Should be defined similar to this:
	   * KeySchema:
		* AttributeName: partitionKey
	        KeyType: HASH
	    * AttributeName: sortKey
	        KeyType: RANGE
* Scan operation is not used to read data from a database. 
	* Items are fetched using the "query()" method and not "scan()" method (which is less efficient on large datasets)
