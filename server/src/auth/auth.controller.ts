import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { JwtAuthGuard } from "../guards/jwt-auth/jwt-auth.guard";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { User } from "../users/users.model";
import { AuthService } from "./auth.service";
import { TokenResponseDto } from "./dto/token.dto";

@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: "Login in the system" })
  @ApiResponse({ status: 200, type: TokenResponseDto })
  @Post("/sign-in")
  signIn(@Body() userDto: CreateUserDto) {
    return this.authService.signIn(userDto);
  }

  @ApiOperation({ summary: "Registration in the system" })
  @ApiResponse({ status: 200, type: TokenResponseDto })
  @Post("/sign-up")
  signUp(@Body() userDto: CreateUserDto) {
    return this.authService.signUp(userDto);
  }

  @ApiOperation({ summary: "Validating token" })
  @ApiResponse({ status: 200, type: TokenResponseDto })
  @UseGuards(JwtAuthGuard)
  @Get("/check")
  check(@Req() req: TokenResponseDto & Request & { user: User }) {
    console.log("check");
    return this.authService.checkToken(req);
  }
}
