

## Infrastructure security

Our servers are protected with firewalls and intrusion protection systems to protect from malicious traffic. We have lock-out mechanisms in place to prevent automated attacks, as well as monitoring for any malicious activity, and logging.


## Credit Card Information

We do not store any payment information like credit card details on our servers. All credit card information is handled by a third party ([Stripe](http://stripe.com/)).


## Customer protection

All customer sensitive data including API keys, SSH keys and passwords are encrypted with a multi-network setup for the decryption mechanism.

We take a wide range of other measures to improve [application security]({% if page.collection == "maestro" or page.collection == "skycap" %}/maestro/how-to-guides/deployment/service-network-configuration.html{% else %}/{{page.collection}}/tutorials/service-network-configuration.html{% endif %}) and help them improve their security by upgrading their applications. 

Cloud 66 connects to users' servers from a set of authorized IP addresses:

```shell
{% include general/public_ips.html %}
```

All provisioned servers are configured to only allow SSH (and other secure) connections from these addresses. 

We may add new IP addresses to this range from time to time. You can check the very latest list of IP addresses via [this link](https://app.cloud66.com/authorized_ips).

Additionally, customer source code is only kept for a limited period of time.

## Reporting security issues

We take customer security very seriously. Please [contact us](mailto:hello@cloud66.com) if you would like to talk to us about security.

