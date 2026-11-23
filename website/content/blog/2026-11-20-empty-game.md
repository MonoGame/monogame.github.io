---
title: New "Empty Game" MonoGame template
date: "2026-11-20"
excerpt: The new "Empty Game" single project template has launched with 3.8.6.1
tags: [source]
author: MonoGame Foundation
image: /images/blog/NewMonoGameTemplate-1600x900.png
ogImage: /images/blog/NewMonoGameTemplate.png
---

Breaking down the barriers of the past, the new Single MonoGame template is finally here.

Now there is only one command needed to begin a new project, regardless of which platform you want to build for:

`dotnet new monogame -n MyGame --Platforms gl vk dx12`

Give it a name, choose the platforms you want included, and boom, Cornflower blue is awaiting your command.

## Installing the template

The new template is included automatically from `3.8.6.1` in the MonoGame CSharp template pack:

`dotnet new install MonoGame.Templates.CSharp`

::: note Prerequisites
Assuming you have installed your operating system's prerequisites, which are detailed in the new ["Getting Started"](https://docs.monogame.net/articles/tutorials/getting_started/index.html) guide
:::

This still includes the original templates, should you need them.

## The template on GitHub

The new template is also hosted on GitHub and is open for access to all:

### [MonoGame.EmptyGame.CSharp](https://github.com/MonoGame/MonoGame.EmptyGame.CSharp)

In this repository you will find:

- A base README, explaining how the new project is set out.
- Tips and guides for how to use it.
- Instructions for using the template locally if you do not want to install the main MG templates.

The choice is up to you.

## Getting Started

We also launched a new ["Getting Started"](https://docs.monogame.net/articles/tutorials/getting_started/index.html) guide:

<a href="/articles/tutorials/getting_started/index.html"><video autoplay loop muted style="max-width: 100%; height: auto;" aria-label="Getting Started with MonoGame"><source src="https://docs.monogame.net/images/learn/getting-started-banner.webm" type="video/webm"></video></a>

This covers everything from scratch for how to get started with MonoGame, including:

- Setting up your PC, installing the prerequisites.
- Choosing your IDE.
- Creating a new project
- Working with the Content Builder and code
- Building a mini "pong" game from start to finish

::: note Brand new
A bit of a step up from our original multi-paged guide and here is the code guide.
:::

## Feedback

If you have feedback or suggestions, you can either:

- Let us know in the "Suggestions" channel on Discord.
- Log an issue on the ["Empty Game"](https://github.com/MonoGame/MonoGame.EmptyGame.CSharp) template repo.
- Log a feedback request on the main MonoGame GitHub.

Onwards MonoGame!

{% include 'partials/_blog_footer.njk' %}
