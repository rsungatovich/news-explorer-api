const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const linkValidator = require('../helpers/linkValidator');

const {
  getArticles,
  postArticle,
  deleteArticle,
} = require('../controllers/articles');

router.get('/', getArticles);

router.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().custom(linkValidator).required(),
    image: Joi.string().custom(linkValidator).required(),
  }),
}), postArticle);

router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), deleteArticle);

module.exports = router;
