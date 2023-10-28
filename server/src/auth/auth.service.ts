import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { User } from "../users/users.model";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(userDto: CreateUserDto) {
    const user = await this.validateRegularUser(userDto);
    return this.generateToken(user);
  }

  async hashPassword(password: string) {
    const hashedPassword = await bcrypt.hash(password, 5);
    return hashedPassword;
  }

  async signUp(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException(
        { message: "User with this email already exists" },
        HttpStatus.BAD_REQUEST
      );
    }

    const hashedPassword = await this.hashPassword(userDto.password);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashedPassword,
    });
    return this.generateToken(user);
  }

  private generateToken(user: User) {
    const payload = { email: user.email, id: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateRegularUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (!user) {
      throw new UnauthorizedException({ message: "User doesn't exist" });
    }

    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({ message: "Wrong password or email" });
  }

  checkToken(req: Request & { user: User }) {
    const token = this.generateToken(req.user);
    return token;
  }
}
