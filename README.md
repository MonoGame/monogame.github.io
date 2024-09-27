# MonoGame.github.io

This repository contains the source code for the [MonoGame](https://monogame.net) website. If you're looking for the documentation, visit the [Documentation](https://github.com/monogame/docs.monogame.github.io) repository.

## Prerequisites

To build and run the MonoGame website locally, you will need
- [Node.js and NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Running the Website Locally
The MonoGame website is built using [11ty (Eleventy)](https://www.11ty.dev/), a static site generator. To start working with the site on your local machine, follow these steps:

1. **Clone this repository**

    ```sh
    git clone https://github.com/MonoGame/monogame.github.io.git
    ```

2. **Install npm dependencies**

   In the root directory of the cloned repository, run:

    ```sh
    npm install
    ```

3. **Start the development server**

   To serve the site locally with hot-reloading, which allows you to see changes in real-time, use the following command

    ```sh
    npm run dev
    ```

    This will spin up a local server, the address of which will be shown in the console.

## Building the Site for Production

To generate a production-ready build of the site, run:

```sh
npm run build
```

This will generate the static HTML file in the `_site` directory.

## LICENSE

The MonoGame project is under the Microsoft Public License except for a few portions of the code. See the [LICENSE](LICENSE) file for more details.
