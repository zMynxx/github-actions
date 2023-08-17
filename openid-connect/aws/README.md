## [Docs](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services)

1. Create a new identity provider, name it however you like, although the convention is "token.actions.githubusercontent.com".
2. Set the following values
   - **Provider URL**: `https://token.actions.githubusercontent.com`
   - **Audience**: `sts.amazonaws.com`
3. Get Thumbprint. (e.g. `b3dd7606d2b5a8b4a13771dbecc9ee1cecafa38a`) - [IdP thumprints update (27/06/2023)](https://github.blog/changelog/2023-06-27-github-actions-update-on-oidc-integration-with-aws/)

## [Trust Policy](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services#configuring-the-role-and-trust-policy)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::<account-id>:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        //## For using astrixs (all branches, all positions) ###
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:<github-org>/*"
        },
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        //## For exact match for specific branch & specific position ###
        "StringEquals": {
          "token.actions.githubusercontent.com:sub": "repo:<github-org>/<repo-name>:ref:refs/heads/<branch-name>",
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        }
      }
    }
  ]
}
```

## [Permissions in actions/workflows](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services#adding-permissions-settings)

```yaml
permissions:
  id-token: write # This is required for requesting the JWT
  contents: read # This is required for actions/checkout
```
