# Getting Started

This project is a React application bootstrapped with Create React App.

## Prerequisites

Before running the project, make sure you have:

- Node.js installed
- npm installed (included with Node.js)
- Access to the project's Supabase instance

## Installation

1. Clone the repository:

   git clone <repository-url>

2. Navigate to the project directory:

   cd <project-directory>

3. Install the dependencies:

   npm install

## Environment Variables

The website requires Supabase credentials to fully function.

Create a `.env` file in the root directory of the project.

Add the following environment variables:

REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_key

Replace `your_supabase_url` and `your_supabase_key` with the project's actual Supabase URL and key.

For example:

REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key

IMPORTANT: Do not commit the `.env` file to Git. Make sure `.env` is included in `.gitignore`.

After creating or modifying the `.env` file, restart the development server for the changes to take effect.

## Running the Website

### npm start

Runs the app in development mode.

    npm start

Then open http://localhost:3000 in your browser.

The page will automatically reload when you make changes. Any lint errors will also appear in the console.

## Testing

### npm test

Launches the test runner in interactive watch mode.

    npm test

## Production Build

### npm run build

Builds the app for production and outputs the optimized files to the `build` folder.

    npm run build

The generated `build` folder can then be deployed to a hosting service.

## Project Structure

A typical project structure looks like:

.
├── public/             # Static files
├── src/                # Application source code
├── .env                # Local environment variables (do not commit)
├── .gitignore
├── package.json
└── README.md

## Troubleshooting

### Supabase is not working

If features that use Supabase are not working:

1. Make sure the `.env` file exists in the project root.
2. Check that the Supabase URL and key are correct.
3. Make sure the variable names match exactly:

   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_key

4. Restart the development server after changing `.env`.

### The website does not start

Try reinstalling the dependencies:

    rm -rf node_modules
    npm install
    npm start

## Additional Resources

- React Documentation: https://react.dev/
- Create React App Documentation: https://create-react-app.dev/
- Supabase Documentation: https://supabase.com/docs
