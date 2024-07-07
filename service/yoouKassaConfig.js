const { YooCheckout } = require('@a2seven/yoo-checkout');

const shop_id = process.env.UKASSA_ID
const shop_secret = process.env.UKASSA_SECRET

const checkout = new YooCheckout({
    shopId: shop_id,
    secretKey: shop_secret
});

module.exports = checkout;