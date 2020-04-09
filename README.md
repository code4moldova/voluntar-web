# -covid19md-voluntari-client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Docker Compose build

Production: `docker-compose up -d --build`

Development: `docker-compose -f docker-compose-dev.yml up -d --build`

## Docker Server build

Production: `docker build https://github.com/code4moldova/covid19md-voluntari-client.git#master -t covid19md-client`, run `docker run --name covid19md-client --rm -d -p 80:80/tcp -p 80:443/tcp covid19md-client:latest`

Development: `docker build https://github.com/code4moldova/covid19md-voluntari-client.git#dev -f Dockerfile-dev -t covid19md-client-dev`, run `docker run --name covid19md-client-dev --rm -d -p 8080:80/tcp covid19md-client-dev:latest`

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
