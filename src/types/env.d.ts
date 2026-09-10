/// <reference types="next" />
/// <reference types="next/image-types/global" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly GOOGLE_GENERATIVE_AI_API_KEY: string;
  }
}
