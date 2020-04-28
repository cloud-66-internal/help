---
layout: post
template: one-col
title:  "Using custom Rack servers"
categories: tutorials
order: 1
lead: Run your Rack apps with Passenger, Puma, Unicorn or Thin
legacy: false
tags: ['Web server, Rack server']
permalink: /:collection/:path:output_ext
---

By default, applications deployed by Cloud 66 run on [Phusion Passenger](https://www.phusionpassenger.com/) behind [Nginx](http://wiki.nginx.org/Main). You can also choose to use one of several servers:

- [Passenger Enterprise](/rails/how-to-guides/rack-servers/passenger-enterprise.html)
- [Puma](/rails/how-to-guides/rack-servers/puma-rack-server.html)
- [Unicorn](/rails/how-to-guides/rack-servers/unicorn-rack-server.html)
- [Thin](/rails/how-to-guides/rack-servers/thin-rack-server.html)

It's vital to distinguish between these Rack-based **application**  (or "web app") servers and Nginx which acts as the **public web front-end** for Cloud 66 applications. We usually refer to Nginx as our "web server", but it performs a different task to the Rack-based app servers described in this doc.

### Important
<div class="notice">
<p>You need to choose your web app / Rack server when you first build an application. Changes to or from Passenger will not be applied after your application has initially been built. You can however change freely between other supported servers after build.</p>
</div>

## Configuring a custom Rack server

If you would like to use a different server, there are some points you'd need to consider for it to work with a Cloud 66 application. These conventions will allow Cloud 66 to redirect traffic to your servers and manage them for availability, memory consumption and restart cycles.

### Traffic Socket
For the traffic to be redirected to your web app server, it should use a Unix socket at `/tmp/web_server.sock`

### PID file
For the web app server to be managed and restarted properly by Cloud 66, it needs to have it's PID file at `/tmp/web_server.pid`

## Manual control of the web servers
To control your web app servers manually via [systemd](/rails/how-to-guides/deployment/systemd.html) you can use the following commands:

### Stop the web server
{% highlight shell %}
sudo systemctl stop cloud66_web_server.service
{% endhighlight %}

### Start the web server
{% highlight shell %}
sudo systemctl start cloud66_web_server.service
{% endhighlight %}

### Restart the web server

If supported by your web app server, you can use the following command to restart the web app server with no down time (this will send a USR2 signal to the server)

{% highlight shell %}
sudo systemctl restart cloud66_web_server.service
{% endhighlight %}

## What’s next?

* Learn how to [add a load balancer](/rails/tutorials/load-balancing.html) to your application
* Learn how to [set up your DNS records](/rails/tutorials/configure-dns.html) to work with Cloud 66
* Learn how to [configure network access](/rails/tutorials/service-network-configuration.html) to your application
* Learn how to configure other web app servers like [Puma, Thin and Unicorn](/rails/how-to-guides/rack-servers/)
