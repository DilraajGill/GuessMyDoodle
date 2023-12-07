# Final Year Project

This repository has been created to store your final year project.

You may edit it as you like, but please do not remove the default topics or the project members list. These need to stay as currently defined in order for your supervisor to be able to find your project.

# Running The Application

In order to run the application, the user must have Node.js downloaded. The installer can be found on the following website:
https://nodejs.org/en/download

Once you have Node installed on the device, clone the Git repository to your local computer. Open a terminal up within the git repository and run the command (npm i) from the back-end folder and the front-end folder. This will install the node modules required for both servers.
For deploying the system, I recommend opening two terminals, one located in the root directory (to run back-end) and one located in the front-end file.
To run the back-end server, simply type into the back-end folder terminal
Nodemon server.js
During development, Nodemon is incredibly useful to restart the server if there have been any files changes within the directory of the back-end server, therefore any modifications to the server code will automatically restart it.

To run the front-end server, simply type into the front-end folder terminal
Npm start

This will run the website and the back-end server to allow for interaction between the two. Currently, I am using MongoDB on my local device as a temporary solution, therefore anyone attempting to deploy the website will struggle to login / register (unless they have it installed on their local machine), however once I move the database over to the cloud solution, it should provide a fix for this issue.  
In order to deploy the website within it’s current form, the user requires MongoDB on their local machine. This can be done through the following website:
https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/
or through mongosh (after installing the server) via:
https://www.mongodb.com/docs/mongodb-shell/?_ga=2.80922007.1681306570.1701989949-391924372.1690298159
