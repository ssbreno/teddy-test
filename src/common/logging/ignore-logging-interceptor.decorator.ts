import { applyDecorators, SetMetadata } from "@nestjs/common";
import { IGNORE_LOGGING_INTERCEPTOR } from "../constants";

export function IgnoreLoggingInterceptor(): MethodDecorator {
  return applyDecorators(SetMetadata(IGNORE_LOGGING_INTERCEPTOR, true));
}
