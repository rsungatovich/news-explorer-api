const Article = require('../models/article');
const NotFoundError = require('../errors/NotFoundError');
const NoAccessError = require('../errors/NoAccessError');

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .orFail(new NotFoundError('Ничего не найдено'))
    .then((articles) => {
      res.send({ data: articles });
    })
    .catch(next);
};

const postArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;

  Article.create({ keyword, title, text, date, source, link, image, owner: req.user._id })
    .then((article) => res.status(201).send({ data: article }))
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.id).select('+owner')
    .orFail(new NotFoundError('Ничего не найдено'))
    .then((article) => {
      if (article.owner.toString() !== req.user._id) {
        throw new NoAccessError('Нет доступа к действию');
      }
      article.remove((err, article) => {
        if (err) throw new Error('На сервере произошла ошибка');
        res.send({ data: article });
      });
    })
    .catch(next);
};

module.exports = {
  getArticles,
  postArticle,
  deleteArticle,
};
