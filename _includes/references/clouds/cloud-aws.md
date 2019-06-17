You can use Cloud 66 to provision and deploy your code to servers in any Amazon Web Services (AWS) region. Cloud 66 supports both VPC and (for AWS accounts created before 2014) EC2-Classic. We also support reserved instances. To use a VPC, your account must conform with the [default VPC guidelines](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/default-vpc.html#launching-into).

## Generate AWS access keys

You need to provide your AWS access keys in order for Cloud 66 to access your account. To generate these: 

1. Log into the web interface for your AWS account 
2. Click on the name of your account in the top right corner of your AWS account, and select *My Security Credentials*.

On the next screen, some users will be asked to choose between *Security Credentials* and *IAM users*. We support both methods but we recommend that experienced users select IAM for better security.

IAM stands for *Identity and Access Management.* It allows you to set permissions for specific users. We will guide you through generating access keys based on both of these methods:

### Option A: Security credentials

After selecting the **Security Credentials** option, select the *Access Keys* option from the menu. Now click *Create new access key*, and either download the key file or click *Show access key* and take note of your access key ID and secret access key. These are the credentials needed for Cloud 66 to access your account.

### Option B:  Identity Access Management (IAM)

After selecting the **IAM option** follow [this guide in AWS docs](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/get-set-up-for-amazon-ec2.html#create-an-iam-user) to set up a new IAM user for Cloud 66. We recommend naming the user `cloud66` for clarity. Be sure to copy or save the **Access Key ID** and **Secret Access Key** for this user - you will need these credentials to connect your Cloud 66 account. 

In order to function correctly the `cloud66` user needs either **AmazonVPCFullAccess** permissions (for VPC users) or **AmazonEC2FullAccess** (for legacy EC2-Classic users).

If you need to add a SSL certificates to your applications, you need to add **IAMFullAccess.**

If you need more fine-grained control over permissions you can click *Create Policy* and use our JSON template below to set one up.

## Add AWS keys to an application

For **new Cloud 66 users** - visit the Cloud 66 Dashboard and click the green *New Application* button. After connecting to your Git repository and analyzing your code, you will be asked to Add your cloud platform. From this menu, select *Amazon Web Services* and provide your credentials.

For **existing Cloud 66 users** 

1. Open your [Dashboard](https://app.cloud66.com/dashboard)
2. Click on your account avatar (top-right) and select *Account Settings*
3. Click on *Cloud Keys* in the **Settings** panel
4. Click on the green +
5. Provide your AWS credentials and click *Add Cloud*

You will now be able to deploy to your AWS account.

## IAM policy template

This policy contains the minimum permissions required for Cloud 66 to work via your AWS account. You can adjust the value of `Resource` to limit access to specific VPC instances.

```
{
    "Version": "2019-05-09",
    "Statement": [
        {
            "Sid": "ResourceLevelActions",
            "Action": [
                "ec2:AuthorizeSecurityGroupIngress",
                "ec2:RevokeSecurityGroupIngress",
                "ec2:DeleteSecurityGroup",
                "ec2:DeleteVolume",
                "ec2:RebootInstances",
                "ec2:RunInstances",
                "ec2:StartInstances",
                "ec2:StopInstances",
                "ec2:TerminateInstances"
            ],
            "Resource": [
                "*"
            ],
            "Effect": "Allow"
        },
        {
            "Sid": "NonResourceLevelActions",
            "Action": [
                "ec2:DescribeAccountAttributes",
                "ec2:DescribeAvailabilityZones",
                "ec2:DescribeInstanceAttribute",
                "ec2:DescribeInstanceStatus",
                "ec2:DescribeInstances",
                "ec2:DescribeInternetGateways",
                "ec2:DescribeKeyPairs",
                "ec2:DescribeNetworkInterfaces",
                "ec2:DescribeRegions",
                "ec2:DescribeReservedInstances",
                "ec2:DescribeReservedInstancesListings",
                "ec2:DescribeSecurityGroups",
                "ec2:DescribeSubnets",
                "ec2:DescribeVolumeAttribute",
                "ec2:DescribeVolumeStatus",
                "ec2:DescribeVolumes",
                "ec2:DescribeVpcs",
                "ec2:CreateKeyPair",
                "ec2:CreateSecurityGroup",
                "ec2:CreateSubnet",
                "ec2:CreateVolume",
                "ec2:DeleteKeyPair",
                "ec2:ModifyInstanceAttribute",
                "ec2:CreateTags",
                "elasticloadbalancing:ApplySecurityGroupsToLoadBalancer",
                "elasticloadbalancing:ConfigureHealthCheck",
                "elasticloadbalancing:CreateLBCookieStickinessPolicy",
                "elasticloadbalancing:CreateListener",
                "elasticloadbalancing:CreateLoadBalancer",
                "elasticloadbalancing:CreateLoadBalancerListeners",
                "elasticloadbalancing:CreateLoadBalancerPolicy",
                "elasticloadbalancing:CreateTargetGroup",
                "elasticloadbalancing:DeleteLoadBalancer",
                "elasticloadbalancing:DeleteLoadBalancerListeners",
                "elasticloadbalancing:DeleteLoadBalancerPolicy",
                "elasticloadbalancing:DeregisterInstancesFromLoadBalancer",
                "elasticloadbalancing:DescribeLoadBalancers",
                "elasticloadbalancing:DescribeListeners",
                "elasticloadbalancing:DescribeTags",
                "elasticloadbalancing:DescribeTargetHealth",
                "elasticloadbalancing:EnableAvailabilityZonesForLoadBalancer",
                "elasticloadbalancing:ModifyLoadBalancerAttributes",
                "elasticloadbalancing:ModifyTargetGroupAttributes",
                "elasticloadbalancing:RegisterInstancesWithLoadBalancer",
                "elasticloadbalancing:RegisterTargets",
                "elasticloadbalancing:SetLoadBalancerListenerSSLCertificate",
                "iam:ListServerCertificates",
                "iam:GetServerCertificate",
                "iam:UpdateServerCertificate",
                "iam:UploadServerCertificate",
                "iam:DeleteServerCertificate",
                "iam:CreateServiceLinkedRole"
            ],
            "Resource": "*",
            "Effect": "Allow"
        }
    ]
}

```

#### Note
<div class="notice notice-warning"><p>
If you delete your application from Cloud 66, your servers will not be deleted on your cloud provider unless the <a href="/{{page.collection}}/how-to-guides/deployment/server-deletion.html">physical server deletion</a> setting is turned on.
</p></div>

## Reserved instances

[AWS reserved instances](http://aws.amazon.com/ec2/purchasing-options/reserved-instances/) enable users to reserve instances for one to three years, which has pricing benefits when compared to on-demand instances.

To use Cloud 66 with AWS reserved instances: 

1. Reserve an instance with your size/region requirements. 
2. Use Cloud 66 to deploy to a server of that size in the same region, and we’ll use your reserved instance.

## Using EC2-Classic

If your AWS account was created before 2014 you can choose to create servers on the EC2-Classic platform. Cloud 66 does support EC2-Classic, however we strongly recommend using VPC instead. Several instance types, such as the T2, require the use of VPC.

Please be sure to read the documentation for [EC2-Classic](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-classic-platform.html) before deploying to that platform.

### External links

- [AWS regions](http://aws.amazon.com/about-aws/globalinfrastructure/)
- [AWS pricing](http://aws.amazon.com/ec2/pricing/)

