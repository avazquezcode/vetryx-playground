setup-dev:
	cp .env.dist ./playground/.env.local

build-local:
	docker-compose build

build-prod:
	docker buildx build --platform linux/amd64 -t vetryx-play -f build/docker/prod/Dockerfile --load .

run-local:
	docker-compose up -d

run-prod:
	docker run -p 3000:3000 vetryx-play
