## Project backlog

This is a pet project for creating, editing and saving application backlogs

### Available scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Libraries

React, Redux, reduxjs toolkit, react beautiful dnd

### Usage

For importing user stories as batch, the user needs to use Google Spreadsheets or any other editor that edits csv files.
To use the template:
1. Go to https://docs.google.com/spreadsheets/d/1LY8xNjRPA8EayW9Gm4NhX96gR4Q1eSr4wOhh5mH-5JM.
2. Clone the sheet for yourself (File > Create Copy). 
3. Edit the data and export it as .csv.
4. At the application click Storage > Import stories...
5. Select the .csv file

### Features
- [x] Creation, editing, deleting user-stories
- [x] Creation, editing, deleting sprints
- [x] Moving user-stories across the board
- [x] Importing/exporting state from/to file.json
- [x] Batch-importing of user-stories to the backlog
- [x] Alert user when there are unsaved changes
- [ ] Support of the user-story dependencies
  - [ ] Add/remove dependencies
  - [ ] Display dependencies under the backlog stories
  - [ ] Block moving if there are unplaced dependencies
  - [ ] Block moving on the sprints that have dependencies story depends on
- [ ] Show the state of the save (is it currently saved or not)
- [ ] Undo/redo
