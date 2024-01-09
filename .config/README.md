# **/.config/** Directory
This directory contains all of the configurations setup for 11ty.  11ty can have various configurations such as which files to ignore, which files to watch, which files to copy only and not process, etc.  

Reference: https://www.11ty.dev/docs/config/

Instead of creating a single monolithic configuration file, each of these possible configurations are broken down into their own files in this directory.

When a specific configuration relies on an external module or plug-in that has been created, that module lives inside of a directory named after the configuration type it is for.  For example. 11ty `Filter`s that have been created live inside the `/_config/filters` directory.

The following table is a demonstration of how the files and directories contained here are structured:

| File/Directory Name                   | Description                                                                                  | Reference                                                                         |
| ------------------------------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| eleventy.config.**collections**.js    | Contains the 11ty configuration for all collections added                                    | https://www.11ty.dev/docs/collections/                                            |
| eleventy.config.**dataExtensions**.js | Contains the 11ty configuration logic for all data extensions.                               | https://www.11ty.dev/docs/data-custom/                                            |
| eleventy.config.**filters**.js        | Contains the 11ty configuration logic for all custom template filters.                       | https://www.11ty.dev/docs/filters/                                                |
| eleventy.config.**ignores**.js        | Contains the 11ty configuration for all file ignore logic.                                   | https://www.11ty.dev/docs/ignores/                                                |
| eleventy.config.**libraries**.js      | Contains the 11ty configuration logic for all libraries used in 11ty.                        | https://www.11ty.dev/docs/languages/markdown/#add-your-own-plugins                |
| eleventy.config.**passthrough**.js    | Contains the 11ty configuration logic for all file pass through copies.                      | https://www.11ty.dev/docs/copy/                                                   |
| eleventy.config.**plugins**.js        | Contains the 11ty configuration for all 11ty plugins used.                                   | https://www.11ty.dev/docs/plugins/#add-the-plugin-to-eleventy-in-your-config-file |
| eleventy.config.**transforms**.js     | Contains the 11ty configuration for all transforms.                                          | https://www.11ty.dev/docs/config/#transforms                                      |
| eleventy.config.**watchtargets**.js   | Contains the 11ty configuration for all watch targets during development.                    | https://www.11ty.dev/docs/watch-serve/#add-your-own-watch-targets                 |
| **/collections/**                     | Each file contains the logic to build the data for that specific collection                  |                                                                                   |
| **/filters/**                         | Each file contains the logic to handle that specific filter.                                 |                                                                                   |
| **/markdownit-plugins/**              | Custom plugins written for the markdown-it markdown renderer to handle difference scenarios. |                                                                                   |
| **/transforms/**                      | Each file contains the transform logic used to transform input data before it is output.     |                                                                                   |


This directory also contains the `dotnet-tools.json` manifest file for the dotnet tools installation.