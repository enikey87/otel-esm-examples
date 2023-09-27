# fastify with named import

This is an example of the Fastify instance not being fully patched when constructed through the named `fastify` export.

Here, we can see a debug message that the constructor itself was patched, but never the underlying components: e.g. hooks, handlers, or `reply.send`. We can further see that the patch did not apply when running the below script to call the router and inspecting the logged span, which lacks attributes added by `@opentelemetry/instrumentation-fastify`, such as the `http.route`.

```bash
curl localhost:3000/baz
```
