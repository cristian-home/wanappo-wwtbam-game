/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: {
    readonly VITE_I18N_LOCALE?: string
    readonly VITE_I18N_FALLBACK_LOCALE?: string
    // Add other environment variables as needed
    readonly [key: string]: string | undefined
  }
}
