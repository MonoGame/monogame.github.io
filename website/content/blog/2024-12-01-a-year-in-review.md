---
title: A Year in Review
date: "2024-12-01"
excerpt: The MonoGame Foundation "Year in review", what the foundation has been up to since its incorporation.
tags: foundation, source, educational
author:  MonoGame Foundation
image: /images/blog/cover/monogame_foundation.png
ogImage: /images/blog/cover/monogame_foundation.png
---

# What a year it has been!

It has been a year since we announced that we received a very generous [donation from Re-Logic](https://x.com/MonoGameTeam/status/1724164491363967465) and the formation of the MonoGame Foundation. A lot has happened.

### So far in the last year we:

* Increased recurring subscriptions (Patreon, Github & PayPal) to almost $2000 a month
* Refreshed the MonoGame website with more focus on the creators and their titles \- Thanks Chris (ArisTurtle)  
* Overhauled the documentation site and increased the content by more than 500%, with even more to come  
* Released 3.8.2 (.NET 8)

* #### Appointed to the board

  * President - Dean Ellis  
  * Chairman - Marko Jeremic  
  * Secretary - Simon Jackson  
  * Banking - Tom Spilman  
  * Member - Thomas Altenburger  
  * Treasurer - Dominique Louis

* Regular board meetings with full transparency, keeping the community involved in the plans and actions for MonoGame to take it into the next decade.

::: note Meeting Notes
Please read our [Board Meeting notes](https://monogame.net/blog/meeting)
::: 

* #### Completed Bounties

  * [Package up ffmpeg and ffprobe](https://github.com/MonoGame/MonoGame/issues/8241)  
  * [Upgrade MonoGame to use BasisUniversal for cross-platform Texture Compression](https://github.com/MonoGame/MonoGame/issues/8419)  
  * [A shared base for public and console repos](https://github.com/MonoGame/MonoGame/issues/8242)  
  * [Implement the Direct3D 12 / GDK/GDKX backend](https://github.com/MonoGame/MonoGame/issues/8195)

* #### In Progress Bounties

  * [Switch the console runtime from BRUTE to NativeAOT](https://github.com/MonoGame/MonoGame/issues/8194)  
  * [A better 2D onboarding tutorial](https://github.com/MonoGame/MonoGame/issues/8317)  
  * [A better 3D onboarding tutorial](https://github.com/MonoGame/MonoGame/issues/8318)
  * [2D StartKit](https://github.com/MonoGame/MonoGame/pull/8275)

* #### Bug Fixes and Enhancements

  * Re-enabled the Unit Tests for PR’s.  
  * [Upgrade Mac Editor to net8.0-macos. Upgrade Eto.Forms](https://github.com/MonoGame/MonoGame/pull/8505)   
  * Fix Issues with OpenAL Panning on DesktopGL and Mobile  [#8480](https://github.com/MonoGame/MonoGame/pull/8480) and [#8466](https://github.com/MonoGame/MonoGame/pull/8466)
  * [Detect GamePad/Keyboard events on Android](https://github.com/MonoGame/MonoGame/pull/8465)
  * [Remove string allocations when calling GamePad.GetCapabilities](https://github.com/MonoGame/MonoGame/pull/8453)
  * [Content Pipeline now works on M1/M2 Macs](https://github.com/MonoGame/MonoGame/pull/8570)
  * [Fix Android MediaPlayer Song implementation](https://github.com/MonoGame/MonoGame/pull/8583)
  * [Update MonoGame.Library.OpenAL to 1.23.1.10](https://github.com/MonoGame/MonoGame/pull/8560)
  * [Fix Sprite font multi byte parsing](https://github.com/MonoGame/MonoGame/pull/8554)
  * [Added Vibration and Caps to Native GamePad API](https://github.com/MonoGame/MonoGame/pull/8520)
  * [Fix MacOS Content directory location](https://github.com/MonoGame/MonoGame/pull/8479)
  * [Detect GamePad/Keyboard events on Android](https://github.com/MonoGame/MonoGame/pull/8465)

* #### Games Released (that we know of)

  * [Horticular](https://store.steampowered.com/app/1928540/Horticular/) by inDirection Games
  * [Breeze & Freeze](https://msiebenmann.itch.io/breeze-and-freeze) by msiebenmann
  * [Tic Tac Dough](https://ms00.itch.io/tic-tac-dough) by MS00
  * [Ninja Cat Remewstered](https://pixelshock.itch.io/ninja-cat-remewstered) by Pixel Shock
  * [Smack 'n' Snatch](https://skyyyla.itch.io/smack-n-snatch) by Skyla
  * [FishGrid](https://shmellyorc.itch.io/fishgrid) by Shmellyorc
  * [Axe Attacks](https://serork.itch.io/axe-attacks) by Serork
  * [Mochi's Escape](https://anonames-lair.itch.io/mochi-escape) by Anonames
  * [Armored Crucible: The Crimson Dunes](https://fontty.itch.io/ac-tcd) by Fontty Games
  * [Arid Arnold](https://icefish-software.itch.io/arid-arnold) by IceFish Software
  * [Dungeon Adventure Gang](https://store.steampowered.com/app/2147690/Dungeon_Adventure_Gang/) by DAG Team
  * [Cranky Chibi Cthulhu](https://little-tlaloc-interactive.itch.io/cranky-chibi-cthulhu) by Little Tlaloc Interactive. Uses [FlatRedBall](https://flatredball.com/) and [Gum](http://docs.flatredball.com/gum/)
  * [BattleCrypt Bombers](https://store.steampowered.com/app/2188930/BattleCrypt_Bombers/) by Narfox LLC. Uses [FlatRedBall](https://flatredball.com/) and [Gum](http://docs.flatredball.com/gum/)


### What is coming in the next year:

* 3.8.3 Release
* Smoother macOS installation support and Content Pipeline
* The `MonoGame.Framework.Native` backend is going to be a principal focus. The plan is to allow the support of NativeAOT on all the platforms can which support it.
* Effect compiler refactored to support modern tools.
* Improved Content pipeline
  * Automating XNB builds to make using MGCB or the content editor optional, and adding content more easily to projects
* New **DirectX 12** Desktop platform which shares code with Xbox (may replace DX11 at some point).
* New **Vulkan** Desktop platform (it may replace OpenGL at some point).

* #### More bounties:

  * Graphics
    * Optimise and fix DesktopVK
  * Content
    * Native Texture Compression and Asset processing shared object
    * Upgrade Shader Compiler
      * Why: retiring mojoshader to allow future improvements on shaders
  * Audio
    * FAudio implementation for DesktopVK
      * Why: replace OpenAL-Soft which can’t be totally XAudio-accurate
  * Tutorials and content
    * Advanced 3D concepts
    * Custom Effects
      * Culling
      * Shadows
      * Post Processing
      * Scene Management?
      * Deferred Rendering
      * More shader guidance/samples
    * 3D StartKit

{% include 'partials/_blog_footer.njk' %}