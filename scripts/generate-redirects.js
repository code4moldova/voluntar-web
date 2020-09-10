const { writeFileSync } = require('fs')

// https://docs.netlify.com/configure-builds/environment-variables/#read-only-variables
console.log('Generating "./src/_redirects" contents for:')
console.log('CONTEXT:', process.env.CONTEXT) // e.g. deploy-preview
console.log('BRANCH:', process.env.BRANCH) // e.g. pull/107/head
console.log('HEAD:', process.env.HEAD) // e.g. genesis

const domain = process.env.CONTEXT === 'production'
  ? 'http://185.181.229.182:5000'
  : 'http://185.181.229.182:5000'

const _redirects = `
/api/*  ${domain}/api/:splat  200
/*      /index.html   200
`

writeFileSync('./src/_redirects', _redirects.trimLeft())
