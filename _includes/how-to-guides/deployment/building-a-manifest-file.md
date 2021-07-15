## Overview

A manifest file allows you to be more explicit about your application composition and control settings that are not usually available through the user interface or Cloud 66 toolbelt. See [Getting started with manifest files](/{{page.collection}}/quickstarts/getting-started-with-manifest.html) for an introduction.

{% if include.product == 'rails' %}

For Rails/Rack applications the path for `manifest.yml` is:

```shell
<application-root>/.cloud66/manifest.yml
```

The `.cloud66` folder must in the root of your source code & repo.

{% endif %}

{% if include.product == 'maestro' %}

In Maestro there are two opportunities to edit your manifest file:

* After your application code has been analyzed (but before you deploy it) by using the _advanced_ tab.
* After your application has been deployed, by clicking on *Configuration Files* and then the *Manifest* tab in the Dashboard

{% endif %}

{% if include.product == 'node' %}

In Cloud 66 for Node, there are two opportunities to edit your manifest file:

* After your application code has been analyzed (but before you deploy it) by using the _advanced_ tab.
* After your application has been deployed, by clicking on *Configuration Files* and then the *Manifest* tab in the Dashboard

{% endif %}

#### Problems upgrading?
<div class="notice"><p>
If you explicitly set the version of any component in your manifest file, we will respect that setting even if it conflicts with other system changes or upgrades (for example upgrading Ubuntu). If you are having trouble upgrading any component of your application, remember to check your manifest file to ensure you have not previously locked the version of that component or one of its dependents. </p></div>

## The structure of a Manifest file

Manifest files are made up of blocks of settings that define the infrastructural elements of your application. This includes both the “hardware” (virtual or real servers) and the “software” (such as the version of Docker your application uses). 

A typical block of settings will contain some combination the following:

- **Environment** (optional) - the environment to which the settings apply
- **Component settings** (required) - the settings for the component being configured (e.g. MySQL or an AWS Load Balancer)
- **Server definition** (optional) - the specifications for the server used by the component defined in the settings above
- **Custom log files** (optional) - each component can be configured to use custom LiveLog files

You can also control and customize some other elements in your Manifest including:

- **Environment variables** - you can set environment variables for your app
- **Background processes** - you can customize the Linux signals used to control your background processes

#### Important
<div class="notice notice-warning"><p>It is vital that you understand the limits and caveats of manifest settings. Please read our <a href="/maestro/references/manifest-structure.html#classes-of-manifest-file-settings">reference guide</a> before you start creating your own manifest files.</p></div>

## Environment settings

The (optional) **environment** setting allows you to use the same `manifest.yml` for multiple applications with different environments. Some examples are:

- production
- staging
- development

You can also use your own custom environment names in your Manifest file.

### Applying settings across all environments

If you would like your manifest setting to apply to **all environments**, you can simple drop the root level environment node from your YAML. This will ensure a component is always provisioned, regardless of environment.

## Component settings

The (mandatory) component settings define how a component is configured. The Manifest file currently supports the following components (click on any component name for a detailed doc):

