import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { HealthCheck, HealthCheckService } from "@nestjs/terminus";
import { IgnoreLoggingInterceptor } from "../core";
import { AppHealthIndicator } from "./app.health";

@Controller(["healthcheck", "health"])
@ApiTags("Healthcheck")
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly appHealthIndicator: AppHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @ApiOperation({ summary: "Get application liveness" })
  @IgnoreLoggingInterceptor()
  public async check() {
    return this.health.check([
      async () => this.appHealthIndicator.isHealthy("app"),
    ]);
  }
}
