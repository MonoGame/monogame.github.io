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

## Style Guide

Review the following expectations before contributing any documentation.

### Manuals, Guides, and Tutorials

TODO!

### API Reference

The API reference documentation is a big part of the documentation effort for MonoGame.  The documentation is written in the [C# XML format](https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/xmldoc/xml-documentation-comments) and is inline to the MonoGame source code. The final web pages with API documentation are generated using [DocFX]([DocFX - static documentation generator | DocFX website](https://dotnet.github.io/docfx/)).

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

#### XML Tag guidance

By default, the standard [Microsoft recommendations](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/xmldoc/recommended-tags) should be used for filling in XML tags for each class, method and property.

With a few points to call out:

#### See / CRef should be used whenever an API reference is used in the documentation

To ensure that API documentaiton is linked to whichever reference is used, `<see>` and `<cref` references should be used, this helps users navigate the methods, espeically when looking up initializers or use of a property or method.

#### 120 Width comments for easy reading

Comments should be limited to **120** width, with overflow moving to the next line to make reading easier, for example:

```csharp
<summary>
Packed vector type containing unsigned normalized values ranging from 0 to 1. The x and z components use 5 bits,
and the y component uses 6 bits.
</summary>
```

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

If documentation is already provided by an interface or inherited class, then the `<inheritdoc />` tag should be used.  Critically, **DO NOT** duplicate documentaiton as it increases maintenance later, for example:

```csharp
/// <inheritdoc />
public void InterfaceDefinedMethod()
```

This applies to all derrived elements within a class, proprty or method.

#### Inherited properties

Where a property or type is already documented in an enum or static, to avoid duplication the `<inheritdoc cref=""/>` style should be used, for example:

```csharp
    public struct VertexPositionColorNormalTexture : IVertexType
    {
        /// <inheritdoc cref="VertexPosition.Position" />
        public Vector3 Position;

        /// <inheritdoc cref="VertexPositionColor.Color" />
        public Color Color;

        /// <inheritdoc cref="VertexPositionColorNormalTexture.Normal" />
        public Vector3 Normal;

        /// <inheritdoc cref="VertexPositionTexture.Texture" />
        public Vector2 TextureCoordinate;

        /// <inheritdoc cref="IVertexType.VertexDeclaration" />
        public static readonly VertexDeclaration VertexDeclaration;
```

#### Protected methods requiring documentation by the linter

By default, we do not document Finalizers or other protected methods, the recommendation is to apply an empty `<sumary />` tag to surpress the warnings raised by the linter, for example:

```csharp
/// <summary />
~Foo() => Dispose(false);
```

## License

All documentation contributed to the MonoGame project is subject to the [Creative Commons Attribution-NonCommercial-ShareAlike](http://creativecommons.org/licenses/by-nc-sa/4.0/) license.  By contributing you are agreeing to the terms of that license.

<p align="center"><a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/Text" property="dct:title" rel="dct:type">MonoGame Documentation</span> by the <a xmlns:cc="http://creativecommons.org/ns#" href="http://www.monogame.net" property="cc:attributionName" rel="cc:attributionURL">MonoGame Team</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike License</a>.</p>
