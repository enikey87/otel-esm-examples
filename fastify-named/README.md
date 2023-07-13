# fastify with named import

The Fastify exports are being detected and modified via IITM in the custom-loading phase, but are not being patched whenever the Fastify function is called. This happens because the detected exports of an ES module are different than those of a CommonJS module, and are nested underneath a `default` export in the resolved dictionary.

This means that the instrumentation mixin is never actually applied to the called Fastify module and never provides trace context.
