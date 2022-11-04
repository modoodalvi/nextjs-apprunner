#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import {AppRunnerNextjsServiceStack} from '../lib/app-runner-nextjs-service-stack';
import {CloudFrontDynamicRoutingStack} from "../lib/cloud-front-dynamic-routing-stack";

const app = new cdk.App();

const regions = ['eu-west-1', 'us-east-1'];
const certificateArn = process.env.CERTIFICATE_ARN;
const appRunnerCustomDomain = process.env.APP_RUNNER_CUSTOM_DOMAIN;
const cloudFrontAlternateDomain = process.env.CF_ALTERNATE_DOMAIN;
const staticAssetBucketRegion = 'eu-west-1';

for (let region of regions) {
    const id = `app-runner-nextjs-${region}`;
    new AppRunnerNextjsServiceStack(app, id, {env: {region: region}});
}
new CloudFrontDynamicRoutingStack(app, 'cloudfront-app-runner',
    {
        certificateArn: certificateArn,
        alternateDomain: cloudFrontAlternateDomain,
        route53Url: appRunnerCustomDomain,
        env: {region: staticAssetBucketRegion}
    });