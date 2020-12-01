const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const auth = require('../middlewares/auth');
const linkValidator = require('../helpers/linkValidator');
const {
  getArticles,
  postArticle,
  deleteArticle,
} = require('../controllers/articles');

router.get('/articles', auth, getArticles);

router.post('/articles', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().custom(linkValidator).required(),
    image: Joi.string().custom(linkValidator).required(),
  }),
}), auth, postArticle);

router.delete('/articles/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), auth, deleteArticle);

module.exports = router;
