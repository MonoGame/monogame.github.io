---
title: A Year in Review
date: "2024-12-01"
excerpt: Details about the educational release of Old School Adventure
tags: foundation, source, educational
author:  MonoGame Foundation
image: /images/blog/cover/monogame_foundation.png
ogImage: /images/blog/cover/monogame_foundation.png
---

# What a year it's been!

It has been a year since we announced that we received a very generous donation from Re-Logic and the formation of the MonoGame Foundation. A lot has happened.

### So far in the last year we:

* Now have recurring subscriptions (Patreon, Github & PayPal) of almost $2000 a month
* Refreshed the website, with more focus on the creators and their titles \- Thanks Chris (ArisTurtle)  
* Overhauled the documentation site and increased the content by more than 500%, with even more to come  
* Released 3.8.2

* #### Appointed to the board

  * President \- Dean Ellis  
  * Chairman \- Marko Jeremic  
  * Secretary \- Simon Jackson  
  * Banking \- Tom Spilman  
  * Member \- Thomas Altenburger  
  * Treasurer \- Dominique Louis  
  * Please read our [Board Meeting notes](https://monogame.net/blog/meeting)  
* Regular board meetings with full transparency, keeping the community involved in the plans and actions for MonoGame to take it into the next decade.

* #### Completed Bounties

  * [Package up ffmpeg and ffprobe](https://github.com/MonoGame/MonoGame/issues/8241)  
  * [Upgrade MonoGame to use BasisUniversal for cross-platform Texture Compression](https://github.com/MonoGame/MonoGame/issues/8419)  
  * [A shared base for public and console repos](https://github.com/MonoGame/MonoGame/issues/8242)  
  * [Implement the Direct3D 12 / GDK/GDKX backend \#8195](https://github.com/MonoGame/MonoGame/issues/8195)

* #### In Progress Bounties

  * [Switch the console runtime from BRUTE to NativeAOT \#8194](https://github.com/MonoGame/MonoGame/issues/8194)  
  * [A better 2D onboarding tutorial \#8317](https://github.com/MonoGame/MonoGame/issues/8317)  
  * [A better 3D onboarding tutorial \#8318](https://github.com/MonoGame/MonoGame/issues/8318)

* #### More bounties to come in the areas of:

  * Graphics  
    * Optimise and fix DesktopVK  
      * Why: it is still experimental and there is some unexpected flickers  
  * Content  
    * Native Texture Compression and Asset processing shared object  
      * Why: enhance assets processing performance and reduce dependencies  
    * Upgrade Shader Compiler to use [https://github.com/microsoft/ShaderConductor](https://github.com/microsoft/ShaderConductor) and [https://github.com/KhronosGroup/SPIRV-Cross](https://github.com/KhronosGroup/SPIRV-Cross)	  
      * Why: retiring mojoshader to allow future improvements on shaders  
  * Audio  
    * FAudio implementation for DesktopVK  
      * Why: replace OpenAL-Soft which can’t be totally XAudio-accurate  
  * Tutorials and content  
    * Advanced 3D concepts (Some ideas I know this isn’t a planning doc)  
      * Custom Effects   
      * Culling  
      * Shadows  
      * Post Processing  
      * Scene Management?  
      * Deferred Rendering  
      * More starter kits for 2D and 3D  
      * More shader guidance/samples

* #### Bug Fixes and Enhancements

  * Re-enabled the Unit Tests for PR’s.  
  * [Upgrade Mac Editor to net8.0-macos. Upgrade Eto.Forms](https://github.com/MonoGame/MonoGame/pull/8505)   
  * Fix Issues with OpenAL Panning on DesktopGL and Mobile  [https://github.com/MonoGame/MonoGame/pull/8480](https://github.com/MonoGame/MonoGame/pull/8480) and [https://github.com/MonoGame/MonoGame/pull/8466](https://github.com/MonoGame/MonoGame/pull/8466)
  * [Detect GamePad/Keyboard events on Android](https://github.com/MonoGame/MonoGame/pull/8465)
  * [Remove string allocations when calling GamePad.GetCapabilities](https://github.com/MonoGame/MonoGame/pull/8453)
  * [Content Pipeline now works on M1/M2 Macs](https://github.com/MonoGame/MonoGame/pull/8570)
  * [Fix Android MediaPlayer Song implementation](https://github.com/MonoGame/MonoGame/pull/8583)
  * [Update MonoGame.Library.OpenAL to 1.23.1.10](https://github.com/MonoGame/MonoGame/pull/8560)
  * [Fix Sprite font multi byte parsing](https://github.com/MonoGame/MonoGame/pull/8554)
  * [Added Vibration and Caps to Native GamePad API](https://github.com/MonoGame/MonoGame/pull/8520)
  * [Fix MacOS Content directory location](https://github.com/MonoGame/MonoGame/pull/8479)
  * [Detect GamePad/Keyboard events on Android](https://github.com/MonoGame/MonoGame/pull/8465)

* #### Game Released (that we know of)
  * [Breeze & Freeze](https://msiebenmann.itch.io/breeze-and-freeze) by msiebenmann
  * [Tic Tac Dough](https://ms00.itch.io/tic-tac-dough) by MS00
  * [Ninja Cat Remewstered](https://pixelshock.itch.io/ninja-cat-remewstered) by Pixel Shock
  * [Smack 'n' Snatch](https://skyyyla.itch.io/smack-n-snatch) by Skyla
  * [FishGrid](https://shmellyorc.itch.io/fishgrid) by Shmellyorc
  * [Mochi's Escape](https://anonames-lair.itch.io/mochi-escape) by Anonames
  * [Armored Crucible: The Crimson Dunes](https://fontty.itch.io/ac-tcd) by Fontty Games
  * [Arid Arnold](https://icefish-software.itch.io/arid-arnold) by IceFish Software
  * [Dungeon Adventure Gang](https://store.steampowered.com/app/2147690/Dungeon_Adventure_Gang/) by DAG Team
  * [Cranky Chibi Cthulhu](https://little-tlaloc-interactive.itch.io/cranky-chibi-cthulhu) by Little Tlaloc Interactive. Uses [FlatRedBall](https://flatredball.com/) and [Gum](http://docs.flatredball.com/gum/)
  * [BattleCrypt Bombers](https://store.steampowered.com/app/2188930/BattleCrypt_Bombers/) by Narfox LLC. Uses [FlatRedBall](https://flatredball.com/) and [Gum](http://docs.flatredball.com/gum/)


### What is coming in the next year:

* #### 3.8.3 Release

  * Smoother macOS installation support and Content Pipeline  
  * Bump to use latest StbImageSharp  
  * more????  
* The MonoGame.Framework.Native is going to be a principal focus. The plan is to allow the support of NativeAOT on all the platforms which support it.   
* Upgrading the Shader Compiler to support more modern shader models.   
* Improved Content pipeline (Mr H / Harry, details)  
  * Automating XNB builds to make using MGCB or the content editor optional, and adding content more easily to projects  
* Full DX12 support on Windows / Xbox  
* Vulkan support to replace OpenGL (Tom to clarify)

{% include 'partials/_blog_footer.njk' %}