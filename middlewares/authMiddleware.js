const ApiError = require('../exceptions/apiError');
const tokenService = require('../service/tokenService');

module.exports = function (req, res, next) {
    try {
        console.log(req.headers.authorization)
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            console.log(1)
            return next(ApiError.UnauthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            console.log(2)
            return next(ApiError.UnauthorizedError());
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            console.log(3)
            return next(ApiError.UnauthorizedError());
        }
        console.log(4)
        req.user = userData;
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
};