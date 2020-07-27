---
layout: post
template: one-col
title: Enabling basic authentication via Nginx
categories: how-to-guides/nginx
order: 2
lead: "How to enable Nginx's basic HTTP authentication"
legacy: false
change: true
permalink: /:collection/:path:output_ext
tags: ["nginx"]
---

## Overview

You can use Cloud 66 [CustomConfig](/maestro/tutorials/custom-config.html) to protect your application or parts of it with a username and password based on HTTP basic authentication.

## Enabling basic authentication

Follow the instructions below to set up basic authentication on Nginx:

1.  We'll use [htpasswd](http://httpd.apache.org/docs/2.2/programs/htpasswd.html) to create your password file - it encrypts it the password with MD5 encryption. Install it: 
```shell
sudo apt-get install apache2-utils -y
```

2.  Once that is installed, we're ready to create your password file. We recommend that you create this file within your repository, which will be deployed to your servers. This command will prompt you to input a password.
```shell
sudo htpasswd -c <directory>.htpasswd <user_name>
```

3.  Now we can customize the Nginx configuration using [CustomConfig](/maestro/references/nginx.html).


4. You will want to add the following code within the server section of your configuration.
```shell
auth_basic "Restricted";
auth_basic_user_file {{ deploy_to }}/current/.htpasswd;
```

This will read your password file from your repository directory on the server. Once you save that configuration, it will apply immediately on your server.

