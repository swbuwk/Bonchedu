import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async signIn(signInDto: SignInDto) {
        const userInfo = await this.userService.findByLogin(signInDto.login)

        if (!userInfo) {
            throw new HttpException("Неверный логин или пароль", HttpStatus.BAD_REQUEST)
        }

        const {password, ...user} = userInfo

        const passwordMatch = await bcrypt.compare(signInDto.password, password)
        if (!passwordMatch) {
            throw new HttpException("Неверный логин или пароль", HttpStatus.BAD_REQUEST)
        }

        return {
            access_token: await this.jwtService.signAsync({id: user.id, roles: user.roles, username: user.username}),
            ...user
        }
    }

    async signUp(signUpDto: SignUpDto) {
        const existing = await this.userService.findByLogin(signUpDto.login)

        if (existing) {
            throw new HttpException("Пользователь с данным логином существует", HttpStatus.BAD_REQUEST)
        }

        if (signUpDto.password !== signUpDto.passwordRepeat) {
            throw new HttpException("Пароли на совпадают", HttpStatus.BAD_REQUEST)
        }

        const hashPassword = await bcrypt.hash(signUpDto.password, 6)
        const user = await this.userService.create({...signUpDto, password: hashPassword})

        if (!user) {
            throw new HttpException("Неизвестная ошибка", HttpStatus.INTERNAL_SERVER_ERROR)
        }

        return {
          access_token: await this.jwtService.signAsync({id: user.id, roles: user.roles, username: user.username}),
          ...user
        };
    }
}
