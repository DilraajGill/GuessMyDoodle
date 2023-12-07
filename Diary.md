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
  10/11/23

- Attempted to create front-end TDD tests for ChatBox
- Refactored to create front-end code for Chatbox
- Created back-end TDD tests for ChatBox
- Refactored to create back-end code for ChatBox
- Fix issue with compiling front-end code
  This is done by researching Jest mocking to learn how to mock responses from Axios

15/11/23

- Created interim report
- Populated interim report with a plan

16/11/23

- Updated interim report
- Commited gitignore file to avoid commiting node_modules folder
- Removed node_modules folder from the repository

17/11/23

- Refactored ChatBox code to pass tests
- Exported ChatBox function to test handling messages
- Added ChatBox to canvas component
  Next Steps:
  Add the context into the canvas and use that username, rather than hard-coded value
  Create Lobby.jsx to store components rather than adding to Canvas

19/11/23

- Created Lobby.test.jsx to begin creating lobby functionality through TDD
- Designed first test and written code to pass test
- Updated interim report
- Reconfigured registering tests and page to add email field

20/11/23

- Create Game class tests for TDD process
- Created Game class to manage interactions of lobby
- Integrated Game class into server file
- Create generating lobby back-end tests
- Created code to pass tests
- Ensure only created lobbies can be joined (no random lobbies)
  Next Steps:
  Make sure drawings from one lobby do not affect another lobby
  If a user joins late, display the history of drawings

21/11/23

- Created GameDispatcher class to dispatch requests to appropriate games
- Unit tests created to make GameDispatcher functionality
- Passed unit tests
- Moved server code interacting with game to GameDispatcher methods
- Use methods within server to interact
- Completed next steps planned on 20/11/23
  Next Steps:
  Add lobby customisation component

22/11/23

- Added lobby customisation component
- Created new methods in GameDispatcher and Game classes to support customisations
  Next Steps:
  Create Round class to handle each turn

26/11/23

- Refactored test code
- Removed unused test files
- Added test code to previous files to ensure testing all functionality

5/12/23

- Refactored front end test code
- Created Round class
- Created Round class test file
- Developed tests for Round class
- Through TDD process, created Round class functionality

6/12/23

- Created timer to change who is drawing at the end of their elapsed timer
  Next Steps:
  At the end of the round, remove components (conditional rendering)
  Distribute a word at the start of user's turn
