---
layout: post
template: one-col
title:  "Docker References"
lead: "In Depth Documentation on Cloud 66 Docker"
legacy: true
permalink: /:collection/references/index.html
noindex: true
---

## Notice
<div class="notice notice-warning"><p>This documentation set has been merged with the <a href="/maestro/">Maestro Version 2</a> documentation and is officially deprecated. These pages will be redirected to their equivalents in that doc set within the next few weeks.</p></div>

<div class="Toc Toc--howto">
    <h2>References</h2>
    <ul>
    {% assign section = site.legacy_docker | where:"categories","references" | sort: "order" %}
    {% include list_articles.html section=section %}
    </ul>

    <!-- common -->
    <h2>Cloud 66 Toolbelt</h2>
    <ul>
    {% assign section = site.legacy_docker | where:"categories","references/toolbelt" | sort: "order" %}
    {% include list_articles.html section=section %}
    </ul>

    <h2>Account Management</h2>
    <ul>
    {% assign section = site.legacy_docker | where:"categories","references/accounts" | sort: "order" %}
    {% include list_articles.html section=section %}
    </ul>

    <h2>Integrations</h2>
    <ul>
    {% assign section = site.legacy_docker | where:"categories","references/integrations" | sort: "order" %}
    {% include list_articles.html section=section %}
    </ul>

    <h2>Clouds</h2>
    <ul>
    {% assign section = site.legacy_docker | where:"categories","references/clouds" | sort: "order" %}
    {% include list_articles.html section=section %}
    </ul>
</div><!--/.Toc-->
