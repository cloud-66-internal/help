---
layout: post
title: Getting started with Skycap
order: 1
categories: quickstarts
legacy: false
tags: ["getting started"]
lead: Use Skycap to automatically turn your source code into container (Docker) images
permalink: /:collection/:path:output_ext
---

Skycap is a Container Deployment Pipeline. You can use Skycap to automatically turn your source code into container (Docker) images, manage your Kubernetes configuration files and deploy your applications to any Kubernetes cluster.

## What you’ll need

Before you start this guide, please check you have the following:

* **A Cloud 66 Account** &mdash; If you don't already have one [sign up for a Cloud 66 account](https://app.cloud66.com/users/sign_up). You'll get free unlimited access to all products for 4 weeks.

* **A Git repository containing your application code** &mdash; This can be a public or private repo. You can use any Git provider like GitHub / BitBucket or use your own privately hosted repo.

<div class="notice"><p>If you don't have images or code ready, you can use this <a href="https://github.com/cloud66-samples/helloworld.git">simple "hello world" project</a> we've supplied on Github. (You can also use this project with our next tutorial on Formations.)
</p></div>


## What is a Build Pipeline?

Build pipelines are composed of all the individual ([containerized](/skycap/the-basics/concepts-and-terminology.html#containers-and-containerization)) services that make up your application. Services can include raw source code that needs to be built into Docker images or pre-built images. You can mix and match these as required.

* **Build from Source** &mdash; Your code should be hosted in a git repo. It should contain a *Dockerfile* that describes how to build your image. Cloud 66 provides Dockerfile templates for building common web frameworks. You can use these to help get started.
    
* **Pre-built Container Images** &mdash; These can be hosted in any public image repo like Dockerhub or your own private repo. 


## 1. Choose an application type

New users will be shown the product selection wizard. For Skycap, choose "I have a containerized application" and then "I already have a Kubernetes cluster" (*Try Skycap*). 

<div class="Grid Grid--gutters Grid--full large-Grid--fit med-Grid--guttersXl">
    <div class="Grid-cell">
        <h4>Step 1</h4>
        <img src="/assets/product_choice_1.png" alt="Product choice wizard - step 1">
    </div>
    <div class="Grid-cell">
        <h4>Step 2</h4>
        <img src="/assets/product_choice_2.png" alt="Product choice wizard - step 2">
    </div>
</div>

If you're already using Cloud 66 just click *New Application &rarr; Skycap (Deploy to a cluster)* button on the dashboard.

<img src="/assets/skycap/skycap_new_dropdown_update.png" alt="Start a new Skycap build pipeline" width="200">

## 2. Add application services

The first step is to give your application a **name**. This will be used to label your application throughout the Cloud 66 dashboard and will not be visible to public users.

Next, click the green *Analyze My Code* button. If you haven't already linked your Git service provider to Cloud 66 we will walk you through the process. We also have a [dedicated how-to guide](https://help.cloud66.com/maestro/how-to-guides/common-tools/access-your-code.html) if you get stuck.

Once your Git provider is linked, we can analyze your code. To do this: 

1. Copy the *Clone or download* link from Github 
2. Paste it into the **Git Repo URL** field
3. Check that you're using the correct **branch** (we default to master)
4. Click *Go* to fetch and analyze the code

If you're using our demo application, you can copy this link for Step 2: [hello-world](https://github.com/cloud66-samples/helloworld.git)

<img src="/assets/skycap/skycap_add_services_ani_update.gif" alt="Adding services to a Skycap build pipeline">

When your code had been analyzed you will see a list of the services that will become your Skycap application.  

You can add as many other services as required by clicking the green *+ Add another service* button at the bottom of the page. You will need to supply a source for each service you add (more info on this [below](#3-specifying-the-source-of-images)).

You can also configure ports and commands for each service, but we can skip this (optional) step and set our ports up later.

If you're using our demo application, you should rename the service to `hello-world` and then click the green *Next* button to move to the next step (building images).

## 3. Specify the source of images

<img src="/assets/skycap/skycap_service_image.png" alt="Specifying the source of your service" style="float:right; margin-top: 0.25em">

The *Where is your service image?* dropdown provides you with three options to specify the source of your services.

* **Build Image from a GitHub repo** &mdash; This is the easiest way to add services if your code is hosted on GitHub. You'll need to link your GitHub account with Cloud 66 before you can take advantage of this. Just click the *Setup access to your GitHub projects.* link.
    
* **Build image from any Git Repo** &mdash; Use this option if you have a private git repo or you're using another git provider such as BitBucket. You can also use this if you don't want to link Cloud 66 to your GitHub account. You will need to add your Cloud 66 public key if your repo is private. You'll be prompted to do this if it's required.
    
* **It's in a Docker image repository** &mdash; Use this to add pre-built images to a project. You can use a service like DockerHub or your own private image repo. If you're using a private repository you'll be prompted to add the necessary login credentials. 
 
## 4. Snapshot and build images

After you have added your services you will be taken to your **Application Overview** page. To start the build process click the green *Take Snapshot* button at the bottom of the main panel.

A **Snapshot** captures all the components of your application including application images, environment variables and configuration items, in preparation for deployment. 

Because this is the first time you are creating a Snapshot for this application, Skycap will fetch and build your code into images, as well as fetching any pre-built images. 

All of these components are then stored in a private repository on your Cloud 66 account so that you can roll back easily at any time.

During the build process you can view the status of each individual build. You can also drill down into the logs if you need to troubleshoot any part of the process.

<img src="/assets/skycap/skycap_buildgrid_queue.png" alt="Adding services to a Skycap build pipeline">


## 5. Deploy your application

Once you've built your images, you're ready to deploy your application using Skycap's **Formations** feature. To do this, you should follow our guide: [Get started with Skycap Formations](/skycap/quickstarts/using_formations.html)
 
## What's next?

Now that you have your first application defined, you can learn how to make that application live:

* [Create your first Formation](/skycap/quickstarts/using_formations.html) and use it to [deploy your application](/skycap/quickstarts/using_formations.html#deploying-it-all-to-your-cluster) to a Minikube cluster

* If you don't already have a cluster, consider using [Maestro](/maestro/quickstarts/getting_started.html), Cloud 66's full container management service, to deploy and manage your containers and infrastructure.