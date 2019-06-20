---
layout: post
template: one-col
title: Configuring Multi Certificate for HAProxy
categories: how-to-guides/security
lead: ""
legacy: true
sitemap: false
tags: ["ssl","haproxy"]
permalink: /:collection/:path:output_ext
---

## Notice
<div class="notice notice-warning"><p>This documentation set has been merged with the <a href="/maestro/">Maestro Version 2</a> documentation and is officially deprecated. These pages will be redirected to their equivalents in that doc set within the next few weeks.</p></div>


### 1. Concatanate each certification's files to one file

Run the followings on your local computer

```
cat CERT1.CRT_PATH [CERT1_MID.crt_path] PRIVATE1.key_PATH > websitename1.pem

cat CERT2.CRT_PATH [CERT2_MID.crt_PATH] PRIVATE2.key_PATH > websitename2.pem
```




### 2. Upload them to /tmp of your server

```
cx upload -s stack_name --server haproxy_server_name websitename1.pem_PATH websitename1.pem
cx upload -s stack_name --server haproxy_server_name websitename2.pem_PATH websitename2.pem
```




### 3. Login to your HAproxy server

```
cx ssh -s stack_name haproxy_server_name
```




### 4. Copy the files to certification files from /tmp to their directory

```
sudo cp /tmp/websitename1.pem /etc/ssl/private/websitename1.pem
sudo cp /tmp/websitename2.pem /etc/ssl/private/websitename2.pem
```




### 5. Change the settings in your HAproxy config

In th UI Find the following line in your HAproxy config page:

`bind 0.0.0.0:{{port[0]}} ssl crt` 

and chenge it to:

`bind 0.0.0.0:{{port[0]}} ssl crt websitename1.pem crt websitename2.pem`



### Note

Make sure websitename1.pem and websitename2.pem are the same name as the filenames you have under `/etc/ssl/private/` .

You are all set.

