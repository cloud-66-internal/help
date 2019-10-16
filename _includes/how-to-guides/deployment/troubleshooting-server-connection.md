## Overview

If you're having trouble connecting to one of your servers, or your servers can't reach one another, it's often the result of a common issue that is easily resolved once you know what to look for. We've listed the most common issues and their resolutions below.

## Temporary network interruptions

The most common cause of errors connecting to servers is some kind of temporary interruption in network connectivity. Such interruptions are not uncommon, and typically resolve themselves quickly. Wait a few minutes and try again. If the problem persists, work through the rest of this guide.

## Recent server restart(s)

Cloud providers sometimes change the public IP addresses of servers when they are restarted. This includes all events that require the server to be shut down - including things like adding more capacity, or upgrading some components. This can (temporarily) cause our firewall to block connections to or from that server until our system detects the IP change and updates the firewall rules. 

This problem should resolve itself within a few minutes (when Cloud 66 Agent updates the stack with the server's new IP address). If you'd like to avoid this issue completely, we recommend setting static IP addresses from your cloud provider for use with mission critical servers. Please reach out to your cloud provider to find out more about how to assign fixed IPs to your servers.

## Heavy load on the servers

If your servers are under heavy load - such as high CPU usage or high network traffic - they will be slow to respond to new connection requests and this may result in timeouts. You should check the load on your servers by logging in to your cloud provider's dashboard and checking the usage statistics. Your next step depends on what you find:

1. If the stats show that your servers are experiencing a temporary usage spike, you should wait a few minutes until the load comes back down to normal levels.
2. If your servers are regularly (or continuously) maxing out their allocation of any resource (CPU, RAM, network or disk) then it is highly likely that they are not powerful enough to handle the needs of your application. In this case you should strongly consider deploying your app to new (larger) servers, switching over to them once they are up and running and then dropping the original server(s).

## Memory leaks

This is a notable variation on the issue described above. An error in your application code may be gradually reserving RAM without ever releasing it. The typical symptoms are that the average usage of RAM climbs consistently over time, as does the swap usage of the disk (as the server tries to compensate by using "virtual memory"), eventually maxing out. 

Note that simply increasing the capacity of your servers will not fix this issue - it will simply prolong the period before RAM is exhausted. The best solution to this issue is to find and fix the leak. A temporary fix is to regularly restart your servers to flush the RAM usage, but we don't recommend this approach for critical and/or production servers.