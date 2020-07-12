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
    Or run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Framework/Libraries Used

-   [NGXS](https://www.ngxs.io/)
-   [Angular Material](https://material.angular.io/)
-   [Prettier](https://prettier.io/)
-   [Angular Localize](https://angular.io/guide/migration-localize)
-   [RxJS](https://www.learnrxjs.io/)
-   [Angular Component Dev Kit (CDK)](https://material.angular.io/cdk/categories)
-   [Firebase](https://firebase.google.com/docs/hosting)

## Project Structure

TODO

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
    -   iOS 🟠⚠️ (**NOTE**: Sound disable by default, due to performance issue)
