import { Controller } from '@nestjs/common';
import {Post, Body} from '@nestjs/common'
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiTags('Auth')
    @ApiOperation({ summary: 'Логин'})
    @Post("signin")
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto)
    }

    @ApiTags('Auth')
    @ApiOperation({ summary: 'Регистрация'})
    @Post("signup")
    signUp(@Body() signUpDto: SignUpDto) {
        return this.authService.signUp(signUpDto)
    }
}
