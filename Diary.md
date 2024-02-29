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

7/12/23

- Create tests to display who is drawing
- Developed code to pass the tests
- Integrate new code into Lobby

13/12/23

- Updated tests to provide displaying words functionality
- Create new tests for displaying words
- Developed code to pass new tests
- Refactored code to integrate word selection
  Next Steps
  At the end of gameplay, remove components (Still needs doing)
  Update points on back-end and display to front-end

14/12/23

- Refactored authentication to import User model
- Update points on back-end
  Next Steps
  At the end of gameplay, remove components

20/12/23

- Added text to end of gameplay
- Defined tests for further settings (public and private lobbies)
- Added further settings for public and private lobbies

24/12/23

- Define TDD tests for creating lobby card
- Create code to pass TDD tests
- Modify game dispatcher to return list of public games
- Display front-end lobby card according to dispatcher return

27/12/23

- Add functionality for undoing the most recent path
- Add functionality for clearing the canvas
  Next Steps:
  Research ways of creating a fill component and determine if it should be implemented
  Research ways of creating a text component and determine if it should be implemented
  Begin creating route for store

28/12/23

- Utilised floodfill to create fill component
  Next Steps:
  Research ways of creating a text component and determine if it should be implemented
  Begin creating route for store

01/01/24

- Adjust schema for googleId
- Create route for Google sign in

03/01/24

- Create front-end route for completing profile (as username required)
- Add login with Google button to select account

04/01/24

- Modify back-end serialisation of User schema
- Add back-end route to let oAuth users input their username
- Began TDD process for adding store
- Add conditional rendering to only display "fill" button if unlocked
  Next Steps:
  Conditional rendering if item is already bought
  Discover other tools to implement

09/01/24

- Conditional rendering displays item is already bought
  Next Steps
  Begin styling the website

10/01/24 - 17/01/24

- Imported Bootstrap into the project to allow styling customisations
- Adjusted login and registration components to use Bootstrap components and custom CSS styling
- Created a new page component for Login and Register
- Utilise conditional rendering to display form displayed according to the pill selected
- Imported Bootstrap-icons to display icons accordingly
- Re-designed lobby cards on Home Page using Bootstrap
- Re-designed buttons on Home Page

18/01/24

- Utilise Google SVG from bootstrap-icon to improve appearance
- Added functionality for registering a Google account into the website
- Converted HTML skeleton of the lobby customisation into a Bootstrap form using components
- Configured the design of the lobby customisation page to display the player list to the left of the customisations

19/01/24 - 24/01/24

- Re-configured lobby componenets to use Bootstrap Button functionality
- Re-configured PlayerCard to use the Bootstrap Card component
- Designed new components using Popover to display components allowing a cleaner user experience when changing colour or adjusting thickness of brush
- Replaced button text to use Bootstrap icons

25/01/24

- Adjusted the player list component of the website to make it scrollable. This will ensure that the website will stay in the correct aspect ratio
  and shape; especially useful with populated lobbies
- Moved the buttons into one "toolbar" that is presented below the canvas. The benefit of doing this is that then the screen is more organised and structured,
  enabling a better user experience.
- Employed custom CSS to highlight the canvas, therefore making it clear to the user that they are drawing
- Restructured the website, to present the information in a logical order (players on the left, canvas and toolbar in the middle, chatbox on the right)

29/01/24

- Added new feature to display how long the user has left on their turn when drawing, to make it clear when it will swap to the next person
- Added new feature to display the current round being played. This will help new users understand how much has been played so far and how many rounds are remaining
- Display two new icons to replace text, highlighting on the player card the user that is the host and the user that is currently drawing respectively
- Modified back-end code to support new socket transmission to implement these features

30/01/24 - 31/01/24

- Created a new component from unit tests for easier use when a user has created a new lobby and they would like to distribute the URL, simply clicking on it will put the link in the user's clipboard
- Added a bootstrap toast notification so that it makes clear to the user it has been copied
- Fixed issue with the canvas where after applying a background, it would be transparent, by adding CSS styling to create a white background on the class
- Implement new background obtained from Adobe Stock license
- New ChatBox implementation to highlight messages more clearly and structure them more appropriately relative to the other components in the lobby
  Next Steps:
  Finalise design of the lobby by adding a word "hint" and fix the issue that exists with timer (can be done in candidate branch)
  Reconfigure the home page take up more the space available as it is quite poor in style currently

01/02/24 - 08/02/24

- Implemented a bug fix for an issue whereby the time would not decrement by one due to function running repeatedly
- Implemented another bug fix where the game state did not update - new players would be able to draw yet the game had ended
- Games are only displayed on the home page if their game state is not finished
- Flashing red countdown for when the timer reaches 10 seconds
- Added a hint to be displayed as "\_" to demonstrate the length of the word
- Home Page now displayed more uniformally to take up more amounts of space and improve the overall aesthetic design
- Create TDD tests for the new store card component and implemented necessary functionality and styling
- Point updates are now floored to avoid long decimals in their sum
  Next Steps:
  Add a default profile picture and with the option of buying new profile pictures from the store

13/02/24 - 16/02/24

- Modified the database schema and model to include a profile picture value, which will store the file name of the associated user's picture, so that it can be displayed with ease
- Define a default profile picture to be used when creating an account (not possible to modify)
- Display the profile picture on the home page and lobby card to show other player's your avatar and also the host's avatar when looking for a lobby to join
- Add new profile picture components to the store allowing them to purchase new ones with the points they have earned and saved up
- Implemented functionality to clear the canvas at the end of the user's turn
  Next Steps:
  Implement functionality to allow user's to select their profile picture from the settings

20/02/24 - 28/02/24

- Modify the user schema to store the list of all purchased profile pictures, allowing them to modify their avatar as they please to the various owned pictures they have purchased
- Modify components to support the changes implemented to the User model
- Created TDD tests for PictureSelector component and implemented code to pass these tests (only show the purchased profile pictures and the currently selected picture)
- Change the design of the PictureSelector, so rather being it's own route, it will appear as a modal on the home page
