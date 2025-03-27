# DNS Configuration for Crumb Haven Website

This guide explains how to configure DNS records for the crumbhaven.in domain to work with Netlify.

## DNS Configuration Options

You have two main options for configuring your DNS for use with Netlify:

### Option 1: Using Netlify DNS (Recommended)

Netlify can manage your DNS entirely, which simplifies setup and enables features like Netlify's CDN, automatic SSL, and domain redirects.

#### Steps to Transfer DNS to Netlify:

1. In your Netlify site dashboard, go to Domain settings → Add custom domain
2. Enter "crumbhaven.in" and click "Verify"
3. Select "Set up Netlify DNS for your domain"
4. Follow the step-by-step instructions:
   - Netlify will provide a list of nameservers (typically 4)
   - Log in to your domain registrar (where you purchased crumbhaven.in)
   - Find the DNS or nameserver settings
   - Replace the current nameservers with Netlify's nameservers
5. Wait for DNS propagation (can take 24-48 hours)

#### Netlify Nameservers:
```
dns1.p05.nsone.net
dns2.p05.nsone.net
dns3.p05.nsone.net
dns4.p05.nsone.net
```

### Option 2: Using Your Current DNS Provider

If you prefer to keep using your current DNS provider, you'll need to add specific DNS records to point to Netlify.

#### Required DNS Records:

| Record Type | Name/Host | Value/Target | TTL |
|-------------|-----------|--------------|-----|
| A           | @         | 75.2.60.5    | Auto/3600 |
| CNAME       | www       | [your-site-name].netlify.app | Auto/3600 |

#### Steps to Add These Records:

1. Log in to your domain registrar's control panel
2. Find the DNS management section
3. Add the A record pointing the root domain to Netlify's IP
4. Add the CNAME record pointing "www" to your Netlify subdomain
5. Save changes
6. Wait for DNS propagation (can take 24-48 hours)

## Verifying DNS Configuration

To check if your DNS is correctly configured:

1. Use a DNS lookup tool like [MxToolbox](https://mxtoolbox.com/) or [DNSChecker](https://dnschecker.org/)
2. Enter your domain (crumbhaven.in) and check the A and CNAME records
3. Confirm that they match the expected values

## Troubleshooting DNS Issues

### Common DNS Problems and Solutions:

1. **DNS_PROBE_FINISHED_NXDOMAIN Error**
   - This means the domain cannot be found in the DNS system
   - Solution: Verify DNS records are correct and wait for propagation

2. **Site Not Showing as Secure**
   - Netlify might still be provisioning your SSL certificate
   - Solution: Wait up to 24 hours for SSL provisioning

3. **Only Works with/without www**
   - Solution: Ensure both A record (for root) and CNAME (for www) are configured

4. **Domain Shows Netlify Default Page**
   - Solution: Verify your site is correctly deployed on Netlify

## Additional DNS Records You Might Want

### Email Configuration:

If you plan to use email with your domain, add these records:

| Record Type | Name/Host | Value/Target | TTL |
|-------------|-----------|--------------|-----|
| MX          | @         | (Your email provider's MX record) | Auto/3600 |
| TXT         | @         | (SPF record - ask your email provider) | Auto/3600 |
| CNAME       | mail      | (Your email provider's value) | Auto/3600 |

### Google Search Console Verification:

| Record Type | Name/Host | Value/Target | TTL |
|-------------|-----------|--------------|-----|
| TXT         | @         | (Google-provided verification string) | Auto/3600 |

## Additional Resources

- [Netlify DNS Documentation](https://docs.netlify.com/domains-https/netlify-dns/)
- [Netlify Custom Domains Guide](https://docs.netlify.com/domains-https/custom-domains/)
- [SSL/TLS Certificates with Netlify](https://docs.netlify.com/domains-https/https-ssl/)