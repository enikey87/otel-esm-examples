import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import pinoInstrumentation from '@opentelemetry/instrumentation-pino';
import openTelemetrySdk from '@opentelemetry/sdk-node';
import openTelemetrySdkTraceBase from '@opentelemetry/sdk-trace-base';
import opentelemetrySdkTraceNode from '@opentelemetry/sdk-trace-node';

const { ConsoleSpanExporter } = openTelemetrySdkTraceBase;
const { PinoInstrumentation } = pinoInstrumentation;
const { NodeSDK } = openTelemetrySdk;
const { SimpleSpanProcessor } = opentelemetrySdkTraceNode

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const traceExporter = new ConsoleSpanExporter();

const sdk = new NodeSDK({
  traceExporter,
  instrumentations: [new PinoInstrumentation()],
  spanProcessor: new SimpleSpanProcessor(traceExporter),
});

sdk.start();

await import("./app.js");
