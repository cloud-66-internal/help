---
menuheaders: [ "About deploying GlusterFS", "Features", "Database deployment types", "How to connect to your GlusterFS database", "Environment Variables", "Customize your database configuration" ]
layout: post
template: one-col
title: GlusterFS with Cloud 66 Rails
categories: Databases
lead: "Using GlusterFS on Cloud 66 for rails stacks"
legacy: false
recommendedName: [ "Backup" ]
recommendedLinks: [ "backup.html" ]
keywords: []
permalink: /:collection/:path
---

{% assign dbtype = "glusterfs" %}

<a href="#about-deploying-{{ dbtype }}"></a>{% include _inlines/Databases/common/glusterfs/about-deploying-glusterfs-header-v1.md  product = page.collection %}
{% include _inlines/Databases/common/glusterfs/about-deploying-dbs-v1.md  product = page.collection %}
<a href="#features"></a>{% include _inlines/Databases/common/glusterfs/features-v1.md  product = page.collection dbtype = dbtype %}
<a href="#database-deployment-types"></a>{% include _inlines/Databases/common/glusterfs/deployment-types-v1.md  product = page.collection %}
<a href="#how-to-connect-to-your-{{ dbtype }}-database"></a>{% include _inlines/Databases/common/glusterfs/how-to-connect-v1.md dbtype = dbtype product = page.collection %}
<a href="#environment-variables"></a>{% include _inlines/Databases/common/glusterfs/env-vars-v1.md  product = page.collection dbtype = dbtype %} 
<a href="#customize-your-database-configuration"></a>{% include _inlines/Databases/common/glusterfs/customize-v1.md  product = page.collection dbtype = dbtype %}
<a href="#about-scaling-your-glusterfs-cluster"></a>{% include _inlines/Databases/common/glusterfs-scaling/glusterfs-scaling_about-scaling-your-glusterfs-cluster-v1.md  product = page.collection %}
<a href="#configure-a-glusterfs-replica_count"></a>{% include _inlines/Databases/common/glusterfs-scaling/glusterfs-scaling_configure-a-glusterfs-replica_count-v1.md  product = page.collection %}
<a href="#note"></a>{% include _inlines/Databases/common/glusterfs-scaling/glusterfs-scaling_note-v1.md  product = page.collection %}