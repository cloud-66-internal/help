---
layout: post
template: one-col
title: Replacing SQLite with MySQL or PostgreSQL
categories: how-to-guides/databases
lead: ""
tags: ["postgresql","sqlite","mysql"]
legacy: true
sitemap: false
permalink: /:collection/:path:output_ext
---

## Notice
<div class="notice notice-warning"><p>This documentation set has been merged with the <a href="/maestro/">Maestro Version 2</a> documentation and is officially deprecated. These pages will be redirected to their equivalents in that doc set within the next few weeks.</p></div>


## Instructions
Switching to another SQL-based database is easy, and the following instructions show you how to switch to MySQL or PostgreSQL in five simple steps.


## MySQL

1.  Replace `adapter: sqlite` with `adapter: mysql2` in your config/database.yml file.
2.  Replace `gem 'sqlite*'` with `gem 'mysql2'` in your Gemfile.
3.  Run `bundle install`.
4.  Commit and check changes in.
5.  Rebuild your stack.


## PostgreSQL

1.  Replace `adapter: sqlite` with `adapter: postgresql` in your config/database.yml file.
2.  Replace `gem 'sqlite*'` with `gem 'pg'` in your Gemfile.
3.  Run `bundle install`.
4.  Commit and check changes in.
5.  Rebuild your stack.

More information about [databases](/{{page.collection}}/how-to-guides/add-ins/database-backup.html) supported by Cloud 66.

