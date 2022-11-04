import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
export declare class NextjsAppRunnerCdkAppRunnerServiceStack extends Stack {
    constructor(scope: Construct, id: string, certificateArn: string, domain: string, props?: StackProps);
}
