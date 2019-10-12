A DHIS2 app for managing configurations for data and metadata that we want to download. Also to run test on different users to get information as number of OU (search and capture), number of data sets, program and program rules.

This app store all settings in DataStore using:
  - namespace: "ANDROID_SETTING_APP"
  - key: "android_settings", "program_settings" , "dataSet_settings"

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) and [d2-ui](https://github.com/dhis2/d2-ui) for UI components as d2-ui-core, d2-ui-header-bar, d2-ui-table and material design.


## Folder Structure

After creation, your project should look like this:

```
android-settings-app/
  README.md
  package.json
  node_modules/
  public/
    index.html
    favicon.ico
    manifest.json
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
    registerServiceWorker.js
    components/
    constants/
    icons/
    pages/
    styles/
    utils/
```

For the project to build, **these files must exist with exact filenames**:

* `public/index.html` is the page template;
* `src/index.js` is the JavaScript entry point.

You can delete or rename the other files.

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack.<br>
You need to **put any JS and CSS files inside `src`**, otherwise Webpack won’t see them.

Only files inside `public` can be used from `public/index.html`.<br>

You can, however, create more top-level directories.<br>
They will not be included in the production build so you can use them for things like documentation.

## Getting started

The dependencies of the app are managed by npm or yarn (recommended). Working on the app requires cloning the repository and installing the dependencies:

```
  git clone https://github.com/Sharmyn28/android-settings-app.git
```

In the android-settings-app root directory:

```
  yarn install
  yarn start
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br>

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!
