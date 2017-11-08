<!-- usedin: [ _legacy_docker/stack-management/server-restart-notifications-v1.md, _maestro/stack-management/server-restart-notifications-v1.md, _node/stack-management/server-restart-notifications-v1.md, _rails/stack-management/server-restart-notifications-v1.md] -->


## Is this important? Do I need immediate action?

Unfortunately there is no generic way to answer that question. The answer is that it very much depends on what has been updated and how critical your systems are, and what the potential attach vectors for your server are. For instance, in general it is more important to update your servers that are exposed to the outside world (ie. any servers that have external ports opened such as web or api servers) than an internal backend server not accessible from anywhere except internal systems. 

For this reason, Cloud 66 will promote restart notifications for any server with ports exposed to "anywhere" externally, although all restart notifications are visible on the server detail page. If the restart has not taken place for a long time then eventually it will be promoted up in your stack details page too. However, the urgency is very much application dependant.
