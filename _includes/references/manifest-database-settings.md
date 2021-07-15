## Overview

This reference doc details all the Manifest settings for **data**, **caching** and **storage** components. If you're unfamiliar with Manifest files and how they work, please follow our [getting started guide](/{{page.collection}}/quickstarts/getting-started-with-manifest.html) and {% if include.product != 'maestro' %}[detailed how-to guide](/{{page.collection}}/how-to-guides/deployment/building-a-manifest-file.html).{% endif %}{% if include.product == 'maestro' %}[detailed how-to guide](/{{page.collection}}/how-to-guides/build-and-config/building-a-manifest-file.html).{% endif %}

If you're looking for the Manifest settings for [webservers & frameworks](/{{page.collection}}/references/manifest-web-settings.html) or [load balancers](/{{page.collection}}/references/manifest-loadbalancer-settings.html), please see our respective reference documents for those components.

## Specifying external databases via your manifest

If your app uses databases that aren't managed by Cloud 66 you can still specify them via your Manifest. To set a database as external via your manifest, use the following syntax:

```yaml
# For example, an external MySQL server
mysql: 
  server: external
```

### Key to table headings

* **Option** - the name of the setting as used in the YAML of your Manifest file
* **Applied on** - the type of deployment required to update this setting. In many cases settings only apply when an application is first built, or when new servers are created or it is cloned. Hover over the names of each condition to see more info.
* **Clouds** - the cloud providers on which a setting can be used.

## ElasticSearch

