import { Injectable } from '@nestjs/common'

import { env } from 'env'
import { Resend } from 'resend'

interface EmailParams {
  to: string
  subject: string
  html: string
  from?: string
}

@Injectable()
export class EmailsService {
  private resend: Resend

  constructor() {
    this.resend = new Resend(env.RESEND_API_KEY)
  }

  async send({ to, subject, html, from }: EmailParams) {
    return this.resend.emails.send({
      from: from || env.RESEND_EMAIL_FROM,
      to,
      subject,
      html
    })
  }
}
