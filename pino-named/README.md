# pino with name import

The Pino exports are being detected and modified via IITM in the custom-loading phase, but are not being patched whenever the Pino function is called. This happens because the detected exports of an ES module are different than those of a CommonJS module, and are nested underneath a `default` export in the resolved dictionary.

This means that the instrumentation mixin is never actually applied to the called Pino module and never provides trace context.

This happens around [here](https://github.com/open-telemetry/opentelemetry-js-contrib/blob/1195872a5c4cc9f38dd50704a55e0c06521b8127/plugins/node/opentelemetry-instrumentation-pino/src/instrumentation.ts#L47).
