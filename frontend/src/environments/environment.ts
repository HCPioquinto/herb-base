// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'localhost:5000/api',
  enableDebug: true,
  firebase: {
    apiKey: "AIzaSyDUP1Tf1ozKfjo-5rscxcVMrMKghCtzNrI",
    authDomain: "herbbase-23c29.firebaseapp.com",
    databaseURL: "https://herbbase-23c29.firebaseio.com",
    projectId: "herbbase-23c29",
    storageBucket: "herbbase-23c29.appspot.com",
    messagingSenderId: "308295735024",
    appId: "1:308295735024:web:5645cd8942c577b702d435",
    measurementId: "G-BDT4555YJM"
  }
};
