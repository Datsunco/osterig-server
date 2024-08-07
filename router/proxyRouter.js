const Router = require('express').Router;
const proxyController = require('../controllers/proxyContorller');
const router = new Router();
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/product/parse/:link', proxyController.parse_product);
router.get('/product/same/parse/:link', proxyController.parse_same_product);
router.get('/catalog/parse/data/:link/:selected', proxyController.parse_data);
// router.get('/catalog/parse/hotdata', proxyController.parse_data);
router.get('/catalog/parsebypage/data/:link/:page/:selected', proxyController.parse_parsebypage);
router.get('/catalog/parsebypage/hotdata/:page/:selected', proxyController.parse_hot_parsebypage);
router.get('/catalog/parse/params/:link/:selected', proxyController.parse_params);
router.get('/catalog/parse/params/:selected', proxyController.parse_hot_params);
router.get('/catalogs/parse', proxyController.parse_catalogs);
router.get('/hotparse', proxyController.parse_hot);
router.get('/search/:keyword', proxyController.search_data);
router.get('/onlevel/:keyword', proxyController.onlevel_data);
router.get('/pre/:keyword', proxyController.pre_data);
router.get('/pre/link/:type/:keyword', proxyController.pre_link);


module.exports = router