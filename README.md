# Final Year Project

This repository has been created to store your final year project.

You may edit it as you like, but please do not remove the default topics or the project members list. These need to stay as currently defined in order for your supervisor to be able to find your project.

The above directories contain the front-end and back-end servers for my website. When deploying a key aspect to consider is that due to missing a .env directory, this means that oAuth 2.0 will not be able to deploy, which may cause issues when deploying the program.

# Running The Application

To run the application, the user must have Node.js downloaded. The installer can be found on the following website:
https://nodejs.org/en/download
Once you have Node installed on the device, clone the Git repository to your local computer or download the files. Open a terminal up within the repository and run the command
npm i
from the back-end folder and the front-end folder. This will install the node modules required for both servers.
To deploy the system, I have created a custom npm script following [18] that will run both front-end and back-end servers at the same time. In the terminal located in the root of the repository, run the command
npm run start
to deploy both servers. If there is an issue involving concurrently, whereby it says it is not installed on the system you can either install it using npm i concurrently on the back-end, or manually run the servers. This can be achieved through opening a terminal in the root directory and run
node server.js and open another terminal in the front-end directory and run npm start
This will run the website and the back-end server to allow for interaction between the two. My system uses a local MongoDB database on the local device, therefore anyone attempting to deploy the website will require MongoDB on their machine. To use the project with a database (which a requirement from deployment), you must install mongodb on your device which can be found in the following links:
https://www.mongodb.com/docs/manual/installation/
or through mongosh (after installing the server) via:
https://www.mongodb.com/docs/mongodb-shell/?_ga=2.80922007.1681306570.1701989949-391924372.1690298159
Another difficulty when running the application will be trying to use oAuth 2.0. This uses a .env file, as the information within is sensitive and relevant to my Google account, hence is unable to be shared publicly. As a result, oAuth 2.0 will not work without these credentials.
