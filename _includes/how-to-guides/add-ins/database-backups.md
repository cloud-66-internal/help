## What is the database backup add-in?

Use this add-in to automatically back up your database on a schedule of your choosing. To enable database backups:

1. Open the **Application Overview** from the [Dashboard](https://app.cloud66.com/dashboard).
2. Click *Explore Add-ins* or the green **+** in the **Add-ins** panel
3. Click on *Install Now* under **Database Backup**
4. Configure your backups as needed and click *Create Backup*

## Backup types
Cloud 66 supports two types of backups: _managed_ and _unmanaged_.

### Managed backups
Using managed backups has several benefits:

- You can download database backups through the web UI and API
{% if page.collection == 'rails' %}- [Backup verifiers](/rails/how-to-guides/databases/backup-verifiers.html) ensure that your backups actually contain what you expect{%endif%}
- Use [database replication](/rails/how-to-guides/databases/database-replication.html) to scale your databases
- You can easily restore database backups
- Stored in Cloud 66 storage

The 100 most recent managed backups are kept by default. See below for our pricing.

### Unmanaged backups

Unmanaged backups are stored on your local server and are available under `/var/cloud66/backups`. The 10 most recent unmanaged backups are kept by default. We don't charge for unmanaged backups.

#### Note
<div class="notice notice-danger">
	<p>In order for backups to work, you are required to have twice as much space on your server as your backup consumes.</p>
</div>

## Pricing of managed backups

We charge per GB (or part thereof) of data stored for managed backups. See our [pricing page](/{{page.collection}}/resources/pricing.html) for the most up to date price.

## Backup format
The backup format for redis and mongodb is always **binary**.  For _MySQL_ and _Postgresql_ you can choose between **binary** and **text**. 

### Binary
A binary backup is a snapshot of the data folder of your database service along with necessary log files. The result is a data folder which can be restored on your server to return it to the same state as it was at the time of backup. 

As this backup contains raw data of your database server (rather than a human readable SQL dump file) you can expect much faster backup/restore process, particularly for large databases. This method can be up to 4 times faster which can be very helpful in failover scenarios. But there are some limitations:

- You cannot restore it on a server with different version of the database engine
- You cannot use it on slave servers
- You cannot use it on servers with data folders symlinked to other locations
- You cannot use it on encrypted databases 
- You need to shut down the database service during the restore 

### Text

For this format we generate a dump file with SQL commands that, when fed back to the server, will recreate the database in the same state as it was at the time of the dump.

As the output of the backup is a simple SQL dump file, you can use it to import your data to other servers or when you want to upgrade your server version but restore process will be much longer than *binary*, particularly if you have lots of indexes in your database.

These are other benefits of this type of backup: 

- You can restore this backup while the server is running.
- You can move backup jobs to your slave servers (if available) to reduce your master server load

## Backup schedule

You can specify how often you would like to backup your database. Your options are:
 
- Hourly 
- Daily 
- Weekly 
- Monthly 

## Compression
You can specify whether or not you would like to Gzip compress your backups. Compressing your backups will take up less space, but will require additional processing during the compression.  

## Exclude tables
This option only applies to **text** MySQL and PostgreSQL backups.  You can provide a comma separated list of tables which you want to exclude from your backup to create a smaller one.   

## Install on replica
This option only applies to **text** MySQL and PostgreSQL and to redis (binary) backups. With this option you can move the backup service to your database replica if available, to relieve pressure on your production database. 

#### Warning
<div class="notice notice-warning">
	<p>Adding or removing a Postgresql binary backup requires a service restart.</p>
</div>

## Restoring database backups

We recommend using the automated restore process to restore backups. To do this:

- Open your Cloud 66 Dashboard and click on the app in question
- Click on the link to your backups in the Add-ins panel
- Click on the "database symbol" icon next to the backup you want to restore
- Confirm the action

If you need to manually download and/or restore a backup, please read our in-depth guide on [manually managing database backups](/{{page.collection}}/how-to-guides/databases/shells/manage-backups.html).

## Managed backup storage locations

We store your managed backups in the closest possible AWS region to your servers. At the moment we store data in the following regions:

* af-south-1 
* ap-east-1
* ap-northeast-1
* ap-northeast-2
* ap-south-1
* ap-southeast-1
* ap-southeast-2
* ca-central-1 
* eu-central-1 
* eu-north-1
* eu-west-1
* eu-west-2
* eu-west-3
* me-south-1
* sa-east-1
* us-east-1 
* us-east-2
* us-west-1
* us-west-2