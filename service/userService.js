const UserModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mailService')
const tokenService = require('./tokenService')
const cartService = require('./cartService')
const favoritesService = require('./favoritesService')
const UserDto = require('../dtos/userDto')
const ApiError = require('../exceptions/apiError')

class UserService{
    async registration(email, password){
        const candidate = await UserModel.findOne({email})
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        }


        const hashPassword = await bcrypt.hash(password, 3)
        const activationLink = uuid.v4()
        const user = await UserModel.create({email, password: hashPassword, activationLink})
        await mailService.sendActiovationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`)


        const userDto = new UserDto(user) //id, email,isActivated
        const tokens = tokenService.genetateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        const cartData = await cartService.createCart(userDto.id)

        const favoritesData = await favoritesService.createFavorites(userDto.id)

        return{...tokens, user: userDto, cart: cartData, favorites: favoritesData}
    }

    async activateUser(activationLink){
        const user = await UserModel.findOne({activationLink})
        if (!user) {
            throw ApiError.BadRequest('Неккоректная ссылка активации')
        }
        user.isActivated = true
        user.save()
    }

    async login(email, password){
        const user = await UserModel.findOne({email})
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким email не найден')
        }

        const isPasswordEqual = await bcrypt.compare(password, user.password)
        if (!isPasswordEqual) {
            throw ApiError.BadRequest('Неверный пароль или email')
        }

        const userDto = new UserDto(user)
        const tokens = tokenService.genetateTokens({...userDto})
        await tokenService.saveToken(UserDto.id, tokens.refreshToken)

        return {...tokens, user: userDto}
    }

    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken){
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        console.log(refreshToken ,userData, tokenFromDb)
        if (!userData || !tokenFromDb){
            console.log(userData, tokenFromDb)
            throw ApiError.UnauthorizedError()
        }

        const user = await UserModel.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = tokenService.genetateTokens({...userDto})

        await tokenService.saveToken(UserDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}

    }

    async getAllUsers(){
        const users = await UserModel.find()
        return users
    }

}

module.exports = new UserService();