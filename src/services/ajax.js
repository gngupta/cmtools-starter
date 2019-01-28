import Vue from 'vue'
import {
  createHttpMiddleware
} from '@commercetools/sdk-middleware-http'
import {
  createLoggerMiddleware
} from '@commercetools/sdk-middleware-logger'
import {
  createClient
} from '@commercetools/sdk-client'


export default function createAjaxClient(host, authMiddleware) {
  return createClient({
    middlewares: [
      authMiddleware,
      createLoggerMiddleware(),
      createHttpMiddleware({
        host: host,
        includeResponseHeaders: true,
        includeOriginalRequest: true,
        maskSensitiveHeaderData: true,
        enableRetry: true,
        retryConfig: {
          maxRetries: 2,
          retryDelay: 300, //milliseconds
          maxDelay: 5000, //milliseconds
        }
      })

    ]
  })
}


Vue.mixin({
  beforeCreate() {
    const options = this.$options;
    if (options.ajax) {
      this.$ajax = options.ajax;
    } else if (options.parent && options.parent.$ajax) {
      this.$ajax = options.parent.$ajax;
    }
  }
})

//export default client;