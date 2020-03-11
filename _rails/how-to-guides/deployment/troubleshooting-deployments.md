---
layout: post
template: one-col
title:  "Troubleshooting common deployment issues"
categories: how-to-guides/deployment
order: 2
lead: Troubleshooting common deployment issues
tags: ['troubleshooting,deployment']
legacy: false
permalink: /:collection/:path:output_ext
---

## Overview

Most deployments with Cloud 66 go smoothly, but if you've hit a snag it's usually something common and easily fixable - particularly if you've already deployed your application successfully before. We've listed the most common causes of deployment problems below. If your issue isn't listed here, please reach out to support and we will assist wherever we can.

## Problems reaching your servers


If Cloud 66 is reporting that your server is not online or can't be reached, then follow these steps:

1. Have you recently restarted your server? See the note below.
2. If not, check with your cloud (or physical server) provider to ensure the servers are online and not locked up by excessive load. Reactivating or manually rebooting the machines via your Cloud provider dashboard may be necessary.
3. If the servers appear to be functional, try to connect to them [via SSH](https://help.cloud66.com/rails/how-to-guides/common-tools/ssh-to-server.html) using the Cloud 66 Toolbelt (if this fails, try to connect via the [manual](https://help.cloud66.com/rails/how-to-guides/common-tools/ssh-to-server.html#manual-shell-access) method). 
4. If you still can't connect, check that your firewall settings on your [cloud provider](https://help.cloud66.com/rails/how-to-guides/common-tools/ssh.html#cloud-providers-firewall-api-has-delay) are not blocking access to the servers for port 22 (which is the ssh connection port).
5. Try connecting via your cloud provider's virtual / emulated terminal (where available) and check that the permissions have not been changed in your `.ssh` directories

If all of these fail, contact our support team and we will assist wherever possible. 

### Have you recently restarted your server?

<div class="notice"><p>
Cloud providers frequently change the public IP addresses of servers when they are restarted. This includes all events that require the server to be shut down - including things like adding more capacity, or upgrading software components. This can (temporarily) cause our firewall to block connections to or from that server until our system detects the IP change and updates the firewall rules. This problem should resolve itself within a few minutes. If you'd like to avoid this issue completely, we recommend buying static IP addresses from your cloud provider for use with mission critical servers.
</p></div>

## Problems with application components

Most modern applications rely on a wide range of components, and where these depend on each other, there can be dependency conflicts or other failures. To diagnose and solve these issues, follow these steps.

1. Check the logs of the failed deployment. Usually they will contain detailed information about which component failed and (where possible) why it failed. Normally, the more detailed deployment logs will be available on your server detail page - ensure that you click the "more logs" button to see ALL deployment logs.
2. If there is a version conflict check that your components have not been version-locked in your [Manifest file](https://help.cloud66.com/rails/how-to-guides/deployment/building-a-manifest-file.html). Generally we will deploy the latest canonical versions of components, unless we are instructed not to by a manifest or other setting.
3. Check that your Gemfile or other configuration files (`package.json`, `Rakefile` etc) are not invoking components that are either the wrong versions or that conflict with other configurations elsewhere (or that don't even exist). Gems are a particularly common cause of issues, so check those carefully. 
4. Check which version of Ubuntu your servers are using (you can find this on the detail page for any server, under the **Overview** tab). Older servers may be running version 16.04 or even 14.04, both of which are now deprecated and this can cause issues. Consider [upgrading](https://help.cloud66.com/rails/how-to-guides/deployment/applying-upgrades.html) these servers. 

If all of these fail, contact our support team and we will assist wherever possible. 

## Process or migration timeouts

If a deployment depends on a process to finish running - particularly data or file migrations - it's possible for that process to timeout. This can happen (rarely) with the Ruby [asset precompile process](/rails/how-to-guides/deployment/enable-disable-asset-pipeline.html), for example. 

The cause of the timeout will usually appear in the detailed deployment logs, so be sure to check those. If you are running a CPU or disk intensive process, you might consider running that process locally to debug each step to find any bottlenecks.

For very intensive migrations involving large database tables or thousands of files, you should consider staging or batching the process rather than trying to run it alongside a standard deployment. 

If you need help with the above, contact our support team and we will assist wherever possible. 

## Check your Git repo settings

If your application is pointing at a Git branch (or repo) that has either been deleted or renamed since the last deployment, this is likely to cause any future deployment attempts to fail. 

Check your application settings (click *Settings & Information* in the right-hand navigation) and check that your repo and branch are both correct. You can change either of them by clicking the *Edit* button to the right.

## My problem isn't covered by any of the above

For more uncommon problems not covered above, it's worth following these steps before reaching out to support:

1. Check the detailed deployment logs and find the exact error message (usually these are in red text)
2. Google a few variations of this error message - it's highly likely that someone else has had this issue and then shared the solution online.
3. If you are deploying a new version of your application, consider redeploying an older version to check whether this solves the issue. 
4. Consider deploying a new version of the app alongside the current one, again to check if this solves the issue. 

If all else fails, please reach out to support (below).