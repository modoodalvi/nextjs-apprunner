#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("aws-cdk-lib");
const nextjs_app_runner_cdk_app_runner_service_stack_1 = require("../lib/nextjs-app-runner-cdk-app-runner-service-stack");
const nextjs_app_runner_cdk_global_cdn_stack_1 = require("../lib/nextjs-app-runner-cdk-global-cdn-stack");
const app = new cdk.App();
const regions = ['eu-west-1', 'us-east-1'];
const certificate = 'arn:aws:acm:us-east-1:549620884858:certificate/a5085ee4-cb8b-46cc-b2d5-5414b19e5dd2';
const domains = new Map([['eu-west-1', 'nextjs-eu.modood.people.aws.dev'], ['us-east-1', 'nextjs-us.modood.people.aws.dev']]);
for (let region of regions) {
    const id = `nextjs-app-runner-cdk-${region}`;
    new nextjs_app_runner_cdk_app_runner_service_stack_1.NextjsAppRunnerCdkAppRunnerServiceStack(app, id, certificate, domains.get(region), { env: { region: region } });
}
new nextjs_app_runner_cdk_global_cdn_stack_1.NextjsAppRunnerCdkGlobalCdnStack(app, 'nextjs-app-runner-cdk-global', certificate, 'nextjs.modood.people.aws.dev', 'service.modood.people.aws.dev', { env: { region: 'eu-west-1' } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV4dGpzLWFwcC1ydW5uZXItY2RrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibmV4dGpzLWFwcC1ydW5uZXItY2RrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLG1DQUFtQztBQUNuQywwSEFBZ0g7QUFDaEgsMEdBQStGO0FBRy9GLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBRTFCLE1BQU0sT0FBTyxHQUFJLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQzVDLE1BQU0sV0FBVyxHQUFHLHFGQUFxRixDQUFDO0FBQzFHLE1BQU0sT0FBTyxHQUFHLElBQUksR0FBRyxDQUFpQixDQUFDLENBQUMsV0FBVyxFQUFFLGlDQUFpQyxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsaUNBQWlDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFFOUksS0FBSyxJQUFJLE1BQU0sSUFBSSxPQUFPLEVBQUM7SUFDdkIsTUFBTSxFQUFFLEdBQUcseUJBQXlCLE1BQU0sRUFBRSxDQUFDO0lBQzdDLElBQUksd0ZBQXVDLENBQUMsR0FBRyxFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUUsRUFBRSxFQUFDLEdBQUcsRUFBRyxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUMsRUFBQyxDQUFDLENBQUM7Q0FDckg7QUFDRCxJQUFJLHlFQUFnQyxDQUFDLEdBQUcsRUFBRSw4QkFBOEIsRUFBRSxXQUFXLEVBQUUsOEJBQThCLEVBQUUsK0JBQStCLEVBQUUsRUFBQyxHQUFHLEVBQUcsRUFBQyxNQUFNLEVBQUUsV0FBVyxFQUFDLEVBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IE5leHRqc0FwcFJ1bm5lckNka0FwcFJ1bm5lclNlcnZpY2VTdGFjayB9IGZyb20gJy4uL2xpYi9uZXh0anMtYXBwLXJ1bm5lci1jZGstYXBwLXJ1bm5lci1zZXJ2aWNlLXN0YWNrJztcbmltcG9ydCB7TmV4dGpzQXBwUnVubmVyQ2RrR2xvYmFsQ2RuU3RhY2t9IGZyb20gXCIuLi9saWIvbmV4dGpzLWFwcC1ydW5uZXItY2RrLWdsb2JhbC1jZG4tc3RhY2tcIjtcbmltcG9ydCB7SUJ1Y2tldH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1zM1wiO1xuXG5jb25zdCBhcHAgPSBuZXcgY2RrLkFwcCgpO1xuXG5jb25zdCByZWdpb25zID0gIFsnZXUtd2VzdC0xJywgJ3VzLWVhc3QtMSddO1xuY29uc3QgY2VydGlmaWNhdGUgPSAnYXJuOmF3czphY206dXMtZWFzdC0xOjU0OTYyMDg4NDg1ODpjZXJ0aWZpY2F0ZS9hNTA4NWVlNC1jYjhiLTQ2Y2MtYjJkNS01NDE0YjE5ZTVkZDInO1xuY29uc3QgZG9tYWlucyA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KFtbJ2V1LXdlc3QtMScsICduZXh0anMtZXUubW9kb29kLnBlb3BsZS5hd3MuZGV2J10sIFsndXMtZWFzdC0xJywgJ25leHRqcy11cy5tb2Rvb2QucGVvcGxlLmF3cy5kZXYnXV0pO1xuXG5mb3IgKGxldCByZWdpb24gb2YgcmVnaW9ucyl7XG4gICAgY29uc3QgaWQgPSBgbmV4dGpzLWFwcC1ydW5uZXItY2RrLSR7cmVnaW9ufWA7XG4gICAgbmV3IE5leHRqc0FwcFJ1bm5lckNka0FwcFJ1bm5lclNlcnZpY2VTdGFjayhhcHAsIGlkLCBjZXJ0aWZpY2F0ZSwgZG9tYWlucy5nZXQocmVnaW9uKSEsIHtlbnYgOiB7cmVnaW9uOiByZWdpb259fSk7XG59XG5uZXcgTmV4dGpzQXBwUnVubmVyQ2RrR2xvYmFsQ2RuU3RhY2soYXBwLCAnbmV4dGpzLWFwcC1ydW5uZXItY2RrLWdsb2JhbCcsIGNlcnRpZmljYXRlLCAnbmV4dGpzLm1vZG9vZC5wZW9wbGUuYXdzLmRldicsICdzZXJ2aWNlLm1vZG9vZC5wZW9wbGUuYXdzLmRldicsIHtlbnYgOiB7cmVnaW9uOiAnZXUtd2VzdC0xJ319KTtcbiJdfQ==