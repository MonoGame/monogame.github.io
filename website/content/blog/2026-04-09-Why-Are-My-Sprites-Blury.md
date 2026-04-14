---
title: Why are my Sprites Blury?
date: "2026-04-09"
excerpt: Got Blury Textures or Sprites? Find out how to fix it.
tags: educational
author: MonoGame Foundation
image: /images/blog/whyarespritesblury.png
ogImage: /images/blog/whyarespritesblury.png
---

## Why are my Sprites Blury?

So you've just started using MonoGame, you've figured out how to load and render textures. But your images or sprites look blury? Especially when they are scaled up.... What you need is to set your [SamplerState](https://docs.monogame.net/api/Microsoft.Xna.Framework.Graphics.SamplerState) 

## What is SamplerState?

The [SamplerState](https://docs.monogame.net/api/Microsoft.Xna.Framework.Graphics.SamplerState) class gives you the ability to control how the graphics card gets pixels from your textures. This includes how the textures are filtered (or smoothed), what to do if the texture coordinates are outside of the 0.0-1.0 range, and which mipmap level to select. 

There is an exelent seciton in our [2D Tutorial](https://docs.monogame.net/articles/tutorials/building_2d_games/18_texture_sampling/) which talks about the details of Texture Sampling.

By default the [SpriteBatch](https://docs.monogame.net/api/Microsoft.Xna.Framework.Graphics.SpriteBatch) class will use [SamplerState.LinearClamp](https://docs.monogame.net/api/Microsoft.Xna.Framework.Graphics.SamplerState.html#Microsoft_Xna_Framework_Graphics_SamplerState_LinearClamp) to sample the texture you are rendering, this can result in a slightly blury output because the filtering samplers the pixels around the pixel you want to draw and averages out the colors. This results in that slightly blury look. This is very useful for getting rid of jagged lines at the hard boundaries in textures, but it is not always what you want, especially in a Pixel based game. 

| ![Example of using Linear filtering mode. Left: MonoGame logo at 32x32 pixels.  Right: MonoGame logo at 128x128 pixels](https://docs.monogame.net/articles/tutorials/building_2d_games/18_texture_sampling/images/filter-mode-linear.png) |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                 **Example of using Linear filtering mode. Left: MonoGame logo at 32x32 pixels.  Right: MonoGame logo at 128x128 pixels**                 |


## So how to I fix it?

The [SpriteBatch](https://docs.monogame.net/api/Microsoft.Xna.Framework.Graphics.SpriteBatch) class Begin method has additional arguments which let you control how things are rendered. One of them is the `samplerState`. If we want pixel perfect rendering we should use [SamplerState.PointClamp](https://docs.monogame.net/api/Microsoft.Xna.Framework.Graphics.SamplerState.html#Microsoft_Xna_Framework_Graphics_SamplerState_PointClamp). This sampler does not do any filtering, it samples the texture from the center of the desired pixel and used that color only. This results in a a nice sharp image.

| ![Example of using Point filtering mode. Left: MonoGame logo at 32x32 pixels.  Right: MonoGame logo at 128x128 pixels](https://docs.monogame.net/articles/tutorials/building_2d_games/18_texture_sampling/images/filter-mode-point.png) |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                **Example of using Point filtering mode. Left: MonoGame logo at 32x32 pixels.  Right: MonoGame logo at 128x128 pixels**                 |



