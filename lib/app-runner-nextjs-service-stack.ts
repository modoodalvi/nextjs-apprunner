import {
  CfnOutput,
  Stack,
  StackProps,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as assets from 'aws-cdk-lib/aws-ecr-assets';
import * as apprunner from 'aws-cdk-lib/aws-apprunner';
import * as path from "path";
import * as iam from "aws-cdk-lib/aws-iam";

export class AppRunnerNextjsServiceStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const appRunnerRole = new iam.Role(this, `app-runner-ecr-role-${props.env?.region}`, {
      assumedBy: new iam.ServicePrincipal('build.apprunner.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSAppRunnerServicePolicyForECRAccess"),
      ]
    });

    const image = new assets.DockerImageAsset(this, `docker-image-${props.env?.region}`, {
      directory: path.join(__dirname, '../'),
    });

    const service = new apprunner.CfnService(this, `service-${props.env?.region}`, {
      sourceConfiguration: {
        autoDeploymentsEnabled: true,
        authenticationConfiguration: {
          accessRoleArn: appRunnerRole.roleArn
        },
        imageRepository: {
          imageRepositoryType: "ECR",
          imageIdentifier: image.imageUri,
          imageConfiguration: {
            runtimeEnvironmentVariables: [
              {
                name: "REGION",
                value: props.env?.region
              }
            ]
          }
        }
      }
    });

    new CfnOutput(this, 'service-url', {value: `https://${service.attrServiceUrl}`});
  }
}
