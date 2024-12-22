# BlogApp

This is a Blog Application built with React, Redux, and Appwrite. It allows users to sign up, log in, create posts, and manage their content.

## Project Structure
.env .gitignore eslint.config.js index.html package.json public/ README.md src/ App.jsx appWrite/ auth.js config.js assets/ components/ AuthLatout.jsx Button.jsx container/ Container.jsx Footer/ Footer.jsx Header/ Header.jsx LogoutBtn.jsx Input.jsx Login.jsx Logo.jsx PostCart.jsx PostForm/ PostForm.jsx Select.jsx Signup.jsx envImport/ conf.js featured/ auth/ post/ index.css Input.jsx main.jsx pages/ store/ store.js vite.config.js


## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/hardipsolanki22/BlogApp.git
    cd BlogApp
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a [.env](http://_vscodecontentref_/26) file in the root directory and add your Appwrite credentials:
    ```env
    VITE_APPWRITE_URL="https://cloud.appwrite.io/v1"
    VITE_APPWRITE_PROJECT_ID="your_project_id"
    VITE_APPWRITE_DATABASE_ID="your_database_id"
    VITE_APPWRITE_COLLECTION_ID="your_collection_id"
    VITE_APPWRITE_BUCKET_ID="your_bucket_id"
    ```

4. Start the development server:
    ```sh
    npm run dev
    ```

## Usage

- Visit `http://localhost:3000` to view the application.
- Sign up for a new account or log in with existing credentials.
- Create, update, and delete posts.

## License

This project is licensed under the Chai Aur Code YouTube channel.