{% if include.product == "maestro" %}
*   [Docker](/{{page.collection}}/references/manifest-web-settings.html#docker){% endif %}
*   [ElasticSearch](/{{page.collection}}/references/manifest-database-settings.html#elasticsearch)
*   [Gateway](/{{page.collection}}/references/manifest-web-settings.html#gateway)
*   [GlusterFS](/{{page.collection}}/references/manifest-database-settings.html#glusterfs)
*   [Load balancers](/{{page.collection}}/references/manifest-loadbalancer-settings.html)
*   [Memcached](/{{page.collection}}/references/manifest-database-settings.html#memcached)
*   [MongoDB](/{{page.collection}}/references/manifest-database-settings.html#mongodb)
*   [MySQL](/{{page.collection}}/references/manifest-database-settings.html#mysql)
*   [Nginx](/{{page.collection}}/references/manifest-web-settings.html#nginx) {% if include.product == "rails" %}
*   [Node version](/{{page.collection}}/references/manifest-web-settings.html#node-version) {% endif %}
*   [PostGIS](/{{page.collection}}/references/manifest-database-settings.html#postgis)
*   [PostgreSQL](/{{page.collection}}/references/manifest-database-settings.html#postgresql)
*   [Redis](/{{page.collection}}/references/manifest-database-settings.html#redis) {% if include.product == "rails" %}
*   [Sinatra](/{{page.collection}}/references/manifest-web-settings.html#sinatra)
*   [Rails](/{{page.collection}}/references/manifest-web-settings.html#rails)
*   [Rails health checks](/{{page.collection}}/references/manifest-web-settings.html#rails-rack-deployment-health-checks){% endif %}

#### Note
<div class="notice notice-warning"><p>
If you explicitly set the version of any component in your manifest file, we will respect that setting even if it conflicts with other system changes or upgrades (for example upgrading Ubuntu). If you are having trouble upgrading any component of your application, remember to check your manifest file to ensure you have not previously locked the version of that component or one of its dependents. </p></div>

## Server definitions

Every component defined in the manifest file must be bound to a server. However, if you'd like configurations to apply to all your servers, you don't need to specify a server type.

Servers can be deployed specifically to host a single component, be shared between multiple components (e.g. Rails and MySQL on the same server) or be an external server (e.g. using an external database).

Here is an example of a simple server definition:

```yaml
rails:
  servers:
  - server:
      unique_name: app

```

These are the parameters that the _server_ section can take:

<table class='table table-bordered table-striped'>
<thead>
  <tr>
    <th width="25%">Option</th>
    <th width="16%">Applied on</th>
    <th>Description</th>
    <th width="15%">Clouds</th>
  </tr>
</thead>
<tbody>
    <tr>
    <td><code>availability_zone</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>Availability zone of the server instance in AWS EC2 region.</td>
    <td>AWS</td>
  </tr>
  <tr>
    <td><code>key_name</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>The name of the API key for the cloud account where the server will be built. You can see (and edit) all your cloud API key names in your <a href="https://app.cloud66.com/clouds">Dashboard Settings</a>. This is used when an account has multiple keys for a given cloud vendor. The default value is <code>Default</code>.</td>
    <td>All</td>
  </tr>
  <tr>
    <td><code>region</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>The <a href="http://developers.cloud66.com/#cloud-vendor-instance-regions">data center region</a> where the server will be built.</td>
    <td>All</td>
  </tr>
  <tr>
    <td><code>root_disk_size</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>Default size of root disk (in GB) for servers used by application. Default value is 50.</td>
    <td>AWS, Azure, GCE</td>
  </tr>
  <tr>
    <td><code>root_disk_type</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>Disk type, accepted values being <code>ssd</code> and <code>magnetic</code>. Default is <code>ssd</code>.</td>
    <td>AWS, GCE</td>
  </tr>
  <tr>
    <td><code>size</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>The <a href="http://developers.cloud66.com/#cloud-vendor-instance-names">size of the server instance</a> to be created.</td>
    <td>All</td>
  </tr>
  <tr>
    <td><code>subnet_id</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>ID of the AWS subnet in which you would like to create your servers.</td>
    <td>AWS</td>
  </tr>
  <tr>
    <td><code>unique_name</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>A unique name for this server (<strong>Required</strong> if you are specifying a server type)</td>
    <td>All</td>
  </tr>
  <tr>
    <td><code>vendor</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>Cloud vendor where the server will be built. Valid values: <code>aws</code>, <code>azure_rm</code> (use <code>azure</code> for older Azure accounts), <code>clouda</code>, <code>digitalocean</code>, <code>googlecloud</code>, <code>hetzner</code>, <code>linode</code>, <code>maxihost</code>, <code>ovh</code>, <code>packet</code>, <code>rackspace</code>, and <code>vultr</code></td>
    <td>All</td>
  </tr>
</tbody>
</table>

#### Important
<div class="notice notice-warning">
<p>All of the servers for an application must belong to a single cloud vendor and region. Different applications may use different clouds, but a single application cannot use multiple clouds. </p>
</div>

A more complex server example

```yml
rails:
  servers:
  - server:
      unique_name: app
      vendor: aws
      key_name: Default
      region: us-east-1
      size: m3.medium
      root_disk_size: 100
      root_disk_type: ssd
      subnet_id: subnet-40000000
      availability_zone: us-east-1c
```

### Deploy to your own server

You can deploy to one of your [Registered servers](/{{page.collection}}/how-to-guides/deployment/registered-servers.html) via manifest settings. The server must be registered before deployment.

<table class='table table-bordered table-striped'>
<thead>
  <tr>
    <th width="25%">Option</th>
    <th width="16%">Applied on</th>
    <th>Description</th>
    <th width="15%">Clouds</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><code>address</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>IP address of the server, only applicable to <a href="/{{page.collection}}/how-to-guides/deployment/registered-servers.html">Registered Servers</a></td>
    <td>Registered servers</td>
  </tr>
  <tr>
    <td><code>unique_name</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>Unique name for the registered server</td>
    <td>Registered servers</td>
  </tr>
</tbody>
</table>

### Example of registered server

```yml
redis:
  servers:
  - server:
      unique_name: redis-main
      address: 123.123.123.123
```

### Shared Servers

You can share a server between two components. This allows you to, for example, use a server for both your front-end app and the database server backing it.

<table class='table table-bordered table-striped'>
<thead>
  <tr>
    <th width="25%">Option</th>
    <th width="16%">Applied on</th>
    <th>Description</th>
    <th width="15%">Clouds</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><code>same_as</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>The name of another server definition in the same manifest file. This component will use the same server when it is deployed.</td>
    <td>All</td>
  </tr>
</tbody>
</table>

### Example of shared server

```yaml
rails:
  servers:
  - server:
      unique_name: my_rails_app
      vendor: aws
      key_name: Default
      region: us-east-1
      size: m3.medium
mongodb:
  servers:
  - server:
      same_as: my_rails_app
```


### External Servers

If you would like to use an external server for a component (like using your own MySQL or AWS RDS instance, for example), you can define that server as external.

External server definitions specify that the component is hosted on a server external to Cloud 66. This is not a valid target for your main application (e.g. rails) but may be appropriate for another component (e.g. MongoDB):

```yml
mysql:
  servers:
  - server: external
```


## Custom LiveLog files

You can add custom live log files for each component. For example:

```yaml
rails:
  configuration:
    custom_log_files: ["/tmp/mylog/*/*.log"]

```
...or

```yaml
docker:
  configuration:
    custom_log_files: ["/tmp/dockerlog/*/*.log"]
postgresql:
  configuration:
    custom_log_files: ["/tmp/your-other-log.log"]
```

{% if include.product != 'maestro' %}
For more information about **LiveLogs** and additional examples, please see the [LiveLogs help page](/{{page.collection}}/how-to-guides/deployment/setting-up-custom-livelogs.html).
{% endif %}
{% if include.product == 'maestro' %}
For more information about **LiveLogs** and additional examples, please see the [LiveLogs help page](/{{page.collection}}/how-to-guides/build-and-config/setting-up-custom-livelogs.html).
{% endif %}

## Environment variables

You can add environment variables to your manifest files, either globally or per environment. For example:

```yaml
environment_variables:
  SOME_VARIABLE: value
  ANOTHER_ONE: another_value
  THIRD_ONE: AUTO_GENERATE
  LONG_ONE: AUTO_GENERATE_15

```

If you need to auto generate a value, you can use the `AUTO_GENERATE` keyword. It generates a 10 character long random string unless you specify the length after it: `AUTO_GENERATE_15` which generates a 15 character random string.

Environment variables set in your manifest file will only apply during the initial build of your application. Please refer to our documentation on [environment variables](/{{page.collection}}/tutorials/env-vars.html) if you'd like to set them beyond this point.

Any environment variable that is generated by the result of the code analysis (like database addresses) will override any value specified in the manifest file. In other words, you cannot specify a value like `MYSQL_ADDRESS` in your manifest file as it will be ignored.

## Detailed examples of Manifest files

In this example we're defining a MySQL server with all the bells and whistles:

```yaml
mysql:
  groups:
    default:
      configuration:
        version: 8.0
        root_disk_size: 1000
        root_disk_type: ssd
        engine: percona
        iam_instance_profile_name: mysql-perms
        custom_log_files: [ "/tmp/mysqllog/*/*.log" ]
      servers:
      - server:
          unique_name: mysql-main
          vendor: aws
          key_name: Default
          region: us-east-1
          size: m3.medium
          subnet_id: subnet-40000000
          availability_zone: us-east-1c
```

In this example we're defining a Rails app and an accompanying MySQL instance, and applying these settings only in the **production** environment:

```yaml
production:
  rails:
    configuration:
      ruby_version: 2.7.2
      asset_pipeline_precompile: true
      do_initial_db_schema_load: false
      reserved_server_memory: 0 #default value
      passenger_process_memory: 200 #default value
      memory_allocator: jemalloc # malloc is default
    servers:
    - server:
      unique_name: rails-main
      vendor: aws
      key_name: Default
      region: us-east-1
      size: m3.medium
      subnet_id: subnet-40000000
      availability_zone: us-east-1c
  mysql:
    groups:
      default: 
        configuration:
          version: 8.0
```

Notice that *we haven't specified a server for the MySQL instance* in this YAML. In cases like this the Cloud 66 Dashboard will prompt you to specify a server during the deployment process, and that server will be installed with MySQL V8.0.

{% if include.product == 'rails' %}
## Processes

[Background processes](/rails/how-to-guides/deployment/systemd.html) can be deployed and managed by Cloud 66. Any process in a `Procfile` will be picked up, deployed and monitored by the system.

If you would like more flexibility over the signals used to control the processes, you can use the `procfile_metadata` section. Here is an example:

```yml
procfile_metadata:
  worker:
    stop_sequence: ttin, 120, term, 5, kill
  web:
    restart_signal: usr1
    stop_sequence: usr1, 30, kill
  nsq:
    restart_on_deploy: false
```

In this example, a process called `worker` is stopped using a `TTIN` signal first. After waiting for 120 seconds, if the process is still running, a `TERM` signal will be sent. If it is still running after 5 seconds, it will be killed.

As for `web` or `custom_web` processes, you can specify a `restart_signal` which will be sent to the process serving web. This is useful for web servers that can do "phased" or zero-downtime restarts.

All processes restart during each redeployment of the application. If you want to avoid this, you can set `restart_on_deploy` to `false`.

The default values for **process signals** depend on which web server and/or process manager you are using.

For the default signals for web servers, click the links below:

- [Puma](/rails/how-to-guides/rack-servers/puma-rack-server.html#customizing-shutdown-and-reload-signals)
- [Unicorn](/rails/how-to-guides/rack-servers/unicorn-rack-server.html#customizing-shutdown-and-reload-signals)
- [Thin](/rails/how-to-guides/rack-servers/thin-rack-server.html#customizing-shutdown-and-reload-signals)

For non-web processes:

- [systemd](/rails/how-to-guides/deployment/systemd.html) (our default process manager)
- [Bluepill](/rails/how-to-guides/deployment/bluepill-legacy.html) (legacy pre-June 2020)
{% endif %}