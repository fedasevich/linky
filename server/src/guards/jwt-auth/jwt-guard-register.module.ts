import { DynamicModule, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

@Module({})
export class JWTGuardRegisterModule {
  static register(): DynamicModule {
    return {
      module: JWTGuardRegisterModule,
      imports: [
        JwtModule.registerAsync({
          useFactory: (configService: ConfigService) => ({
            secret: configService.get("PRIVATE_KEY") || "SECRET",
            signOptions: {
              expiresIn: "24h",
            },
          }),
          inject: [ConfigService],
        }),
      ],
      exports: [JwtModule],
    };
  }
}
