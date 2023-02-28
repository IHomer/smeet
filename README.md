# Serverless Meetup (Smeet)

A technical demo built to demonstrate event driven serverless applications in AWS.\
You can visit the demo here: https://smeet.ihomer.academy

## Prerequisites

- Terraform (https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli)
- Node.js LTS (https://nodejs.org/en/download/)

## Getting Started

This project contains both the infrastructure and source code. It's fairly simple to get started

1. Go to the global [infra](./infra/global) folder.
2. Initialize and apply the infra

```
terraform init
terraform apply
```

3. Go to the env [infra](./infra/env) folder.
4. Create a workspace for yourself

```
terraform workspace new dev-<name>
```

5. Initialize and apply the infra

```
terraform init
terraform apply
```

6. Go back to the root of the project and install all dependencies

```
npm install
```

7. Deploy the serverless application

```
npx nx run smeet-api:deploy --stage dev-<name>
```

8. Run the Vue application

```
npx nx run smeet:serve
```

## Development

This project uses [NX](https://nx.dev) for library and application management.\
Furthermore the [Serverless Framework](https://www.serverless.com/) is being used to manage the serverless application.

Deploy the serverless application

```
npx nx run smeet-api:deploy --stage <stage-name>
```

Run the Vue application locally

```
npx nx run smeet:serve
```
