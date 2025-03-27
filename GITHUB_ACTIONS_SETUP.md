# GitHub Actions Setup for Crumb Haven Website

This guide explains how to set up GitHub Actions for automatic deployment of the Crumb Haven website to Netlify.

## Prerequisites

- A GitHub repository with the Crumb Haven website code
- A Netlify account with a site already created
- Admin access to both GitHub and Netlify

## Setting Up Netlify and GitHub Secrets

### 1. Get Netlify Authentication Token

1. Log in to your Netlify account
2. Go to User Settings → Applications → Personal access tokens
3. Click "New access token"
4. Enter a description (e.g., "GitHub Actions Deployment")
5. Click "Generate token"
6. Copy the generated token (you'll only see it once)

### 2. Get Netlify Site ID

1. Go to your Netlify site dashboard
2. Click on "Site settings"
3. Look for "Site information" → "API ID"
4. Copy the API ID (this is your Site ID)

### 3. Add Secrets to GitHub Repository

1. Go to your GitHub repository
2. Click on "Settings" → "Secrets and variables" → "Actions"
3. Click "New repository secret"
4. Add the following secrets:
   - Name: `NETLIFY_AUTH_TOKEN`
   - Value: [Paste the Netlify authentication token]
5. Add another secret:
   - Name: `NETLIFY_SITE_ID`
   - Value: [Paste the Netlify site ID]

## The GitHub Actions Workflow

The workflow file (`.github/workflows/netlify-deploy.yml`) is already set up in your repository. It will:

1. Trigger on pushes to the `main` branch, pull requests to `main`, and manual triggers
2. Set up Node.js v20
3. Install dependencies
4. Build the application
5. Run the copy script to ensure all necessary files are in place
6. Deploy to Netlify using the secrets you configured

## Testing the Workflow

To test that everything is set up correctly:

1. Make a small change to your website
2. Commit and push to the `main` branch
3. Go to the "Actions" tab in your GitHub repository
4. Watch the workflow run

You should see the deployment complete successfully, and your changes should be visible on your Netlify site.

## Troubleshooting

### Workflow Fails at Deployment Step

- Double-check that your `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` are correct
- Ensure that the Netlify token has the necessary permissions
- Check that the `publish-dir` in the workflow matches your actual build output directory

### Build Problems

- Check the build logs in the GitHub Actions run
- Ensure that the `npm run build` command works locally
- Verify that all necessary files are being copied correctly

## Customizing the Workflow

You can customize the GitHub Actions workflow by editing the `.github/workflows/netlify-deploy.yml` file:

- Add additional build or test steps
- Change the trigger conditions
- Add notifications (e.g., Slack, email)
- Configure preview deployments for pull requests

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Netlify API Documentation](https://docs.netlify.com/api/get-started/)
- [Netlify GitHub Action](https://github.com/marketplace/actions/netlify-deploy)