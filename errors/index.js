const BadRequestError = require('./badRequest');
const ConflictError = require('./conflictErr');
const ForbiddenError = require('./forbiddenErr');
const NotFoundError = require('./notFoundErr');
const UnauthorizedError = require('./unauthorized');

module.exports = {
  BadRequestError, ConflictError, ForbiddenError, NotFoundError, UnauthorizedError,
};
