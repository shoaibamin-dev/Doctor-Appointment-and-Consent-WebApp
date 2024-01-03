# HealthCare Professional (HCP) Management System

This repository contains the source code for a HealthCare Professional (HCP) management system implemented in JavaScript using the Firebase platform. The system includes functionalities for adding, managing, and recording details of HCPs.

## Project Structure

- **app.js:** Main JavaScript file containing the application logic.
- **config.js:** Configuration file for Firebase.
- **index.html:** HTML file for the main application.
- **style.css:** Cascading Style Sheets file for styling the application.
- **vc-hcp-default-rtdb-export.json:** JSON file containing exported data from Firebase Realtime Database.
- **imgs/left.PNG:** Left arrow image.
- **imgs/right.PNG:** Right arrow image.
- **thumbnail.PNG:** Thumbnail image.

## Usage

1. Open the project using an HTTP server for proper functionality.
   - Example: Use the Python HTTP server with `python -m http.server` in the project directory.
   - Access the application at `http://localhost:8000` (or another available port).

2. Perform various actions such as adding HCPs, recording data, and viewing details.
3. The application uses Firebase for authentication and real-time database storage.

## Functionalities

- **User Authentication:** Uses Firebase authentication to sign in users.
- **HCP Management:** Add and manage HCP details, including name, email, status, and more.
- **Record Data:** Record consent history for each HCP, including date, status, and associated files.
- **Data Visualization:** View HCP details, consent history, and associated data visually.

## Dependencies

- Firebase: Used for authentication, real-time database, and storage.
- jQuery: JavaScript library for DOM manipulation.
- Bootstrap: Front-end component library for design elements.

## How to Run

1. Open the project using an HTTP server to ensure proper functionality.
2. Ensure an active internet connection for Firebase authentication and real-time data updates.

## Contributors

- Shoaib Amin

Feel free to contribute, provide feedback, or report issues related to the HCP management system.

Happy Managing!
