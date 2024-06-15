# fastify with TS & SWC using default import

Let's demonstrate the issue. In this case there is no fastify instrumentation: 
```shell
node --import @swc-node/register/esm-register ./src/main-instrumented-by-sdk.ts
```

You won't see expected line in log:
```
# If you don't see this line in open telemetry logs - no fastify instrumentation is applied
@opentelemetry/instrumentation-fastify Applying instrumentation patch for module on require hook
```

## workaround

To solve this [issue](https://github.com/open-telemetry/opentelemetry-js-contrib/issues/1519) we could try to use workaround using [import-in-the-middle](https://github.com/DataDog/import-in-the-middle) loader:

```shell
node --import @swc-node/register/esm-register --experimental-loader=@opentelemetry/instrumentation/hook.mjs ./src/main-instrumented-by-sdk.ts
```
OK, it works.
```
(node:8466) ExperimentalWarning: `--experimental-loader` may be removed in the future; instead use `register()`:
--import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register("%40opentelemetry/instrumentation/hook.mjs", pathToFileURL("./"));'
(Use `node --trace-warnings ...` to show where the warning was created)

...

@opentelemetry/instrumentation-fastify Applying instrumentation patch for module on require hook {
  module: 'fastify',
  version: '4.27.0',
  baseDir: '/home/enikey/git/otel-esm-examples/fastify-default-ts/node_modules/fastify'
}
```

But experimental API is not good solution on long distance, so let's try to use register() from node:module:

```shell
node --import @songsterr/opentelemetry-ts-instrumentation/register --import @songsterr/swc-loader ./src/main-instrumented-by-sdk.ts
```
OK, it works too.

Let's try to use auto instrumentation package and load instrumentation setup before running main app:

```shell
node --import @songsterr/opentelemetry-ts-instrumentation/register --import @songsterr/swc-loader --import ./src/instrumentation-auto.ts ./src/app.ts
```

Unfortunately, it won't work: fastify not patched. WTF? IDK.

Workaround is to use bootstrap script:

```shell
node --import @songsterr/opentelemetry-ts-instrumentation/register --import @songsterr/swc-loader ./src/main-instrumented-by-auto.ts
```

Where `main-instrumented-by-auto.ts` is:
```typescript
import './instrumentation-auto'

// use await to avoid any import order issues - instrumentation should be loaded before instrumented modules
await import ('./app')
```

## open issues

- fastify spans created by auto instrumentation are not human readable and useless out of box.
- ESM support is in development and not guaranteed to work at all.
