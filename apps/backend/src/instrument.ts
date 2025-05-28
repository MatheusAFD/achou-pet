// Import with `const Sentry = require("@sentry/nestjs");` if you are using CJS
import * as Sentry from '@sentry/nestjs'

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: 'https://38b3bbb46e30049b4d57d3b35987af12@o4509385991913472.ingest.us.sentry.io/4509386043817984',

    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: true
  })
}
