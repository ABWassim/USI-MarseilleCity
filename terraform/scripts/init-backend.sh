#!/bin/bash

export AWS_PROFILE=default
export TF_VAR_profile=${AWS_PROFILE}

account_id=$(aws sts get-caller-identity | jq -r '.Account')

printf "Preparing terraform's backend and environment..."
terraform init \
    -backend-config="bucket=appwatchitbucket" \
    -backend-config="key=polytech.tfstate" \
    -backend-config="region=us-east-1" \
    -backend-config="dynamodb_table=terraform_statelock"

printf "\n\n"
export PS1='manager@${AWS_PROFILE}:\w\$ '
/bin/bash