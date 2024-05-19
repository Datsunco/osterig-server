const ApiError = require('../exceptions/apiError');

module.exports = function (err, req, res, next) {
    console.log(err);
    console.log('check')
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message, errors: err.errors})
    }
    return res.status(500).json({message: 'Непредвиденная ошибка', err})

}; 