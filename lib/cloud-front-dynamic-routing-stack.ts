import {
    CfnOutput,
    Stack,
    StackProps,
} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as cf from "aws-cdk-lib/aws-cloudfront";
import * as acm from "aws-cdk-lib/aws-certificatemanager";

interface CloudFrontDynamicRoutingStackProps extends StackProps {
    certificateArn: string,
    alternateDomain: string,
    route53Url: string
}

export class CloudFrontDynamicRoutingStack extends Stack {
    constructor(scope: Construct, id: string, props: CloudFrontDynamicRoutingStackProps) {
        super(scope, id, props);

        const nextBucket = new s3.Bucket(this, `nextjs-app-static-assets-bucket-`, {
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
        });

        const certificate = acm.Certificate.fromCertificateArn(this, "certificate", props.certificateArn);
        const cloudfrontDistribution = new cloudfront.Distribution(this, 'distribution-global', {
            defaultBehavior: {
                origin: new origins.HttpOrigin(props.route53Url, {
                    protocolPolicy: cf.OriginProtocolPolicy.HTTPS_ONLY
                }),
                viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
            },
            additionalBehaviors: {
                '_next/static/*': {
                    origin: new origins.S3Origin(nextBucket),
                    viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.HTTPS_ONLY,
                },
                'static/*': {
                    origin: new origins.S3Origin(nextBucket),
                    viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.HTTPS_ONLY,
                },
            },
            domainNames: [props.alternateDomain],
            certificate: certificate
        });

        new s3deploy.BucketDeployment(this, 'deploy-next-static-bucket', {
                sources: [s3deploy.Source.asset('app/.next/static/')],
                destinationBucket: nextBucket,
                destinationKeyPrefix: '_next/static',
                distribution: cloudfrontDistribution,
                distributionPaths: ['/_next/static/*']
            }
        );

        new s3deploy.BucketDeployment(this, 'deploy-next-public-bucket', {
                sources: [s3deploy.Source.asset('app/public/static/')],
                destinationBucket: nextBucket,
                destinationKeyPrefix: 'static',
                distribution: cloudfrontDistribution,
                distributionPaths: ['/static/*']
            }
        );

        new CfnOutput(this, 'CloudFront URL', {value: `https://${cloudfrontDistribution.distributionDomainName}`});
    }
}
