<!-- post: -->


### Contents

*		[Web server issues](#webserver)
*		[Passphrase protected keys](#pass)
*		[Certificate and key encoding](#encoding)
*		[Matching certificates and keys](#match)

Installing SSL certificates on your Cloud 66 stack is very easy: copy the key and certificate and paste them into the SSL certificate dialog. Cloud 66 then automatically transfers the certificates to all of your frontend servers and configures the web server to use them.

However, you always need to have the right SSL certificates and keys to use. Specifically, your SSL certificates need to:

*   Be input correctly for Nginx to start
*   Have no passphrase
*   Have the correct encoding
*   Match each other
