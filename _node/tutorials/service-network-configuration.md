---
layout: post
template: one-col
title: Configuring network access to your application
categories: tutorials
lead: "How to configure your application to be available on the public internet"
legacy: false
tags: ["security", "customization", "NGINX"]
permalink: /:collection/:path:output_ext
---

## Overview

All Node applications deployed via Cloud 66 use Nginx as a combined web server and reverse proxy. By default traffic will be routed to your application over ports 80 and 443 for HTTP and HTTPS traffic respectively. However, you may need your application to be accessible via a different port. This guide walks you through a basic example of changing the port through which your application is served.
What you'll need

Before you start, please check you have the following:

- **A Cloud 66 Account** — If you don't already have one, [sign up](https://app.cloud66.com/users/sign_up){:target="_blank"} sign up for a Cloud 66 account. You'll get free unlimited access to all products for 4 weeks.
- **An existing application set up in Node** — To make the most of this tutorial you need to have a Node app already set up in Cloud 66. Follow our [Getting Started guide](/node/quickstarts/getting_started.html) if you're not sure how to do this.

## Changing the HTTP port

Let’s imagine that for some reason your application needs to use port 8080 rather than port 80 to serve traffic to the web. To achieve this we will need to override the default settings in Nginx. To do this:

1. Open the Application Overview from your [Dashboard](https://app.cloud66.com/dashboard)
2. Click on *Configuration* in the **Application** panel on the right of the screen
3. Click on the *Configuration Files* tab and then on the *NGINX* sub-tab
4. Scroll through the configuration file until you find the `listen` and change the value from `80` to `8080`
5. Click the green *Preview* button to parse your updated configuration
6. Check the file, then add a commit message and click *Commit to Server*

If you now return to **Application Overview** and click on the *visit site* link, the page should fail to load. Now add `:8080` to the end of the URL and the index page should now load.

### Note

<div class="notice"><p>
The change we made above was immediately applied to Nginx and did not require us to redeploy our application, but some changes do require that you redeploy you entire application before they are enabled.
</p></div>

## More advanced options

Cloud 66 supports a wide range of configuration customizations for Nginx. You can read our [in-depth reference guide](/node/references/nginx.html) for more details.

All changes to configuration files in Cloud 66 are automatically tracked and version controlled by CustomConfig git. Read [our guide](/node/tutorials/custom-config.html) to better understand the power of this feature.

### Note

<div class="notice notice-warning"><p>
Editing your Nginx configuration should be approached with caution as an incorrect value can break your application on the front-end. We suggest testing all changes in your non-production environments before applying them to a live application.
</p></div>

## What’s next?

- Learn how to use [CustomConfig](/node/tutorials/custom-config.html) to manage the configuration files for components like Nginx
- Learn how to [configure your public DNS](/node/tutorials/configure-dns.html) to work optimally with Cloud 66 for Node
- Learn how to [add a load balancer](/node/tutorials/configure-dns.html) to your application
- Learn how to set up [custom redirects](/node/how-to-guides/deployment/shells/nginx-redirect.html) through Nginx