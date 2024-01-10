# monogame.github.io

This repository contains the documentation and the website for MonoGame.

## Building Form Source
The MonoGame website is built using the .NET tool [DocFX](https://dotnet.github.io/docfx/) to generate the API reference documentation and the static site generator [11ty](https://www.11ty.dev/) to generate the full website.  This means you will need the following prerequisites to build locally from source

1. .NET SDK version 6.0 or higher installed ([download](https://dotnet.microsoft.com/en-us/download))
2. Node.js and NPM installed ([download](https://nodejs.org/en))

With your environment setup properly, the following explains how to build from source

1. Clone this repository

```sh
git clone https://github.com/MonoGame/monogame.github.io.git
```

2. Install npm dependencies

```sh
npm install
```

3. Optional Steps
   1. If you want to generate the API Reference documentation locally, you will need to ensure that the MonoGame submodule has been initialized by running `git submodule update --init --recursive`
   2. Next execute the command `npm run docfx` to generate the API Reference markdown pages.  They will be placed in the **/content/api** directory

4. Run a local build and serve it with hot reloading

```sh
npm run dev
```

## LICENSE

The MonoGame project is under the Microsoft Public License except for a few portions of the code. See the [LICENSE](LICENSE) file for more details.
