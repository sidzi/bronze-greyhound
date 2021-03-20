# make commands to make things easier
SHELL := /bin/bash


.PHONY: install-dependencies
## install-dependencies: installs depencies for the project
install-dependencies:
	# TODO: Install all the relevant dependencies for the project e.g, Lambdas
	@aws --endpoint-url=http://localhost:4566 s3 mb s3://todo || exit 0
	@cd create-todo/ && npm ci --prod
	@cd read-todo/ && npm ci --prod

	@cd create-todo/ && zip -r ../out/create-todo.zip *
	@aws --endpoint-url=http://localhost:4566 s3 cp out/create-todo.zip s3://todo/code/

	@cd read-todo/ && zip -r ../out/read-todo.zip *
	@aws --endpoint-url=http://localhost:4566 s3 cp out/read-todo.zip s3://todo/code/

	# Test Dependencies
	@cd test/ && npm i --also=dev


.PHONY: run-dev
## run-dev: start dev environment
run-dev:
	@aws --endpoint-url=http://localhost:4566 s3 cp out/create-todo.zip s3://todo/code/
	@aws --endpoint-url=http://localhost:4566 s3 cp out/read-todo.zip s3://todo/code/
	@aws --endpoint-url=http://localhost:4566 cloudformation create-stack --stack-name test --template-body file://template.yaml
	# TODO: Dev command for development e.g. running localstack from docker

.PHONY: add-todo
## add-todo: adds a todo in the app
add-todo:
	# TODO: Adds a todo in the app. Should accept the relevant data
	@aws --endpoint-url=http://localhost:4566 lambda invoke --function-name create-todo-function --payload '{"title":"Hello", "task":"world"}' response.json

.PHONY: read-todo
## read-todo: reads a single or all todos in the app
read-todo:
	# TODO: Reads a single or all todos, should accept relevant parameters
	@aws --endpoint-url=http://localhost:4566 lambda invoke --function-name read-todo-function --payload '{"task":"all"}' response.json

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
	cd test && node ./node_modules/jest/bin/jest.js
.PHONY: deploy
## deploy: deploy the application locally
deploy:
	@mkdir -p out/

	@cd read-todo/ && zip -r ../out/read-todo.zip *
	@aws --endpoint-url=http://localhost:4566 s3 cp out/read-todo.zip s3://todo/code/
	@aws --endpoint-url=http://localhost:4566 lambda update-function-code --function-name read-todo-function --s3-key code/read-todo.zip --s3-bucket todo


	@cd create-todo/ && zip -r ../out/create-todo.zip *
	@aws --endpoint-url=http://localhost:4566 s3 cp out/create-todo.zip s3://todo/code/
	@aws --endpoint-url=http://localhost:4566 lambda update-function-code --function-name create-todo-function --s3-key code/create-todo.zip --s3-bucket todo


.PHONY: clean
## clean: clean all the local cache etc
clean:
	# TODO: any local cache cleanup (optional)
	@aws --endpoint-url=http://localhost:4566 cloudformation delete-stack --stack-name test
.PHONY: help
## help: show the helo menu
all: help
help: Makefile
	@echo
	@echo "Choose a command to run :"
	@echo
	@sed -n 's/^##//p' $< | column -t -s ':' |  sed -e 's/^/ /'
	@echo