[Elasticsearch](https://www.elastic.co/elastic-stack) is a search engine based on the Lucene library. It provides a distributed, multitenant-capable full-text search engine with an HTTP web interface and schema-free JSON documents.

The following settings are available via the Manifest file:

<table class='table table-bordered table-striped'>
<thead>
  <tr>
    <th width="32%">Option</th>
    <th width="16%">Applied on</th>
    <th>Description</th>
    <th width="10%">Clouds</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><code>iam_instance_profile_name</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>The name of the <a href="/{{page.collection}}/how-to-guides/clouds/cloud-aws.html#using-iam-instance-profiles-with-your-servers">IAM instance profile</a> that should be used when provisioning this server.</td>
    <td>AWS</td>
  </tr>
  <tr>
    <td><code>groups</code></td>
    <td><div class="tooltip">Deploy-with-upgrades &#9432;<span class="tooltiptext">Changes to this setting will only be applied if you choose the "Deploy with upgrades" option</span></div></td>
    <td>Used to define multiple separate <a href="/{{page.collection}}/how-to-guides/databases/attaching-multiple-databases.html">database groups</a> (of the same type), each with their own configuration. The name of each group in your Manifest must match the names in your Dashboard.</td>
  <td>All</td>
  </tr>
  <tr>
    <td><code>operating_system</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>The version of Ubuntu to install on the server that hosts ElasticSearch. Accepted values <code>ubuntu1604</code>, <code>ubuntu1804</code></td>
  <td>All</td>
  </tr>
  <tr>
    <td><code>root_disk_size</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>Default size of root disk (in GB) for servers used by ElasticSearch. Default value is <code>50</code>.</td>
  <td>AWS, Azure, GCE</td>
  </tr>
  <tr>
    <td><code>root_disk_type</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>Disk type for servers used by ElasticSearch, accepted values being <code>ssd</code> and <code>magnetic</code>. Default value is <code>ssd</code>.</td>
    <td>AWS, GCE</td>
  </tr>
  <tr>
    <td><code>version</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>The version of ElasticSearch you want to install. <br/>NOTE: You can use <a href="/{{page.collection}}/how-to-guides/databases/attaching-multiple-databases.html">database groups</a> to run different versions of the same database in parallel with each other.</td>
    <td>All</td>
  </tr>
</tbody>
</table>

### Example YAML for ElasticSearch

```yml
elasticsearch:
  configuration:
    iam_instance_profile_name: elastic-perms
    version: 0.90.7
    root_disk_size: 1000
    root_disk_type: ssd

```
If you need help specifying multiple databases of the same type via your Manifest, please read our guide on [Database Groups](/{{page.collection}}/how-to-guides/databases/attaching-multiple-databases.html#specifying-database-groups-via-manifest).

## GlusterFS

[GlusterFS](https://www.gluster.org/) is a scalable network filesystem suitable for data-intensive tasks such as cloud storage and media streaming.

<div class="notice notice-warning"><p>
The version of GlusterFS currently offered via the Cloud 66 Add-in is not supported by Ubuntu 18.04. To use this add-in please ensure that all of your application components are installed on servers running <strong>Ubuntu 16.04</strong>.
</p></div>

#### Restrictions with GlusterFS

- Renaming a volume will actually **delete that volume** and create a new one.
- After you change the volume list, you need to redeploy your application for new configuration be applied to your application.
- You cannot change <code>replica_count</code> after GlusterFS added to your application.
- You cannot use <code>glusterfs group</code> or any of its servers in <code>mount_targets</code>.

The following settings are available via the Manifest file:

<table class='table table-bordered table-striped'>
<thead>
  <tr>
    <th width="32%">Option</th>
    <th width="16%">Applied on</th>
    <th>Description</th>
    <th width="10%">Clouds</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><code>iam_instance_profile_name</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>The name of the <a href="/{{page.collection}}/how-to-guides/clouds/cloud-aws.html#using-iam-instance-profiles-with-your-servers">IAM instance profile</a> that should be used when provisioning this server.</td>
    <td>AWS</td>
  </tr>
  <tr>
    <td><code>mount_targets</code></td>
    <td><div class="tooltip">Redeploy &#9432;<span class="tooltiptext">Changes to this setting will be applied when you next deploy your application</span></div></td>
    <td>List of servers and server groups on which GlusterFS should be mounted. You can specify the name of the server or server group (e.g. <code>rails</code> or <code>mysql</code>). You can also use app and db keywords: <code>app</code> is your main app server group (e.g. rails) and <code>db</code> is your database server groups (e.g. <code>mysql</code> or <code>redis</code>). The default value is <code>app</code>.</td>
    <td>All</td>
  </tr>
  <tr>
    <td><code>replica_count</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>The number of nodes in the GlusterFS cluster to which data will be replicated (e.g. <code>2</code> means your data exist on two nodes). Default value is <code>1</code>.</td>
    <td>All</td>
  </tr>
  <tr>
    <td><code>root_disk_size</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>    
    <td>Default size of root disk (in GB) for servers used by GlusterFS. Default value is <code>50</code>.</td>
    <td>AWS, Azure, GCE</td>
  </tr>
    <tr>
    <td><code>root_disk_type</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>Disk type for servers used by GlusterFS, accepted values being <code>ssd</code> and <code>magnetic</code>. Default value is <code>ssd</code>.</td>
    <td>AWS, GCE</td>
  </tr>
  <tr>
    <td><code>version</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>The version of GlusterFS you wish to install.<br/>NOTE: You can use <a href="/{{page.collection}}/how-to-guides/databases/attaching-multiple-databases.html">database groups</a> to run different versions of the same database in parallel with each other.</td>
    <td>All</td>
  </tr>
  <tr>
    <td><code>volumes</code> </td>
        <td><div class="tooltip">Deploy-with-upgrades &#9432;<span class="tooltiptext">Changes to this setting will only be applied if you choose the "Deploy with upgrades" option</span></div></td>
    <td>List of volumes you want in your GlusterFS cluster. By default we create a volume called <code>cloud66-vol</code> and mount it to <code>/mnt/data-store</code>.</td>
    <td>All</td>
  </tr>
    <tr>
    <td><code>volumes / mount</code> </td>
    <td><div class="tooltip">Redeploy &#9432;<span class="tooltiptext">Changes to this setting will be applied when you next deploy your application</span></div></td>
    <td>Specify the mount point of the volume on clients.</td>
    <td>All</td>
  </tr>  
  <tr>
    <td><code>volumes / name</code> </td>
    <td><div class="tooltip">Redeploy &#9432;<span class="tooltiptext">Changes to this setting will be applied when you next deploy your application</span></div></td>
    <td>Specify the name of volume.</td>
    <td>All</td>
  </tr>
</tbody>
</table>


### Example YAML for GlusterFS

```yml
glusterfs:
  configuration:
    version: 3.7
    replica_count: 2
    mount_targets: ['app','redis']
    volumes:
      -  volume:
         name: images-data
         mount: "/mnt/images"
         access_control:
           read: ['web', 'api']
           write: ['web']
      -  volume:
         name: videos
         mount: /mnt-data/videos
         access_control:
           read: ['web']
           write: ['web']
```

## Memcached

[Memcached](https://memcached.org/) is a general-purpose distributed memory-caching system. It is often used to speed up dynamic database-driven websites by caching data and objects in RAM to reduce the number of times an external data source must be read.

The following settings are available via the Manifest file :

<table class='table table-bordered table-striped'>
<thead>
  <tr>
    <th width="32%">Option</th>
    <th width="16%">Applied on</th>
    <th>Description</th>
    <th width="10%">Clouds</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><code>listen_ip</code> </td>
    <td><div class="tooltip">Redeploy &#9432;<span class="tooltiptext">Changes to this setting will be applied when you next deploy your application</span></div></td>
    <td>Specify which IP address to listen on (default value is <code>0.0.0.0</code>)</td>
    <td>All</td>
  </tr>
  <tr>
    <td><code>memory</code> </td>
    <td><div class="tooltip">Redeploy &#9432;<span class="tooltiptext">Changes to this setting will be applied when you next deploy your application</span></div></td>
    <td>Specify maximum memory (in MB) that can be used (default is <code>64</code>)</td>
    <td>All</td>
  </tr>
  <tr>
    <td><code>port</code> </td>
    <td><div class="tooltip">Redeploy &#9432;<span class="tooltiptext">Changes to this setting will be applied when you next deploy your application</span></div></td>
    <td>Specify connection port (default is <code>11211</code>)</td>
    <td>All</td>
  </tr>
</tbody>
</table>  

### Example YAML for Memcached

```yml
memcached:
  configuration:
    memory: 1024
    port: 11211
    listen_ip: 127.0.0.1
```


## MongoDB

[MongoDB](https://www.mongodb.com/) is a cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas.

The following settings are available via the Manifest file :

<table class='table table-bordered table-striped'>
<thead>
  <tr>
    <th width="32%">Option</th>
    <th width="16%">Applied on</th>
    <th>Description</th>
    <th width="10%">Clouds</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><code>iam_instance_profile_name</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>The name of the <a href="/{{page.collection}}/how-to-guides/clouds/cloud-aws.html#using-iam-instance-profiles-with-your-servers">IAM instance profile</a> that should be used when provisioning this server.</td>
    <td>AWS</td>
  </tr>
  <tr>
    <td><code>groups</code></td>
    <td><div class="tooltip">Deploy-with-upgrades &#9432;<span class="tooltiptext">Changes to this setting will only be applied if you choose the "Deploy with upgrades" option</span></div></td>
    <td>Used to define multiple separate <a href="/{{page.collection}}/how-to-guides/databases/attaching-multiple-databases.html">database groups</a> (of the same type), each with their own configuration. The name of each group in your Manifest must match the names in your Dashboard.</td>
    <td>All</td>
  </tr>
  <tr>
    <td><code>operating_system</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>The version of Ubuntu to install on the server that hosts MongoDB. Accepted values <code>ubuntu1604</code>, <code>ubuntu1804</code></td>
    <td>All</td>
  </tr>
  <tr>
    <td><code>root_disk_size</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>Default size of root disk (in GB) for servers used by MongoDB. Default value is <code>50</code>.</td>
    <td>AWS, Azure, GCE</td>
  </tr>
  <tr>
    <td><code>root_disk_type</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>Disk type for servers used by MongoDB, accepted values being <code>ssd</code> and <code>magnetic</code>. Default value is <code>ssd</code>.</td>
    <td>AWS, GCE</td>
  </tr>
{% if include.product == 'rails' %}<tr>
    <td><code>tamper_with_yml</code></td>
    <td><div class="tooltip">Redeploy &#9432;<span class="tooltiptext">Changes to this setting will be applied when you next deploy your application</span></div></td>
    <td>Determines whether Cloud 66 can automatically update your database configuration (username, password and server address). Default is <code>yes</code>.</td>
    <td>All</td>
  </tr>{% endif %}
  <tr>
    <td><code>version</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>Specify the version of MongoDB you want to install. <br/>NOTE: You can use <a href="/{{page.collection}}/how-to-guides/databases/attaching-multiple-databases.html">database groups</a> to run different versions of the same database in parallel with each other.</td>
    <td>All</td>
  </tr>
</tbody>
</table>

### Example YAML for MongoDB

```yml
mongodb:
  configuration:
    version: 2.4.8
    root_disk_size: 100
    root_disk_type: ssd
```
If you need help specifying multiple databases of the same type via your Manifest, please read our guide on [Database Groups](/{{page.collection}}/how-to-guides/databases/attaching-multiple-databases.html#specifying-database-groups-via-manifest).

## MySQL

[MySQL](https://www.mysql.com/) is an open-source relational database management system.

The following settings are available via the Manifest file :

<table class='table table-bordered table-striped'>
<thead>
  <tr>
    <th width="32%">Option</th>
    <th width="16%">Applied on</th>
    <th>Description</th>
    <th width="10%">Clouds</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><code>engine</code> </td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>Specify the MySQL engine you want to install. Valid values are <code>mysql</code> and <code>percona</code></td>
    <td>All</td>
  </tr>
  <tr>
    <td><code>iam_instance_profile_name</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>The name of the <a href="/{{page.collection}}/how-to-guides/clouds/cloud-aws.html#using-iam-instance-profiles-with-your-servers">IAM instance profile</a> that should be used when provisioning this server.</td>
    <td>AWS</td>
  </tr>
  <tr>
    <td><code>groups</code></td>
    <td><div class="tooltip">Deploy-with-upgrades &#9432;<span class="tooltiptext">Changes to this setting will only be applied if you choose the "Deploy with upgrades" option</span></div></td>
    <td>Used to define multiple separate <a href="/{{page.collection}}/how-to-guides/databases/attaching-multiple-databases.html">database groups</a> (of the same type), each with their own configuration. The name of each group in your Manifest must match the names in your Dashboard.</td>
    <td>All</td>
  </tr>
  <tr>
    <td><code>operating_system</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>The version of Ubuntu to install on the server that hosts MySQL. Accepted values <code>ubuntu1604</code>, <code>ubuntu1804</code></td>
    <td>All</td>
  </tr>
  <tr>
    <td><code>root_disk_size</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>Default size of root disk (in GB) for servers used by MySQL. Default value is <code>50</code>.</td>
    <td>AWS, Azure, GCE</td>
  </tr>
  <tr>
    <td><code>root_disk_type</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>Disk type for servers used by MySQL, accepted values being <code>ssd</code> and <code>magnetic</code>. Default value is <code>ssd</code>.</td>
    <td>AWS, GCE</td>
  </tr>
{% if include.product == 'rails' %}<tr>
<td><code>tamper_with_yml</code></td>
    <td><div class="tooltip">Redeploy &#9432;<span class="tooltiptext">Changes to this setting will be applied when you next deploy your application</span></div></td>
    <td>Determines whether Cloud 66 can automatically update your database configuration (username, password and server address). Default is <code>yes</code>. </td>
    <td>All</td>
  </tr>{% endif %}
  <tr>
    <td><code>version</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>Specify the version of MySQL you want to install. Valid values are <code>5.7</code> or <code>8.0</code> <br/>NOTE: You can use <a href="/{{page.collection}}/how-to-guides/databases/attaching-multiple-databases.html">database groups</a> to run different versions of the same database in parallel with each other.</td>
    <td>All</td>
  </tr>
</tbody>
</table>


### Example YAML for MySQL

```yml
mysql:
  configuration:
    version: 5.7
    root_disk_size: 100
    root_disk_type: ssd
    engine: percona
    iam_instance_profile_name: mysql-perms
```
If you need help specifying multiple databases of the same type via your Manifest, please read our guide on [Database Groups](/{{page.collection}}/how-to-guides/databases/attaching-multiple-databases.html#specifying-database-groups-via-manifest).

## PostgreSQL

[PostgreSQL](https://www.postgresql.org/) is a powerful, open source object-relational database system with over 30 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance.

The following settings are available via the Manifest file :

<table class='table table-bordered table-striped'>
<thead>
  <tr>
    <th width="32%">Option</th>
    <th width="16%">Applied on</th>
    <th>Description</th>
    <th width="10%">Clouds</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><code>groups</code></td>
    <td><div class="tooltip">Deploy-with-upgrades &#9432;<span class="tooltiptext">Changes to this setting will only be applied if you choose the "Deploy with upgrades" option</span></div></td>
    <td>Used to define multiple separate <a href="/{{page.collection}}/how-to-guides/databases/attaching-multiple-databases.html">database groups</a> (of the same type), each with their own configuration. The name of each group in your Manifest must match the names in your Dashboard.</td>
    <td>All</td>
  </tr>
  <tr>
    <td><code>iam_instance_profile_name</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>The name of the <a href="/{{page.collection}}/how-to-guides/clouds/cloud-aws.html#using-iam-instance-profiles-with-your-servers">IAM instance profile</a> that should be used when provisioning this server.</td>
    <td>AWS</td>
  </tr>
  <tr>
    <td><code>operating_system</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>The version of Ubuntu to install on the server that hosts PostgreSQL. Accepted values <code>ubuntu1604</code>, <code>ubuntu1804</code></td>
    <td>All</td>
  </tr>
  <tr>
    <td><code>postgis</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>Specify whether to include <a href="https://postgis.net/">PostGIS</a></td>
    <td>All</td>
  </tr>
    <tr>
    <td><code>postgis / version</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>Specify the version of PostGIS you want to install. Must be nested in <code>postgres</code> settings</td>
    <td>All</td>
  </tr>
  <tr>
    <td><code>root_disk_size</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>Default size of root disk (in GB) for servers used by PostgreSQL. Default value is <code>50</code>.</td>
    <td>AWS, Azure, GCE</td>
  </tr>
  <tr>
    <td><code>root_disk_type</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>Disk type for servers used by PostgreSQL, accepted values being <code>ssd</code> and <code>magnetic</code>. Default value is <code>ssd</code>.</td>
    <td>AWS, GCE</td>
  </tr>
{% if include.product == 'rails' %}<tr>
<td><code>tamper_with_yml</code></td>
    <td><div class="tooltip">Redeploy &#9432;<span class="tooltiptext">Changes to this setting will be applied when you next deploy your application</span></div></td>
    <td>Determines whether Cloud 66 can automatically update your database configuration (username, password and server address). Default is <code>yes</code>.</td>
    <td>All</td>
  </tr>{% endif %}
  <tr>
    <td><code>version</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>Specify the version of PostgreSQL you want to install. <br/>NOTE: You can use <a href="/{{page.collection}}/how-to-guides/databases/attaching-multiple-databases.html">database groups</a> to run different versions of the same database in parallel with each other.</td>
    <td>All</td>
  </tr>
</tbody>
</table>

### Example YAML for PostgreSQL

```yml
postgresql:
  configuration:
    iam_instance_profile_name: psql-perms
    version: 9.3.4
    postgis: true
    root_disk_size: 100
    root_disk_type: ssd
```
If you need help specifying multiple databases of the same type via your Manifest, please read our guide on [Database Groups](/{{page.collection}}/how-to-guides/databases/attaching-multiple-databases.html#specifying-database-groups-via-manifest).

### Example YAML for PostGIS
 
```yml
postgresql:
  configuration:
    postgis:
      version: 2.1.1
```

## Redis

[Redis](https://redis.io/) is an in-memory data structure store, used as a distributed, in-memory key–value database, cache and message broker, with optional durability.

The following settings are available via the Manifest file :

<table class='table table-bordered table-striped'>
<thead>
  <tr>
    <th width="32%">Option</th>
    <th width="16%">Applied on</th>
    <th>Description</th>
    <th width="10%">Clouds</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><code>iam_instance_profile_name</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>The name of the <a href="/{{page.collection}}/how-to-guides/clouds/cloud-aws.html#using-iam-instance-profiles-with-your-servers">IAM instance profile</a> that should be used when provisioning this server.</td>
    <td>AWS</td>
  </tr>
  <tr>
    <td><code>groups</code></td>
    <td><div class="tooltip">Deploy-with-upgrades &#9432;<span class="tooltiptext">Changes to this setting will only be applied if you choose the "Deploy with upgrades" option</span></div></td>
    <td>Used to define multiple separate <a href="/{{page.collection}}/how-to-guides/databases/attaching-multiple-databases.html">database groups</a> (of the same type), each with their own configuration. The name of each group in your Manifest must match the names in your Dashboard.</td>
    <td>All</td>
  </tr>
  <tr>
    <td><code>operating_system</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>The version of Ubuntu to install on the server that hosts Redis. Accepted values <code>ubuntu1604</code>, <code>ubuntu1804</code></td>
    <td>All</td>
  </tr>
  <tr>
    <td><code>root_disk_size</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>Default size of root disk (in GB) for servers used by Redis. Default value is <code>50</code>.</td>
    <td>AWS, Azure, GCE</td>
  </tr>
  <tr>
    <td><code>root_disk_type</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>Disk type for servers used by Redis, accepted values being <code>ssd</code> and <code>magnetic</code>. Default value is <code>ssd</code>.</td>
    <td>AWS, GCE</td>
  </tr>
    <tr>
    <td><code>version</code></td>
    <td><div class="tooltip">Build-only &#9432;<span class="tooltiptext">This setting only applies when the app is first built (or cloned) or when new servers are added.</span></div></td>
    <td>Specify the version of Redis you want to install. <br/>NOTE: You can use <a href="/{{page.collection}}/how-to-guides/databases/attaching-multiple-databases.html">database groups</a> to run different versions of the same database in parallel with each other.</td>
    <td>All</td>
  </tr>
</tbody>
</table>


### Example YAML for Redis

```yml
redis:
  configuration:
    version: 5.0.5
    root_disk_size: 100
    root_disk_type: ssd
    iam_instance_profile_name: redis-perms
```
If you need help specifying multiple databases of the same type via your Manifest, please read our guide on [Database Groups](/{{page.collection}}/how-to-guides/databases/attaching-multiple-databases.html#specifying-database-groups-via-manifest).

## More on Manifest files

- [Getting started guide](/{{page.collection}}/quickstarts/getting-started-with-manifest.html){% if include.product != 'maestro' %}
- [Detailed how-to guide](/{{page.collection}}/how-to-guides/deployment/building-a-manifest-file.html){% endif %}{% if include.product == 'maestro' %}
- [Detailed how-to guide](/maestro/how-to-guides/build-and-config/building-a-manifest-file.html){% endif %}
- [Understanding manifest files](/{{page.collection}}/references/manifest-structure.html) 


