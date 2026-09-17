---
title: New MonoGame template feedback
date: "2026-09-16"
excerpt: The Foundation is seeking feedback on a new MonoGame "Empty" multi-platform game template.
tags: [source]
author: MonoGame Foundation
image: /images/blog/EmptyGameTemplate.png
ogImage: /images/blog/EmptyGameTemplate.png
---

As discussed in the [September Open Hours](https://www.youtube.com/watch?v=NdjYjzpwj3g) monthly meeting, the MonoGame Foundation is seeking feedback on a new style of Game template for creating Game projects, aiming to overcome the many complexities that come from our existing stock of templates, namely:

- No single template
- Platforms are separate
- Too much duplication
- Folder structure inconsistent
- Adding platforms is hard

To this end we have developed a few options for a single unified template (or at least the default layout for a new project).

In the template repository you will find two paths we have devised with different folder structures and we are asking the community to help choose the future path.

## The template on GitHub

The new templates are located in a single repository hosted on GitHub and is open for access to all:

### [MonoGame.EmptyGame.CSharp](https://github.com/MonoGame/MonoGame.EmptyGame.CSharp)

In this repository you will find:

- A base README, explaining the problems today and the details/decisions behind the redevelopment of a new template.
- A folder for Option 1 - The Single folder solution (where all projects are in a root folder)
- A folder for Option 2 - The Multi-Folder solution (where each platform has its own dedicated folder)

Both have been tested extensively to date, but we need your help to try them out and decide which is the best approach for a new / clean project default.

## Installing the templates

Now, `.NET` is a bit picky when it comes to testing new templates and requires them to be "installed" locally in order to allow you to create a new project from them, but this can be done safely and in isolation, so as not to interfere with your machine's setup.

Details are included with each template, which is essentially as follows:

1. Open up a command / terminal window in the folder for the template
2. Use the following commands to install the template into a "hive" (or scratch area)

    ```cli
    dotnet new install . --debug:custom-hive ../mg-hive
    ```

3. Then create a new project using the template

    ```cli
    dotnet new mg-emptygame -n MyGame --Platforms gl -o ../MyGame --debug:custom-hive ../mg-hive
    ```

::: note Using parameters to create your game
Note the parameters which allow you to select which platforms you want in your project, for full details of the parameters, use the `--help` argument

    ```cli
        dotnet new mg-emptygame --help --debug:custom-hive ../mg-hive
    ```

:::

::: danger There can be only one!
You can only have one template installed at a time with the same identity, so make sure to uninstall any you have installed before trying another, or when you are finished testing.

    ```cli
        dotnet new uninstall mg-emptygame --debug:custom-hive ../mg-hive
    ```

:::

Full details are included with each template.

## Feedback

We have set up a [Discussions](https://github.com/MonoGame/MonoGame.EmptyGame.CSharp/discussions) area on the repository for providing feedback with a few pre-existing polls.

- [Which folder structure to use?](https://github.com/MonoGame/MonoGame.EmptyGame.CSharp/discussions/1) - for helping with the folder structure of choice.
- [CSPROJ names, with the Game name or not?](https://github.com/MonoGame/MonoGame.EmptyGame.CSharp/discussions/2) - for helping with how to "Name" individual platform projects.
- [Issues with testing the templates?](https://github.com/MonoGame/MonoGame.EmptyGame.CSharp/discussions/3) - for any issues while testing.

::: note Join existing discussions first
 Make sure to check existing responses before creating new topics.
:::

Alternatively, raise an issue and we will respond to feedback.

{% include 'partials/_blog_footer.njk' %}
