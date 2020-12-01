const { NODE_ENV, JWT_SECRET, DATABASE_URL } = process.env;

module.exports.DATABASE_URL = NODE_ENV === 'production' ? DATABASE_URL : 'mongodb://localhost:27017/newsdb';
module.exports.JWT_SECRET = NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key';
module.exports.PORT = process.env.PORT || 3000;
