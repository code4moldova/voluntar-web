const merge = require("lodash.merge");
const { writeFileSync } = require("fs");
const { resolve } = require("path");

const roLocation = resolve(process.cwd(), "src/assets/i18n/ro.json");
const ruLocation = resolve(process.cwd(), "src/assets/i18n/ru.json");

const ro = require(roLocation);
const ru = require(ruLocation);

const ruWithAllKeys = merge({}, ro, ru);

writeFileSync(ruLocation, JSON.stringify(ruWithAllKeys, null, 2));
