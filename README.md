# VoluntarWeb

> This is a companion app for [`voluntar-backend`](https://github.com/code4moldova/voluntar-backend)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.1.

## Development server

Run `npx ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

> In local development mode all requests that start with `/api` will be proxied to a deployed development backend server. See [`proxy.conf.json`](./src/proxy.conf.json) for more info. In production, `proxy.conf.json` is ignored, for more info read [Deployment instructions](#deployment-instructions)

## Code scaffolding

Run `npx ng generate component component-name` to generate a new component. You can also use `npx ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npx ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `npx ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npx ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `npx ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Deployment instructions

Modern applications have frontend and backend deployed separately. This project is using [Netlify](http://netlify.com) for frontend deployment. Backend is deployed using other services.

For local development we have `proxy.conf.json` to proxy, in production we have to use proxy solution offered by deploy infrastructure, Netlify.

#### Why not call the backend directly?

We use proxy solution because backend server does not allow [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).
If server would allow CORS, we can get rid of all proxies and call server directly.

Netlify allows to create a `_redirects` file in the public resources folder, there you can indicate all redirects and rewrites. See [Proxy to another service](https://docs.netlify.com/routing/redirects/rewrites-proxies/#proxy-to-another-service)

> Note:  
> `_redirects` file is dynamically generated and git ignored in this project

This project has multiple deploy environments like `development` and `production`, and `_redirects` content should be accordingly to deployed backend server.

Using Netlify there are 3 types of deployment. See [Deploy contexts](https://docs.netlify.com/site-deploys/overview/#deploy-contexts)

- `production` Branch `prod` is deployed
- `deploy-preview` When someone opens a pull request
- `branch-deploy` Branch `dev` is deployed

When one of this 3 contexts is happening, Netlify runs `npm run ci:build` that will generate `_redirects` before project build.

- For `production` will proxy production backend server
- For other two, development backend server will be used

> Note:  
> Netlify can split some features by context, `_redirects` is still missing.  
> See [Using different redirects across different contexts/environments](https://community.netlify.com/t/using-different-redirects-across-different-contexts-environments/2524/4)

This project can be deployed in different ways. In the past multiple solutions were used like `Docker`, `nginx` or `firebase`. See commit when this instructions were added, to see what was deleted.
