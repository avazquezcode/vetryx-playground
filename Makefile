setup-dev:
	cp .env.dist ./playground/.env.local

build-local:
	docker-compose build

build-prod:
	docker build -t vetryx-play -f build/docker/prod/Dockerfile .

run-local:
	docker-compose up -d

run-prod:
	docker run -p 3000:3000 vetryx-play
