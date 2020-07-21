## About backup management

The following commands help you manage your backups, such as listing, downloading and initiating backups on your applications (stacks).

#### Note
<div class="notice">
<p>This only applies to managed backups and not the unmanaged ones.</p>
</div>


## List your backups

This will list all the 
managed backups of an application grouped by their database type and/or backup schedule.


### Usage

```shell
$ cx backups list [-s <stack>] [-l] [<db type>]
```




### Parameters


|		Parameter 	 |   Description    |
|-:|
| application 			 	|Name of your application|
| db type (optional)|The type of DB you'd like to list backups for (e.g. mysql)|
| l (optional) 	  	|Returns the latest successful backup|
| e (optional) 		|Your application environment|
{:.table}


### Example

```shell
$ cx backups list -s "My Awesome App" -e production
```



## Download your backups

Allows you to download a 
managed
database backup through the command line, concatenating separate files into one automatically if it consists of numerous files.


### Usage

```shell
$ cx backups download [-s <stack>] [-d <download directory>] <backup id>
```




### Parameters


|		Parameter 		   |	Default		|   Description    |
|--|:--:| -:|
|stack 					   |	—			|Name of your application|
|dbtypes (optional) 	   | 	all			|Comma separated list of Database types which need backup tasks|
|frequency (optional) 	   |	0 */1 * * *	|Frequency of backup task in cron schedule format|
|keep (optional) 		   |	100			|Number of previous backups to keep|
|gzip (optional)		   |	true		|Compress your backups with gzip|
|exclude-tables (optional) |	—			|Tables that must be excluded from the backup|
|run-on-replica (optional) |	true		|Run backup task on replica server if available|
{:.table}


### Example

```shell
$ cx backups new -s mystack --dbtypes=postgresql --frequency="0 */1 * * *" --keep 50 --gzip=true exclude-tables=my_log_table --run-on-replica=false
```

