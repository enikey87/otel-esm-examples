import './instrumentation-auto'

// use await to avoid any import order issues - instrumentation should be loaded before instrumented modules
await import ('./app')
