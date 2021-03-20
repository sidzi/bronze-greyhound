#!/bin/bash
export AWS_ACCESS_KEY_ID=test
export AWS_SECRET_ACCESS_KEY=test
export AWS_DEFAULT_REGION=us-west-2

docker-compose up -d

make clean

make install-dependencies

make run-dev

make deploy

