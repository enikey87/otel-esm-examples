import { trace } from '@opentelemetry/api';
import { pino } from 'pino';

const tracer = trace.getTracer("example");

const span = tracer.startSpan('pino-default');

const log = pino();
log.info("foobar");

span.end()