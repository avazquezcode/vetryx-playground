# Vetryx Playground
This is a playground developed with Next.js and NextUI, using Monaco editor, for the Vetryx language (which I developed for fun).

## What is vetryx?
Vetryx is a language I developed for fun. Repo of the interpreter: [here](https://github.com/avazquezcode/govetryx). 
Docs about the language will be added soon...

## How does it work?

It basically allows you to write code (with Vetryx syntax), and execute it to see the output.

The playground is just a frontend, that hits an external API (which should be published separately), to interpret the code.

It also supports some predefined codes to test the interpreter quickly (eg: fibo sequence, etc...).

## How to run this locally?

1 - Clone this repo
`git clone https://github.com/avazquezcode/vetryx-playground.git`

2 - CD into it
`cd vetryx-playground`

3 - Install Next UI
`npm install -g nextui-cli`

4 - Make sure you have `docker` and `docker-compose` installed in your environment before moving further.

5 - Run `make setup-dev` to generate the `.env.local` file in `./playground` directory.

6 - Update the `.env.local` file in `./playground` directory with the variables that apply to your app :)

7 - CD into `./playground` directory and run: `npm install`.

8 - Go back to root directory `cd ..` and run `make build-local` to build the image.

9 - Run `make run-local` to run the container.

10 - The app should be listening in [http://localhost:3000](http://localhost:3000) in a few seconds :)

11 - Have fun....

## How to run this in production?

This app is not optimised to be executed in production, I just did it for fun (and really quickly) just to be able to execute my new language in an easier way.

With that being said, feel free to improve it :)

I added a docker image for prod, but the only difference is that it build the image for prod (instead of executing the app with live reload). Is not production ready tho.