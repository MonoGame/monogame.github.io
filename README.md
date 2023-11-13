# monogame.github.io

This repository contains the documenation and the website for MonoGame Framework.

## Buolding from source

First up restore the dotnet tooling, this restores the `docfx` cli tool needed to build the website.
```sh
dotnet tool restore
```

Next to build the website, simply invoke the restored docfx tool from the CLI:
```
dotnet docfx docfx.json --serve
```

## LICENSE

The MonoGame project is under the Microsoft Public License except for a few portions of the code. See the [LICENSE](LICENSE) file for more details.
