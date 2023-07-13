import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import fastifyInstrumentation from '@opentelemetry/instrumentation-fastify';
import httpInstrumentation from '@opentelemetry/instrumentation-http';
import openTelemetrySdk from '@opentelemetry/sdk-node';
import openTelemetrySdkTraceBase from '@opentelemetry/sdk-trace-base';
import opentelemetrySdkTraceNode from '@opentelemetry/sdk-trace-node';

const { ConsoleSpanExporter } = openTelemetrySdkTraceBase;
const { FastifyInstrumentation } = fastifyInstrumentation;
const { HttpInstrumentation } = httpInstrumentation;
const { NodeSDK } = openTelemetrySdk;
const { SimpleSpanProcessor } = opentelemetrySdkTraceNode

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const traceExporter = new ConsoleSpanExporter();

const sdk = new NodeSDK({
  traceExporter,
  instrumentations: [new HttpInstrumentation(), new FastifyInstrumentation()],
  spanProcessor: new SimpleSpanProcessor(traceExporter),
});

sdk.start();

await import("./app.js");
