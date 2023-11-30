const Router = require('express').Router;
const proxyController = require('../controllers/proxyContorller');
const router = new Router();
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/product/parse/:link', proxyController.parse_product);
router.get('/product/same/parse/:link', proxyController.parse_same_product);
router.get('/catalog/parse/data/:link/:selected', proxyController.parse_data);
router.get('/catalog/parse/params/:link/:selected', proxyController.parse_params);
router.get('/catalogs/parse', proxyController.parse_catalogs);
router.get('/hotparse', proxyController.parse_hot);
router.get('/search/:keyword', proxyController.search_data);
router.get('/onlevel/:keyword', proxyController.onlevel_data);
//router.get('/users', authMiddleware, userController.getUsers);

module.exports = router