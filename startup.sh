#!/bin/bash
docker-compose up -d
export AWS_ACCESS_KEY_ID=test
export AWS_SECRET_ACCESS_KEY=test
export AWS_DEFAULT_REGION=us-west-2

make install-dependencies

make deploy

make run-dev


