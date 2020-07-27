You can strengthen Nginx's SSL security by adjusting its SSL cipher settings. You can change this using [CustomConfig](/{{page.collection}}/tutorials/custom-config.html). 

#### Note
<div class="notice notice-warning"><p>The most secure settings for Nginx are not backward compatible with IE6 and Windows XP clients.</p></div>

Using the CustomConfig template for Nginx you can change the default SSL cipher to one of the following:

* Recommended:
```shell
ssl_ciphers 'AES256+EECDH:AES256+EDH';
```

* If backward compatibility (IE6/Win XP) is required:
```shell
ssl_ciphers "ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-SHA384:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA:ECDHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES128-SHA256:DHE-RSA-AES256-SHA:DHE-RSA-AES128-SHA:ECDHE-RSA-DES-CBC3-SHA:EDH-RSA-DES-CBC3-SHA:AES256-GCM-SHA384:AES128-GCM-SHA256:AES256-SHA256:AES128-SHA256:AES256-SHA:AES128-SHA:DES-CBC3-SHA:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!MD5:!PSK:!RC4"
```

This article is based on the information from [this tutorial](https://raymii.org/s/tutorials/Strong_SSL_Security_On_nginx.html).