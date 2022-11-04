export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            CERTIFICATE_ARN: string;
            APP_RUNNER_CUSTOM_DOMAIN: string;
            CF_ALTERNATE_DOMAIN: string;
        }
    }
}