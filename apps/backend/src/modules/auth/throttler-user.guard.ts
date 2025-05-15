// throttler-user.guard.ts
import { Injectable, ExecutionContext } from '@nestjs/common'
import { ThrottlerGuard } from '@nestjs/throttler'

@Injectable()
export class ThrottlerUserGuard extends ThrottlerGuard {
  protected async getTracker(req: Record<string, any>): Promise<string> {
    return Promise.resolve(req.user?.id?.toString() ?? req.ip)
  }

  protected getRequestResponse(context: ExecutionContext) {
    const httpContext = context.switchToHttp()
    return {
      req: httpContext.getRequest(),
      res: httpContext.getResponse()
    }
  }
}
