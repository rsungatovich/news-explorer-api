const validator = require('validator');
const NoValidLinkError = require('../errors/NoValidLinkError');

const linkValidator = (link) => {
  if (!validator.isURL(link)) {
    throw new NoValidLinkError('link is not valid');
  }
  return link;
};

module.exports = linkValidator;
