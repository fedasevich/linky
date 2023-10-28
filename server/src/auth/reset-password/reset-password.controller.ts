import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TokenResponseDto } from "../dto/token.dto";
import { GenerateResetLinkDto } from "./dto/generate-reset-link.dto";
import { ResetPasswordConfirmDto } from "./dto/reset-password-confirm.dto";
import { ResetPasswordTokenDto } from "./dto/reset-password-token.dto";
import { ResetPasswordService } from "./reset-password.service";

@ApiTags("reset password")
@Controller("auth/reset-password")
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}

  @ApiOperation({ summary: "Validating token" })
  @ApiResponse({ status: 200, type: TokenResponseDto })
  @Get()
  verifyToken(@Query() query: ResetPasswordTokenDto) {
    return this.resetPasswordService.verifyToken(query);
  }

  @ApiOperation({ summary: "Requesting reset password link" })
  @ApiResponse({ status: 200, type: TokenResponseDto })
  @Post()
  generateResetLink(@Body() dto: GenerateResetLinkDto) {
    return this.resetPasswordService.generateResetLink(dto);
  }

  @ApiOperation({ summary: "Requesting reset password link" })
  @ApiResponse({ status: 200, type: TokenResponseDto })
  @Post("/confirm")
  resetPasswordConfirm(@Body() dto: ResetPasswordConfirmDto) {
    return this.resetPasswordService.resetPasswordConfirm(dto);
  }
}
