---
title: Contributing guidelines
description: The following rules must be observed at all times when contributing documentation to the MonoGame project.
---

# General Rules

The following rules must be observed at all times when contributing documentation to the MonoGame project.

- Write in a neutral, technical tone.
- Avoid humor, personal opinions, and colloquial language.
- **Never** plagiarize any documentation from another source.
- Do not use automatic documentation tools as they are ineffective.

Breaking these rules can result in your contribution being rejected.

## Getting Started

You can create and edit documentation right from the web browser without needing to install Git or ever leave the GitHub site.

- [Fork the MonoGame repo](https://help.github.com/articles/fork-a-repo/).
- [Create a new branch](https://help.github.com/articles/creating-and-deleting-branches-within-your-repository/) from `develop` and make your changes only in that branch.
- [Create a new file](https://help.github.com/articles/creating-new-files/) or [edit an existing one](https://help.github.com/articles/editing-files-in-your-repository/) using the GitHub markup editor.
- [Submit pull requests](https://help.github.com/articles/creating-a-pull-request/) early and often to merge your documentation changes.

## Generate the output before submission

The `MonoGame.GitHub.io` site has the ability to generate the documentation website locally so that you can verify how the documentation renders `BEFORE` submission, we recommend all contributors validate what is written as it is rendered on the website to help the reviewers checking the PR request.

> [!TIP]
> If possible, include a screenshot in your PR showing the rendered output.  Recommended, but not mandatory.

See the following sections for more details on generating the relevant website pages:

- [Generating the Documentation website](#generating-the-documentation-website)
- [Generating the API Documentation](#generating-the-api-documentation)

## Style Guide

Review the following expectations before contributing any documentation.

### Manuals, Guides, and Tutorials

TODO!

#### Generating the Documentation website

To generate the documentation site locally, simply:

1. Clone the [MonoGame.GitHub.io](https://github.com/MonoGame/MonoGame.github.io) repository.
2. Follow the instructions in the site readme for preparing your environment and generating the documentation.
3. Use the `npm run articles` command to finally generate the site to only check the documentation updates (although it may be easier to simply run `npm run dev` to generate everything)
4. Browse the running site from `http://localhost:xxxx`

Check the `Documentation Hub` pages for your changes and include screenshots of the pages when you are ready to submit. (Optional, but recommended)

### API Reference

The API reference documentation is a big part of the documentation effort for MonoGame.  The documentation is written in the [C# XML format](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/xmldoc/xml-documentation-comments) and is inline to the MonoGame source code. The final web pages with API documentation are generated using [DocFX]([DocFX - static documentation generator | DocFX website](https://dotnet.github.io/docfx/)).

#### Generating the API documentation

To generate the docs locally, simply:

1. Clone the [MonoGame.GitHub.io](https://github.com/MonoGame/MonoGame.github.io) repository.
2. In the `External` folder, update the `MonoGame` submodule to your own **Fork/Branch**.
3. Follow the instructions in the site readme for preparing your environment and generating the documentation.
4. Use the `npm run dev` command to finally generate the site to view both API and general documentation pages.
5. Browse the running site from `http://localhost:xxxx`

Check the `API Reference` pages for your changes and include screenshots of the pages when you are ready to submit. (Optional, but recommended)

#### Every Word Should Contain Value

Every word in the reference documentation should provide information beyond the API itself.  Documentation that only rehashes or rephrases what is already apparent in the class, method, parameter, or property name has zero value and wastes time for both the writer and reader.

#### The First Sentence Is the Most Important

There is no guarantee that the reader will read beyond the first sentence of the reference documentation.  This is why that first sentence is the most important and should convey the most key piece of information.  Take your time to write the most concise and clear first sentence possible.  This helps users tremendously and goes a long way towards having great documentation.

#### Surface Information Hidden in the Code

Being inline with the code allows you to easily look for critical information within it that the user might not know from looking at the API alone.  Take your time to explore inner method calls and platform specific sections of the code.  The time to write the documentation is once you feel you fully understand the code you are documenting.  If you don't feel you understand the code then leave the documentation for someone else to write.

#### Focus on what adds value to the consumer

Limit documentation to public methods and functions unless there is a specific reason to include internal methods, while documenting internals helps with readability of the code, it provides limited use to consumers of the MonoGame Framework.

#### Documentation Is Referenced Not Read

Remember that the user is searching for an answer for a specific question.  It is your job to predict these questions and provide them clear answers.

#### Descriptions should add value and understanding

Describing a thing by naming the thing does not help the developer to understand what the concept is that you are describing, for example:

> "The Genre class provides information about a genre"

Which does not help someone reading the documentation if they do not know what a `Genre` is.  Be descriptive and improve the readers understanding for what something is and WHY it is.

#### XML Tag guidance

By default, the standard [Microsoft recommendations](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/xmldoc/recommended-tags) should be used for filling in XML tags for each class, method and property.

With a few points to call out:

#### See / CRef should be used whenever an API reference is used in the documentation

To ensure that API documentation is linked to whichever reference is used, `<see>` and `<cref/>` references should be used, this helps users navigate the methods, especially when looking up initializers or use of a property or method.

#### Avoid self referencing `<cref/>` unless it provides value

`<cref/>` blocks are there to add links and create references to other classes, functions and methods that help inform the developer for what those concepts are.  Adding a `<cref/>` for the same class or property you are describing just creates a circular reference that does not add value.

References to other methods or properties in the same class is fine, just avoid self if possible.

#### Use descriptors in `<see/>` & `<cref/>` statements for better readability

By default, a `<cref/>` or `<see/>` reference will use only the type you are referencing when rendered to the user, e.g. `<cref="Album.Genre"/>` will render as `Genre`.

Instead, use the descriptor in the style to render what you actually mean, for example: `<cref="Album.Genre">Album.Genre</cref>` which will always render as `Album.Genre` which is much clearer, it is the same for `<see/>` tags.

#### 120 Width comments for easy reading

Comments should be limited to **120** width, with overflow moving to the next line to make reading easier, for example:

```csharp
<summary>
Packed vector type containing unsigned normalized values ranging from 0 to 1. The x and z components use 5 bits,
and the y component uses 6 bits.
</summary>
```

> [!NOTE]
> If the `cref` description would cause the line to exceed the 120 recommendation, this is generally ok, so long as the rendered line does not exceed the limit.
> THe limit however, is more of a guideline than a hard rule, so common sense should be applied to keep the limit near 120 characters.

#### Use the packed multi-line stype with surrounding tags

To keep the documentation packed and readable, each parameter should be contained to a single line, for example:

```csharp
<summary>
Creates a new instance of Bgr565.
</summary>
<param name="x">The x component</param>
<param name="y">The y component</param>
<param name="z">The z component</param>
```

#### Interface documentation

If documentation is already provided by an interface or inherited class, then the `<inheritdoc />` tag should be used.  Critically, **DO NOT** duplicate documentation as it increases maintenance later, for example:

```csharp
/// <inheritdoc />
public void InterfaceDefinedMethod()

/// <inheritdoc cref="IDisposable.Dispose()"/>
public void Dispose()
```

This applies to all derived elements within a class, property or method.

#### Inherited properties

Where a property or type is already documented in an `enum` or `static`, to avoid duplication the `<inheritdoc cref=""/>` style should be used, for example:

```csharp
    public struct VertexPositionColorNormalTexture : IVertexType
    {
        /// <inheritdoc cref="VertexPosition.Position" />
        public Vector3 Position;

        /// <inheritdoc cref="VertexPositionColor.Color" />
        public Color Color;

        /// <inheritdoc cref="VertexPositionNormalTexture.Normal" />
        public Vector3 Normal;

        /// <inheritdoc cref="VertexPositionTexture.Texture" />
        public Vector2 TextureCoordinate;

        /// <inheritdoc cref="IVertexType.VertexDeclaration" />
        public static readonly VertexDeclaration VertexDeclaration;
```

#### Protected methods requiring documentation by the linter

By default, we do not document Finalizers or other protected methods, the recommendation is to apply an empty `<summary />` tag to suppress the warnings raised by the linter, for example:

```csharp
/// <summary />
~Foo() => Dispose(false);
```

## License

All documentation contributed to the MonoGame project is subject to the [Creative Commons Attribution-NonCommercial-ShareAlike](http://creativecommons.org/licenses/by-nc-sa/4.0/) license.  By contributing you are agreeing to the terms of that license.

<p align="center"><a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/Text" property="dct:title" rel="dct:type">MonoGame Documentation</span> by the <a xmlns:cc="http://creativecommons.org/ns#" href="http://www.monogame.net" property="cc:attributionName" rel="cc:attributionURL">MonoGame Team</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike License</a>.</p>
