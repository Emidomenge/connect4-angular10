# Connect4Angular

Simple Connect4 game build with [Angular 10](https://angular.io/) (v10.0.1), written in TypeScript and SCSS.

Project created by [Emilien Domenge-Heritier](https://www.domenge.fr/)

## Demo

-   [Connect4Angular app](https://connect4-angular-2acfb.web.app/)

## Main features

-   Connect 4 game mechanism.
-   SCSS written with BEM syntax.
-   Responsive Design. Supports desktop and mobile platform.
-   Supports multi languages (i18n). French and English actually.
-   Dark mode and light mode available.
-   Some unit tests for:
    -   Checking the dom
    -   Checking component or service functions
    -   Checking ngxs state and actions
    -   The workflow between the 3

## Run in local

1. Clone the project

2. Go to the path where you cloned the project and run:

    ```
    npm install
    ```

3. Then execute:

    ```
    npm run start
    ```

4. Navigate to [`http://localhost:4200/`](http://localhost:4200/). The app will automatically reload if you change any of the source files.

## Available commands

-   Start the project locally with specific language

    ```bash
    npm run start # english version

    npm run start:fr # french version
    ```

-   Build the project

    ```bash
    npm run build:prod
    ```

-   Run unit tests
    ```bash
    npm run test
    ```

## Framework/Libraries Used

-   [NGXS](https://www.ngxs.io/)
-   [Angular Material](https://material.angular.io/)
-   [Prettier](https://prettier.io/)
-   [Angular Localize](https://angular.io/guide/migration-localize)
-   [RxJS](https://www.learnrxjs.io/)
-   [Angular Component Dev Kit (CDK)](https://material.angular.io/cdk/categories)
-   [Firebase](https://firebase.google.com/docs/hosting)
-   [Jasmine](https://jasmine.github.io/api/3.5/global)

## Project Structure

```
connect4-angular
|   README.md
|   .firebase (= firebase config, used for deployment)
|
|
+---e2e
|   |   (= settings + source code for E2E tests, nothing have been done in this section)
|   |   ...
|
|
+---dist/connect4-angular
|             |   (= generated build, it contains one folder for each supported language)
|             |   ...
|
+---src
  |   |   index.html        (= Angular input)
  |   |   styles.scss       (= global styles, contains theme palette for dark or light mode)
  |   |   ...
  |
  +---assets            (= all static ressources)
  |   |   audio
  |   |   img
  |
  |
  +---environments      (= environment settings generated by angular)
  |   |
  |   |   ...
  |
  |
  +---locale            (= contains all translations for each language supported)
  |   |
  |   |   messages.XX.xlg  (= where "XX" is the language supported, ex: 'fr' -> french language supported)
  |
  +---app                   (= contains app source code)
      |
      |   app.component.ts    (= global app typescript component)
      |   app.component.html  (= global app html view component)
      |   app.module.ts       (= global app module component)
      |
      |
      +---breakpoints        (= breakpoints app settings for SCSS and TypeScript)
      |     |
      |     |   ...
      |
      +---mock               (= mock used for unit testing)
      |     |
      |     |   ...
      |
      +---modules            (= contains different modules from the app, each module should follow the template below 👇👇👇)
      |     |
      |     +---module1                           ** TEMPLATE **
      |     |     |   components                  ** TEMPLATE - module components **
      |     |     |   pages                       ** TEMPLATE - [optional] when there is routes inside the module **
      |     |     |   module1.service.ts          ** TEMPLATE - [optional] when the module needs logic **
      |     |     |   module1.module.ts           ** TEMPLATE - module definition **
      |     |     |   module1.routes.ts           ** TEMPLATE - [optional]  module routes **
      |     |
      |     |
      |     +---connect4    (= contains the connect4 game mechanism and the components to interact with)
      |     |
      |     |
      |     +---footer      (= app footer)
      |     |
      |     |
      |     +---header      (= app header)
      |     |
      |     |
      |     +---material    (= contains angular material modules, all regroup together in a single file)
      |     |     |   material.modules
      |     |
      |     +---sidenav     (= app sidenav)
      |
      |
      +---ngxs              (= contains all the ngxs logic)
      |     |
      |     |   index.ts    (= contains App state typing)
      |     |
      |     +---actions     (= ngxs actions)
      |     |     |
      |     |     |   xxxx.actions.ts
      |     |
      |     |
      |     +---state       (= contains ngxs states and models)
      |     |     |
      |     |     |   xxxx.state.ts
      |     |     |   root.state.ts (= all states combined together here, then linked with the global app module)
      |
      +---settings    (= app settings)
      |     |
      |     |   index.ts    (= contains only constant variables)
      |
      +---shared    (= contains shared services or components, meaning that they're used in more than one module)
            |
            +---components    (= common ui components, the folder does not exist because not needed for this app)
            |
            |
            +---services    (= shared services)
                  |
                  |   appSettings
                  |   audio
                  |   breakpoint
                  |   sidenav
                  |   theming
```

## Breakpoints

-   `xxs` = screen width below **324px**.
-   `xs` = screen width between **324px** and **576px**.
-   `sm` = screen width between **576px** and **768px**.
-   `md` = screen width between **768px** and **992px**.
-   `lg` = screen width above **992px**.

## Tested and supported browsers

-   Chrome ✅
-   Firefox ✅
-   Safari ✅
-   Internet Explorer 11 ✅

## Tested devices

-   Desktop ✅
-   Mobile
    -   Android ✅
    -   iOS ✅ (**NOTE**: Sound disable by default, due to performance issue but still works)
