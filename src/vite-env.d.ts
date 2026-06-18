// @context: Vite environment type declarations
// @purpose: Augments ImportMeta and ImportMetaEnv for type-safe env variable access
// @behavior: Declares VITE_MAPTILER_API_KEY as a required string; add new VITE_ vars here
// @dependencies: None (ambient type declarations)

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAPTILER_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
