import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import pgInstrumentation from '@opentelemetry/instrumentation-pg';
import openTelemetrySdk from '@opentelemetry/sdk-node';
import openTelemetrySdkTraceBase from '@opentelemetry/sdk-trace-base';
import opentelemetrySdkTraceNode from '@opentelemetry/sdk-trace-node';

const { ConsoleSpanExporter } = openTelemetrySdkTraceBase;
const { PgInstrumentation } = pgInstrumentation;
const { NodeSDK } = openTelemetrySdk;
const { SimpleSpanProcessor } = opentelemetrySdkTraceNode

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const traceExporter = new ConsoleSpanExporter();

const sdk = new NodeSDK({
  traceExporter,
  instrumentations: [new PgInstrumentation()],
  spanProcessor: new SimpleSpanProcessor(traceExporter),
});

sdk.start();

await import("./app.js");
