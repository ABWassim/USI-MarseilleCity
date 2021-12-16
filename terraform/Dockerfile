FROM python:3.6-alpine

ENV TERRAFORM_VERSION=0.13.5
ENV TERRAFORM_SHA256SUM=f7b7a7b1bfbf5d78151cfe3d1d463140b5fd6a354e71a7de2b5644e652ca5147

RUN apk add --update nano git curl openssh musl-dev libffi-dev gcc jq bash ca-certificates util-linux && \
    curl https://releases.hashicorp.com/terraform/${TERRAFORM_VERSION}/terraform_${TERRAFORM_VERSION}_linux_amd64.zip > terraform_${TERRAFORM_VERSION}_linux_amd64.zip && \
    echo "${TERRAFORM_SHA256SUM}  terraform_${TERRAFORM_VERSION}_linux_amd64.zip" > terraform_${TERRAFORM_VERSION}_SHA256SUMS && \
    sha256sum -cs terraform_${TERRAFORM_VERSION}_SHA256SUMS && \
    unzip terraform_${TERRAFORM_VERSION}_linux_amd64.zip -d /bin && \
    rm -f terraform_${TERRAFORM_VERSION}_linux_amd64.zip

RUN pip install awscli

COPY tf-bd/ /opt/tf-bd
COPY scripts/ /opt/scripts
RUN chmod +x /opt/scripts/*

RUN terraform init -backend=false

WORKDIR /opt/tf-bd

ENTRYPOINT ["/opt/scripts/init-backend.sh"]