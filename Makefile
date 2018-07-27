#Makefile

install:
	npm install
	
start:
	npm run babel-node -- src/bin/page-loader.js --output /var/tmp/ https://hexlet.io/courses
	
build:
	rm -rf dist/
	npm run build
	
publish:
	npm publish
	
lint:
	npm run eslint .

test:
	npm test
	# DEBUG="page-loader:*" npm test

watch:
	DEBUG="page-loader:*" npm test -- --watch