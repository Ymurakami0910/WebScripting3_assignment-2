# Web Application: Collection with Filtering and CRUD Operations

## Description
This project involves the creation of a full-stack web application that allows users to view, filter, add, edit, and delete entries in a collection. The collection is stored in a MySQL database and the back-end is built using Express.js, while the front-end is built using React.js. The application includes the following functionality:

- Display a collection of items.
- Filter the items by categories.
- Add, edit, and delete items.
- Allow file uploads, including images.
- All data is stored in a MySQL database.


## Features

- **CRUD Operations**: 
  - Create: Add new items with a form that allows the user to upload files and fill in metadata.
  - Read: Display a list of all items and a detailed page for individual items.
  - Update: Edit existing items in the collection.
  - Delete: Remove items from the collection.

- **Filtering**: Filter the items based on a category selected by the user.
- **File Upload**: Upload files (such as images) for each item, which are stored in a static folder and are accessible from the front-end.

## Technologies Used

- **Back-end**: Express.js, MySQL (mysql2), CORS, body-parser
- **Front-end**: React.js
- **Database**: MySQL
- **File Uploads**: Multer (for handling file uploads)

## Setup

### Backend Setup

1. **Clone the repository**:

   git clone <repository-url>
   cd <project-folder>/backend
   npm install
   source path_to_your_project/backend/sql/database.sql;


Frontend Setup
Navigate to the front-end folder:

cd <project-folder>/frontend
Install dependencies:

Run the following command to install the necessary dependencies for the front-end.

npm install
Start the Front-end Application:

Run the following command to start the front-end React app:

npm start
The front-end will now be accessible on http://localhost:3001 (or any other available port).

