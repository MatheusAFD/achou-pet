import { Injectable, ExecutionContext } from '@nestjs/common'
import { ThrottlerGuard } from '@nestjs/throttler'

@Injectable()
export class ThrottlerUserGuard extends ThrottlerGuard {
  protected async getTracker(req: Record<string, any>): Promise<string> {
    const forwarded = req.headers['x-forwarded-for']
    const ip = forwarded ? forwarded.split(',')[0].trim() : req.ip

    console.log('IP:', ip)

    return ip
  }

  protected getRequestResponse(context: ExecutionContext) {
    const httpContext = context.switchToHttp()
    return {
      req: httpContext.getRequest(),
      res: httpContext.getResponse()
    }
  }
}
