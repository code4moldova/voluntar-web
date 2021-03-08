const { writeFileSync } = require("fs");

// https://docs.netlify.com/configure-builds/environment-variables/#read-only-variables
console.log('Generating "./src/_redirects" contents for:');
console.log("CONTEXT:", process.env.CONTEXT); // e.g. deploy-preview
console.log("BRANCH:", process.env.BRANCH); // e.g. pull/107/head
console.log("HEAD:", process.env.HEAD); // e.g. genesis

const domain =
  process.env.CONTEXT === "production"
    ? "http://185.181.229.182:5500"
    : "http://185.181.229.182:5000";

// This proxy is used by votdiaspora.md to call backend, because is not on https
const diasporaProxy = "/diaspora/* http://185.181.229.182:4000/api/:splat  200";

const _redirects = `
/api/*  ${domain}/api/:splat  200
${diasporaProxy}
/*      /index.html   200
`;

writeFileSync("./src/_redirects", _redirects.trimLeft());
