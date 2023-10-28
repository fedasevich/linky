import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { v4 as uuidv4 } from "uuid";
import { UsersService } from "../../users/users.service";
import { AuthService } from "../auth.service";
import { GenerateResetLinkDto } from "./dto/generate-reset-link.dto";
import { ResetPasswordConfirmDto } from "./dto/reset-password-confirm.dto";
import { ResetPasswordTokenDto } from "./dto/reset-password-token.dto";
import { ResetPassword } from "./reset-password.model";

@Injectable()
export class ResetPasswordService {
  constructor(
    private userService: UsersService,
    private readonly authService: AuthService,
    @InjectModel(ResetPassword)
    private resetPasswordRepository: typeof ResetPassword
  ) {}

  async verifyToken(token: ResetPasswordTokenDto) {
    const existingResetPassword = await this.resetPasswordRepository.findOne({
      where: { token: token.token },
    });

    if (!existingResetPassword) {
      throw new HttpException(
        { message: "Token is invalid." },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  async generateResetLink({ email }: GenerateResetLinkDto) {
    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const userByEmail = await this.userService.getUserByEmail(email);

    if (!userByEmail) {
      throw new HttpException(
        { message: "Invalid email." },
        HttpStatus.BAD_REQUEST
      );
    }

    const existingResetPassword = await this.resetPasswordRepository.findOne({
      where: { userId: userByEmail.id },
    });

    if (existingResetPassword) {
      throw new HttpException(
        { message: "Password reset link was already sent." },
        HttpStatus.BAD_REQUEST
      );
    }

    const token = uuidv4();

    const resetLink = `${process.env.FRONT_END_LINK}/reset-confirm?token=${token}`;

    const message = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: "Reset Password",
      templateId: process.env.SENDGRID_RESET_PASSWORD_TEMPLATE_ID,
      // eslint-disable-next-line camelcase
      dynamic_template_data: {
        resetLink,
      },
    };

    try {
      const data = await sgMail.send(message);
      if (data[0].statusCode === 202) {
        await this.resetPasswordRepository.create({
          userId: userByEmail.id,
          token,
        });
      }
    } catch {
      throw new HttpException(
        {
          message: "Something went wrong during sending email.",
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    return { changed: true };
  }

  async resetPasswordConfirm({ token, password }: ResetPasswordConfirmDto) {
    const existingResetPassword = await this.resetPasswordRepository.findOne({
      where: { token },
    });

    if (!existingResetPassword) {
      throw new HttpException(
        { message: "Wrong token." },
        HttpStatus.BAD_REQUEST
      );
    }
    const hashedPassword = await this.authService.hashPassword(password);

    const updatedUser = await this.userService.changePassword(
      existingResetPassword.userId,
      hashedPassword
    );

    await this.resetPasswordRepository.destroy({
      where: { token },
    });

    return updatedUser;
  }
}
