//it is easy to import the errors bcoz by default from any folder - index.js will be taken

const CustomAPIError = require('./custom-error');
const BadRequest = require('./bad-request');
const UnauthenticatedError = require('./unauthenticated');

module.exports = {CustomAPIError,BadRequest,UnauthenticatedError};
