---
title: MonoGame Content Builder
date: "2025-11-06"
excerpt: Check out the all the latest and greatest regarding the new MonoGame COntent Builder project coming in preview in `3.8.5`
tags: releases
author: MonoGame Foundation
image: /images/blog/cover/monogame_content_builder.png
ogImage: /images/blog/cover/monogame_content_builder.png
---

The new `Content Builder Project` is one the hottest things coming in preview in the MonoGame `3.8.5` release, aiming to greatly simplify asset management for MonoGame projects (removing the need for a separate DotNet tool, goodbye MGCB-Editor) and enable more advanced features related to the management and compilation for MonoGame projects.

## Check out the recent [Code Time](https://www.youtube.com/watch?v=CaxeVVYlGH0) stream where this was discussed

The MonoGame team showcased the new `Content Builder` project, highlighting why it is critical to use some form of curated asset management when building your content for multiple platforms, highlighting the complexities in platform targetting and how the `Content Pipeline` greatly simplifies asset maintenance and delivery.

::: tip More incoming
Content is getting a specific focus for `3.8.5`, so expect more advanced guidance for managing content, especially if you want to target consoles.  We plan to expose all the fundemental issus the team encounter when porting other projects to Console and beyond.
:::

### Watch on:

<div class="row justify-content-center">
<iframe width="560" height="315" src="https://www.youtube.com/embed/CaxeVVYlGH0?si=FULKQsUvGrUYH_QV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## Short on time? check out the recent Shorts we produced!

If you do not have the spare 1+ hours to see everything, we have also produced several shorts to "get you there quicker" (then you can watch the full video when you have time):

- [MonoGame Code Time! - Understand Why The Content Pipeline is SO Important](https://www.youtube.com/watch?v=sjcidP0VOfY)
- [MonoGame Code Time! - The New Content Pipeline Project](https://youtu.be/HCLik_M4Drk)
- [MonoGame: Q&A - Are separate Content Projects Required For Each Platform?](https://www.youtube.com/watch?v=omS_UsiE9Mk)
- [MonoGame: How to Use the New Content Pipeline With Your Project](https://www.youtube.com/monogame) - Coming soon, a quick fire "How to upgrade to the new Content Builder"

## Documentation - Newly released

As of the weekend of 11/09 - we have just published the early release of the new `Content Builder Project` documentation.

- ### [Getting Started with the ContentBuilder Project](https://docs.monogame.net/articles/getting_started/content_pipeline/content_builder_project.html)

::: info `develop` release only
The latest release of the new `Content Builder` Project is only available in the latest `3.8.5-develop` releases, starting from `3.8.5-develop-13`.

See the [instructions here](https://docs.monogame.net/articles/getting_to_know/howto/HowTo_Install_Preview_Release.html) for how to install the preview project templates and update your project to use `3.8.5-develop` (preview) releases.
:::

This guide will walk you through all the current workings of the new `COntent Builder` Project solution and how it can greatly improve your asset management with MonoGame projects, including:

1. [What is the ContentBuilder?](https://docs.monogame.net/articles/getting_started/content_pipeline/content_builder_project.html#what-is-the-contentbuilder)
2. [Getting Started](https://docs.monogame.net/articles/getting_started/content_pipeline/content_builder_project.html#getting-started)
3. [Understanding ContentBuilderParams](https://docs.monogame.net/articles/getting_started/content_pipeline/content_builder_project.html#understanding-contentbuilderparams)
4. [Creating Your ContentCollection](https://docs.monogame.net/articles/getting_started/content_pipeline/content_builder_project.html#creating-your-contentcollection)
5. [Including and Excluding Content](https://docs.monogame.net/articles/getting_started/content_pipeline/content_builder_project.html#including-and-excluding-content)
6. [Working with Importers and Processors](https://docs.monogame.net/articles/getting_started/content_pipeline/content_builder_project.html#working-with-importers-and-processors)

::: info Subject to change
**This documentation is a work in progress and subject to change.**

While every effort will be made during the `3.8.5` preview to keep this documentation up to date, check back often for reference and log issues for corrections to assist the team in its development.
:::

{% include 'partials/_blog_footer.njk' %}
