// !!! ALERT !!!
// DO NOT IMPORT ANYTHING MORE HERE BECAUSE IT WILL BREAK OTEL's MONKEY PATCHING
// AND INSTRUMENTATION WON'T WORK AT ALL
// THANK YOU

import { otel } from '@songsterr/opentelemetry-ts-instrumentation'

import pkg from '../package.json' assert { type: 'json' }

otel.initialize({
  packageJson: pkg,
  printAllSdkLogs: true,
  fastify: true,
})
