#!/usr/bin/env node

const pump = require('../index.js');

pump.reminder({}, null, (err, callback) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(callback);
});
