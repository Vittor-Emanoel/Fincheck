import { Body, Controller, Post } from "@nestjs/common";
import { IsPublic } from "../../shared/decorators/IsPublic";
import { AuthService } from "./auth.service";
import { SigninDto } from "./dto/signin";
import { SignupDto } from "./dto/signup";

@IsPublic()
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signin")
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }

  @Post("signup")
  signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }
}
