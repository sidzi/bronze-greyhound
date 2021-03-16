# make commands to make things easier
SHELL := /bin/bash


.PHONY: install-dependencies
## install-dependencies: installs depencies for the project
install-dependencies:
	# TODO: Install all the relevant dependencies for the project e.g, Lambdas
	@aws --endpoint-url=http://localhost:4566 s3 mb s3://todo || exit 0
	@cd create-todo/ && npm ci

.PHONY: run-dev
## run-dev: start dev environment
run-dev:
	@aws --endpoint-url=http://localhost:4566 cloudformation create-stack --stack-name test --template-body file://template.yaml
	# TODO: Dev command for development e.g. running localstack from docker

.PHONY: add-todo
## add-todo: adds a todo in the app
add-todo:
	# TODO: Adds a todo in the app. Should accept the relevant data
	@aws --endpoint-url=http://localhost:4566 lambda invoke --function-name create-todo --payload '{}' response.json

.PHONY: read-todo
## read-todo: reads a single or all todos in the app
read-todo:
	# TODO: Reads a single or all todos, should accept relevant parameters

.PHONY: template-lint
## template-lint: static check for errors in template
template-lint:
	cfn-lint template.yaml

.PHONY: lint-check
## link-check: check the linting of all files in the codebase
link-check:
	# TODO: Add link check for relevant *.js, *.py or *.go files etc

.PHONY: test
## test: run tests on the deployed version
test:
	# TODO: To run end to end tests on the application

.PHONY: deploy
## deploy: deploy the application locally
deploy:
	@mkdir -p out/
	@zip out/create-todo.zip create-todo/* 
	@aws --endpoint-url=http://localhost:4566 s3 cp out/create-todo.zip s3://todo/code/create-todo.zip

.PHONY: clean
## clean: clean all the local cache etc
clean:
	# TODO: any local cache cleanup (optional)

.PHONY: help
## help: show the helo menu
all: help
help: Makefile
	@echo
	@echo "Choose a command to run :"
	@echo
	@sed -n 's/^##//p' $< | column -t -s ':' |  sed -e 's/^/ /'
	@echo
