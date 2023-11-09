Diary

12/10/23

- Created front-end react app
- Created back-end Express.js directory
- The next steps will be to begin creating the Express server

13/10/23

- Initalised server and listen on port 3001
- Removed React-initialised files
- Displayed welcome message to ensure page outputs
- Created base template for Register and Login components
- Established react routing to display different components

16/10/23

- Added React states to store LoginPage details
- Added React states to store RegisterPage details
- Function to handle POST request to server created

17/10/23

- Installed passport and mongoose dependencies
- Establishing authorisation file to handle registration requests
- Created MongoDB database
- Registered details are saved to the database

18/10/23

- Added React state to store login status
- Login successfully implemented into Server
- Home page added to be re-routed to after login

19/10/23

- Canvas implemented to provide drawing capabilities
- Fixed bug preventing drawing from beginning automatically

23/10/23

- Implemented input to adjust line thickness variable
- Updated canvas line to adjust to line thickness input

25/10/23

- Added tests to ensure registration handles errors appropriately
- Improved auth.js error handling to send error messages back to client

26/10/23

- Added tests to ensure login handle errors appropriately
- Login tests are all passed

27/10/23

- Created canvas tests to ensure states update on mouseEvent

30/10/23

- Created test file for managing and updating canvas to all

31/10/23

- Pass tests designed to ensure connection with socket.io

01/11/23

- Create tests to handle transmitting drawing data
- Added code to pass tests
- Added validation to ensure correct transmitted data sent

07/11/23

- Create socket manager for front end socket to connect to back-end
- Bug fix to stop drawing from not displaying correctly
- All drawings are sent to server, before sent back to client (including client drawing)
- Modified and added new tests through TDD process

08/11/23

- Added new tests to track first connection
- Refactored code to pass tests
- Refactored code to allow only first connection to draw
- Added states and context to manage login status
- Imported into HomePage

09/11/23

- Built tests for HomePage to ensure those logged in can only view
- Created code to pass front-end tests
- Store user details in React context
- Built back-end tests to authenticate users
- Created code to pass back-end tests
- Unauthenticated users sent straight to login page
