import {Body, Controller, HttpCode, Post, Request, UseGuards, ValidationPipe} from '@nestjs/common';
import {SignUpDto} from './dto/signup.dto';
import {AuthService} from './auth.service';
import {LocalAuthGuard} from './guards/local.guard';
import {User} from './decorators/user.decorator';
import {JwtAuthGuard} from "./guards/jwt.guard";

@Controller('api/auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @HttpCode(200)
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('signup')
    @HttpCode(201)
    async signUp(@Body(new ValidationPipe()) signUpDto: SignUpDto) {
        return this.authService.signUp(signUpDto);
    }

    @Post('me')
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    async me(@User() user) {
        return {
            user
        };
    }

}
