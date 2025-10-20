---
title: MonoGame 3.8.4.1 update patch
date: "2025-10-20"
excerpt: In response to the Google Policy changes and iOS updates, the Foundation is releasing a patch to 3.8.4 to update project compliance
tags: announcements
author: MonoGame Foundation
image: /images/blog/cover/monogame_foundation.png
ogImage: /images/blog/cover/monogame_foundation.png
---

## The 3.8.4.1 Patch release

In response to changes at Google and iOS alike, the MonoGame Foundation is releasing a patch update to the 3.8.4 release to address some key policy changes by Apple and Google.

Namely:

- Google 16kb policy update - requiring all published applications to comply with the new policy by 1st November. This includes all dependencies a project uses.
- Various iOS updates and minimum app version updates (plus changes to the native API)

::: note Only affects mobile builds
If you are solely targeting Desktop or Console builds, this update will not affect you, the 3.8.4.1 patch only contains fixes required for Android and iOS distribution.
:::

## Upgrade guide - required reading

The MonoGame Foundation has updated the [MonoGame 3.8.x upgrade guide](https://docs.monogame.net/articles/migration/migrate_38.html) for the 3.8.4.1 release should developers wish ot need to upgrade, it includes checks to make on existing projects for the upgrade, including some edits to the `csproj` definitions to remove elements that are no longer required, specifically the `RestoreDotNetTools` section which is no longer required.

::: note Some projects REQUIRE this removal as it prevents building
In a small number of cases, updating to `3.8.4.1` may prevent building the project, removing the `RestoreDotNetTools` section in the `csproj` resolves this issue.
:::

This is a further continuation of the work to simplify projects and ensure they function as expected.

## DotNet and template updates

Additionally in order to comply with the Google policy updates (and iOS fixes), projects are **REQUIRED** to also update to DotNet 9:

```xml
<TargetFramework>net9.0</TargetFramework>
```

This should be applied to ANY Android or iOS client project and any dependencies such as class libraries to be safe.

::: warning All dependencies MUST be compliant
MonoGame has gone through rigorous testing to ensure that both DotNet 9 and any MonoGame dependencies (primarily OpenAL) are up to date and compliant with the recent policy changes.  However, this also applies to any other dependencies in your client project, so best to check before submitting updates to the stores.
:::

The MonoGame templates have also all be updated to use DotNet 9 from 3.8.4.1, this is only a recommendation (unlike Android / iOS which are MANDATORY) and you can downgrade to DotNet 8 if you wish, or even update to DotNet 10 when it is available, it will have no impact on the MonoGame Framework.

## Checking your Android app compliance

A handy PowerShell script and instructions has been made available by Simon Jackson, in a GitHub gist, including instructions for how to test your compiled APK/AAB package for compliant libraries, full details below:

> ### [GitHub Gist for Android Policy checking](https://gist.github.com/SimonDarksideJ/d42e73c0030114b6370ef1dc0c0d94dd)

Another user has also commented on the Gist with a tool that does all the unpacking and verification for you, but this has not been tested by Simon.  Use at your discretion.

## Feedback

Any feedback or questions should be directed to the [MonoGame Discord Forum here](https://discord.com/channels/355231098122272778/1429828570993266778)

{% include 'partials/_blog_footer.njk' %}
