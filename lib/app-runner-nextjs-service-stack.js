"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NextjsAppRunnerCdkAppRunnerServiceStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const assets = require("aws-cdk-lib/aws-ecr-assets");
const apprunner = require("aws-cdk-lib/aws-apprunner");
const path = require("path");
const iam = require("aws-cdk-lib/aws-iam");
class AppRunnerNextjsServiceStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, certificateArn, domain, props) {
        var _a, _b, _c, _d;
        super(scope, id, props);
        const appRunnerRole = new iam.Role(this, `app-runner-ecr-role-${(_a = props === null || props === void 0 ? void 0 : props.env) === null || _a === void 0 ? void 0 : _a.region}`, {
            assumedBy: new iam.ServicePrincipal('build.apprunner.amazonaws.com'),
            managedPolicies: [
                iam.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSAppRunnerServicePolicyForECRAccess"),
            ]
        });
        const image = new assets.DockerImageAsset(this, `docker-image-${(_b = props === null || props === void 0 ? void 0 : props.env) === null || _b === void 0 ? void 0 : _b.region}`, {
            directory: path.join(__dirname, '../'),
        });
        const service = new apprunner.CfnService(this, `service-${(_c = props === null || props === void 0 ? void 0 : props.env) === null || _c === void 0 ? void 0 : _c.region}`, {
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
                                value: (_d = props === null || props === void 0 ? void 0 : props.env) === null || _d === void 0 ? void 0 : _d.region
                            }
                        ]
                    }
                }
            }
        });
        new aws_cdk_lib_1.CfnOutput(this, 'service-url', { value: `https://${service.attrServiceUrl}` });
    }
}
exports.NextjsAppRunnerCdkAppRunnerServiceStack = AppRunnerNextjsServiceStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV4dGpzLWFwcC1ydW5uZXItY2RrLWFwcC1ydW5uZXItc2VydmljZS1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5leHRqcy1hcHAtcnVubmVyLWNkay1hcHAtcnVubmVyLXNlcnZpY2Utc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBSXFCO0FBRXJCLHFEQUFxRDtBQUNyRCx1REFBdUQ7QUFDdkQsNkJBQTZCO0FBQzdCLDJDQUEyQztBQUUzQyxNQUFhLHVDQUF3QyxTQUFRLG1CQUFLO0lBQ2hFLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsY0FBc0IsRUFBRSxNQUFjLEVBQUUsS0FBa0I7O1FBQ2xHLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sYUFBYSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsdUJBQXVCLE1BQUEsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLEdBQUcsMENBQUUsTUFBTSxFQUFFLEVBQUU7WUFDcEYsU0FBUyxFQUFFLElBQUksR0FBRyxDQUFDLGdCQUFnQixDQUFDLCtCQUErQixDQUFDO1lBQ3BFLGVBQWUsRUFBRTtnQkFDZixHQUFHLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDLG9EQUFvRCxDQUFDO2FBQ2pHO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLGdCQUFnQixNQUFBLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxHQUFHLDBDQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3BGLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUM7U0FDdkMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxPQUFPLEdBQUcsSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxXQUFXLE1BQUEsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLEdBQUcsMENBQUUsTUFBTSxFQUFFLEVBQUU7WUFDOUUsbUJBQW1CLEVBQUU7Z0JBQ25CLHNCQUFzQixFQUFFLElBQUk7Z0JBQzVCLDJCQUEyQixFQUFFO29CQUMzQixhQUFhLEVBQUUsYUFBYSxDQUFDLE9BQU87aUJBQ3JDO2dCQUNELGVBQWUsRUFBRTtvQkFDZixtQkFBbUIsRUFBRSxLQUFLO29CQUMxQixlQUFlLEVBQUUsS0FBSyxDQUFDLFFBQVE7b0JBQy9CLGtCQUFrQixFQUFFO3dCQUNsQiwyQkFBMkIsRUFBRTs0QkFDM0I7Z0NBQ0UsSUFBSSxFQUFFLFFBQVE7Z0NBQ2QsS0FBSyxRQUFFLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxHQUFHLDBDQUFFLE1BQU07NkJBQzFCO3lCQUNGO3FCQUNGO2lCQUNGO2FBQ0Y7U0FDRixDQUFDLENBQUM7UUFFSCxJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxFQUFDLEtBQUssRUFBRSxXQUFXLE9BQU8sQ0FBQyxjQUFjLEVBQUUsRUFBQyxDQUFDLENBQUM7SUFDbkYsQ0FBQztDQUNGO0FBdENELDBGQXNDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENmbk91dHB1dCxcbiAgU3RhY2ssXG4gIFN0YWNrUHJvcHMsXG59IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0ICogYXMgYXNzZXRzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1lY3ItYXNzZXRzJztcbmltcG9ydCAqIGFzIGFwcHJ1bm5lciBmcm9tICdhd3MtY2RrLWxpYi9hd3MtYXBwcnVubmVyJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCAqIGFzIGlhbSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWlhbVwiO1xuXG5leHBvcnQgY2xhc3MgTmV4dGpzQXBwUnVubmVyQ2RrQXBwUnVubmVyU2VydmljZVN0YWNrIGV4dGVuZHMgU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBjZXJ0aWZpY2F0ZUFybjogc3RyaW5nLCBkb21haW46IHN0cmluZywgcHJvcHM/OiBTdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICBjb25zdCBhcHBSdW5uZXJSb2xlID0gbmV3IGlhbS5Sb2xlKHRoaXMsIGBhcHAtcnVubmVyLWVjci1yb2xlLSR7cHJvcHM/LmVudj8ucmVnaW9ufWAsIHtcbiAgICAgIGFzc3VtZWRCeTogbmV3IGlhbS5TZXJ2aWNlUHJpbmNpcGFsKCdidWlsZC5hcHBydW5uZXIuYW1hem9uYXdzLmNvbScpLFxuICAgICAgbWFuYWdlZFBvbGljaWVzOiBbXG4gICAgICAgIGlhbS5NYW5hZ2VkUG9saWN5LmZyb21Bd3NNYW5hZ2VkUG9saWN5TmFtZShcInNlcnZpY2Utcm9sZS9BV1NBcHBSdW5uZXJTZXJ2aWNlUG9saWN5Rm9yRUNSQWNjZXNzXCIpLFxuICAgICAgXVxuICAgIH0pO1xuXG4gICAgY29uc3QgaW1hZ2UgPSBuZXcgYXNzZXRzLkRvY2tlckltYWdlQXNzZXQodGhpcywgYGRvY2tlci1pbWFnZS0ke3Byb3BzPy5lbnY/LnJlZ2lvbn1gLCB7XG4gICAgICBkaXJlY3Rvcnk6IHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi8nKSxcbiAgICB9KTtcblxuICAgIGNvbnN0IHNlcnZpY2UgPSBuZXcgYXBwcnVubmVyLkNmblNlcnZpY2UodGhpcywgYHNlcnZpY2UtJHtwcm9wcz8uZW52Py5yZWdpb259YCwge1xuICAgICAgc291cmNlQ29uZmlndXJhdGlvbjoge1xuICAgICAgICBhdXRvRGVwbG95bWVudHNFbmFibGVkOiB0cnVlLFxuICAgICAgICBhdXRoZW50aWNhdGlvbkNvbmZpZ3VyYXRpb246IHtcbiAgICAgICAgICBhY2Nlc3NSb2xlQXJuOiBhcHBSdW5uZXJSb2xlLnJvbGVBcm5cbiAgICAgICAgfSxcbiAgICAgICAgaW1hZ2VSZXBvc2l0b3J5OiB7XG4gICAgICAgICAgaW1hZ2VSZXBvc2l0b3J5VHlwZTogXCJFQ1JcIixcbiAgICAgICAgICBpbWFnZUlkZW50aWZpZXI6IGltYWdlLmltYWdlVXJpLFxuICAgICAgICAgIGltYWdlQ29uZmlndXJhdGlvbjoge1xuICAgICAgICAgICAgcnVudGltZUVudmlyb25tZW50VmFyaWFibGVzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcIlJFR0lPTlwiLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBwcm9wcz8uZW52Py5yZWdpb25cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgbmV3IENmbk91dHB1dCh0aGlzLCAnc2VydmljZS11cmwnLCB7dmFsdWU6IGBodHRwczovLyR7c2VydmljZS5hdHRyU2VydmljZVVybH1gfSk7XG4gIH1cbn1cbiJdfQ==