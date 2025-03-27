# Netlify Deployment Guide for Crumb Haven Website

This guide provides step-by-step instructions for deploying the Crumb Haven website to Netlify and configuring the custom domain (crumbhaven.in).

## Prerequisites

- A Netlify account
- A registered domain (crumbhaven.in) and access to its DNS settings through your domain registrar
- Git repository with the Crumb Haven website code

## Deployment Steps

### 1. Prepare your site for deployment

Before deploying, run the build script to prepare the files:

```bash
./deploy.sh
```

This script will:
- Build the application
- Copy the necessary configuration files to the correct locations
- Ensure all routing and domain configurations are in place

### 2. Deploy to Netlify

#### Option A: Deploy via the Netlify UI

1. Log in to your Netlify account
2. Click "Add new site" → "Import an existing project"
3. Connect to your Git provider (GitHub, GitLab, etc.)
4. Select the Crumb Haven repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist/public`
6. Click "Deploy site"

#### Option B: Deploy via Netlify CLI

1. Install the Netlify CLI: `npm install -g netlify-cli`
2. Log in to Netlify: `netlify login`
3. Initialize and deploy: `netlify deploy --prod`
   - When prompted, select "Create & configure a new site"
   - Specify the build directory as `dist/public`

### 3. Configure Custom Domain

1. In the Netlify dashboard, go to your site → Site settings → Domain management
2. Click "Add custom domain"
3. Enter your domain: `crumbhaven.in`
4. Click "Verify"
5. Choose to add the domain to the site

### 4. Set Up DNS Records

#### At Your Domain Registrar:

**Option A: Use Netlify DNS (recommended)**
1. In your Netlify site's Domain management section, click "Set up Netlify DNS"
2. Follow the instructions to add the Netlify nameservers to your domain registrar
3. Wait for DNS propagation (can take up to 48 hours)

**Option B: Keep your current DNS provider**
1. Add an A record:
   - Host: `@`
   - Value: `75.2.60.5` (Netlify's load balancer IP)
2. Add a CNAME record:
   - Host: `www`
   - Value: `[your-netlify-site-name].netlify.app`

### 5. Enable HTTPS

Netlify automatically provisions SSL certificates via Let's Encrypt once your domain is configured. You don't need to take any additional steps.

### 6. Verify Deployment

Once DNS propagation is complete:
1. Visit your custom domain: `https://crumbhaven.in`
2. Test all pages and functionality
3. Check that the SSL certificate is valid (look for the padlock icon in the browser)

## Troubleshooting

### DNS Issues

If your site shows "DNS_PROBE_FINISHED_NXDOMAIN" error:
- Confirm that your DNS records are correctly set up
- Check that the DNS propagation has completed (can take up to 48 hours)
- Use a tool like [DNSChecker](https://dnschecker.org) to verify your DNS records

### 404 Errors on Page Refresh

If you get 404 errors when refreshing pages:
- Verify that the `_redirects` file is correctly deployed
- Check that the redirects rule (`/* /index.html 200`) is present

### SSL Certificate Issues

If the site is not showing as secure:
- Ensure that all assets are loaded over HTTPS
- Give Netlify time to provision the SSL certificate (up to 24 hours)
- Check if there are mixed content warnings in the browser console

## Maintenance

For future deployments:
1. Make your changes to the codebase
2. Run `./deploy.sh` to build
3. Push to the connected Git repository
4. Netlify will automatically rebuild and deploy your site

## Additional Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Custom Domains on Netlify](https://docs.netlify.com/domains-https/custom-domains/)
- [Netlify HTTPS Configuration](https://docs.netlify.com/domains-https/https-ssl/)