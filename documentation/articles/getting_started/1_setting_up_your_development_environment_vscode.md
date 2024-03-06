---
title: Setting up your development environment for VSCode
description: A step-by-step guide for setting up your development environment using VSCode
---

# Setting up your development environment for VSCode

This section provides a step-by-step guide for setting up your development environment on Windows, macOS, and Linux using VSCode as your editor.

> [!NOTE]
> The only development environment that MonoGame officially supports on Linux is [Visual Studio Code](https://code.visualstudio.com/).
>
> [Visual Studio for Mac will be discontinued](https://devblogs.microsoft.com/visualstudio/visual-studio-for-mac-retirement-announcement/) by Microsoft in August 2024.  At that time, [Visual Studio Code](https://code.visualstudio.com/) will be the only development environment supported by MonoGame on macOS.


## Install .NET 8 SDK
To develop with C#, you will need to install the .NET SDK.  At the time of this writing, the current version is .NET 8.0.  You can follow the instructions below based your operating system to install the .NET 8.0 SDK

> [!NOTE]
> The current version of MonoGame (3.8.1.303) targets .NET 6.0.  Regardless you can, and it is recommended to, use .NET 8.0.  The only requirement for having .NET 6.0 installed is if you are developing extensions for the MGCB Editor.

# [Windows](#tab/windows)
1. Navigate to [https://dotnet.microsoft.com/en-us/download](https://dotnet.microsoft.com/en-us/download)

![Download .NET For Windows](./images/1_setting_up_your_development_environment_vscode/download-dotnet-windows.png)

2. Click the **.NET SDK x64** download button to download.  This will take you to the download page where the **dotnet-sdk-8.x.yyy-win-x64.exe** will download.
3. When the download completes, run the **dotnet-sdk-8.x.yyy-win-x64.exe** installer and complete the steps to install .NET on your machine.
4. When the install completes, open a new **Command Prompt** window and run the command `dotnet` to verify the installation was successful.

![Verify Installation](./images/1_setting_up_your_development_environment_vscode/verify-install-windows.png)

# [macOS](#tab/macos)
Placeholder for mac specific content ...

# [Linux](#tab/linux)
1. Open a new **Terminal** window.
2. Enter the following command in the terminal to download the **dotnet-install.sh**

```sh
wget https://dot.net/v1/dotnet-install.sh -O dotnet-install.sh
```

3. Grant permission for the script to execute by entering the following command in the terminal:

```sh
chmod +x ./dotnet-install.sh
```

4. Run the script to install the .NET 8 SDK by entering the following command in the terminal:

```sh
./dotnet-install.sh
```

![.NET Install Script](./images/1_setting_up_your_development_environment_vscode/dotnet-install-script-linux.png)

5. You will now need to setup your environment varaibles so that the `dotnet` command is recognized.  To do this, open the file `~/.bashrc` in a text editor and add the following lines to the end of the file.

```sh
export DOTNET_ROOT=$HOME/.dotnet
export PATH=$PATH:$DOTNET_ROOT:$DOTNET_ROOT/tools
```

![Add Environment Variables](./images/1_setting_up_your_development_environment_vscode/add-environment-variables-linux.png)

6. Save and close the file, close any open terminal windows, then open a new terminal window so the new environment variables are registered.
7. Enter the `dotnet` command to validate that the .NET 8 SDK is now installed.

![Verify Installation](./images/1_setting_up_your_development_environment_vscode/verify-install-linux.png)

---

## Install MonoGame Templates
The .NET SDK installation comes with the default C# project templates, but it does not include the MonoGame templates.  These will need to be installed manually.

# [Windows](#tab/windows)
1. Open a new  **Command Prompt** window and run the following command

```sh
dotnet new install MonoGame.Templates.CSharp
```

![Install MonoGame Templates](./images/1_setting_up_your_development_environment_vscode/install-templates-windows.png)

# [macOS](#tab/macos)
Placeholder for mac specific content ...

# [Linux](#tab/linux)
1. Open a new terminal window and run the following command

```sh
dotnet new install MonoGame.Templates.CSharp
```

![Install MonoGame Templates](./images/1_setting_up_your_development_environment_vscode/install-templates-linux.png)


---

> [!NOTE]
> When installing the templates, you will see an error about the UWP template failing to install.  You can ignore this error, the UWP templates are deprecated and will be removed in a future MonoGame release.

## Install Visual Studio Code

# [Windows](#tab/windows)
1. Open your web browser and navigate to [https://code.visualstudio.com/](https://code.visualstudio.com/).

![Download VSCode](./images/1_setting_up_your_development_environment_vscode/download-vscode-windows.png)

2. Click the **Download for Windows** button.  This will redirect you to the download page where the installer will automatically download.
3. When the download completes, run the installer and complete the steps to install Visual Studio Code.

> [!NOTE]
> On the **Select Additional Tasks** window during installation, it is recommended to check both the **Add "Open with Code" action to WIndows Explorer file context menu** and **Add "Open with Code" action to Windows Explorer directory context menu**.  Doing this will allow you to right-click a file or a directory and select "Open With Code" from the context-menu for quick launching.
>
> ![Open With Code Options](./images/1_setting_up_your_development_environment_vscode/open-with-code-options-windows.png)


# [macOS](#tab/macos)
Placeholder for mac specific content ...

# [Linux](#tab/linux)
The recommended method for installing Visual Studio Code in Linux is to use Snap. This is supported by most Linux distributions.

- [Snap Package](https://code.visualstudio.com/docs/setup/linux#_snap)

There are also individual guides below based on your Linux distrobution if you do not want to use Snap:

- [Debian and Ubuntu base distributions](https://code.visualstudio.com/docs/setup/linux#_debian-and-ubuntu-based-distributions)
- [RHEL, Fedora, and CentOS based distributions](https://code.visualstudio.com/docs/setup/linux#_rhel-fedora-and-centos-based-distributions)
- [openSUSE and SLE-based distributions](https://code.visualstudio.com/docs/setup/linux#_opensuse-and-slebased-distributions)
- [AUR package for Arch Linux](https://code.visualstudio.com/docs/setup/linux#_aur-package-for-arch-linux)
- [Installing .rpm package manually](https://code.visualstudio.com/docs/setup/linux#_installing-rpm-package-manually)

---

## Install Visual Studio Code C# Extensions
Visual Studio Code by itself is just a text editor.  In order to code and build C# projects, you will need to install the Visual Studio Code C# extension.  This extension will provide syntax highlighting, code analysis, intellisense, and other quality of life features when developing with C# in Visual Studio Code.

# [Windows](#tab/windows)
1. Open Visual Studio Code.
2. Click the **Extensions** icon in the **Activity Bar** on the left.

![Click Extensions](./images/1_setting_up_your_development_environment_vscode/click-extensions-windows.png)

3. In the **Search Box** type `C#`.
4. Click **Install** for the **C# Dev Kit** extension.  Installing this will also install the base **C#** extension.

![Click Extensions](./images/1_setting_up_your_development_environment_vscode/install-devkit-windows.png)


# [macOS](#tab/macos)
Placeholder for mac specific content ...

# [Linux](#tab/linux)
1. Open Visual Studio Code.
2. Click the **Extensions** icon in the **Activity Bar** on the left.

![Click Extensions](./images/1_setting_up_your_development_environment_vscode/click-extensions-linux.png)

3. In the **Search Box** type `C#`.
4. Click the **Install** button for the **C# Dev Kit** extension.  Installing this will also install the base **C#** extension.

![Click Extensions](./images/1_setting_up_your_development_environment_vscode/install-devkit-linux.png)

---

## Setup Wine For Effect Compilation
Effect (shader) compilation requires access to DirectX.  This means it will not work natively on macOS and Linux systems, but it can be used through [Wine](https://www.winehq.org/).

# [Windows](#tab/windows)
**Windows users do not require an additional setup for effect compilation and can skip this section.**

# [macOS](#tab/macos)
Placeholder for mac specific content ...

# [Linux](#tab/linux)
MonoGame provides a setup script that can be executed to setup the Wine environment for Effect (shader) compilation.  However, this script has the following prerequists that must first be setup
- **curl** must be installed
- **p7zip** must be installed
- **wine64** must be installed.

For Debian-based distrobutions like Ubuntu, you can perform the following:

1. Open a terminal window
2. Enter the following command

```sh
sudo apt install curl p7zip-full wine64
```

> [!TIP]
> If you receive an error stating that either of the pacakges do not have an install candidate, you may need to enable the universe apt repository.  To do this, enter the following commands in the terminal
>
> ```sh
> sudo add-apt-repository universe
> sudo apt update
> ```
> 
> Then try installing the packages again.

> [!CAUTION]
> If you plan to install Wine using the `winehq-*` package instead, it is recommended that you use the `winehq-stable` package and not `-staging`.

3. Now that the prerequisites are installed, download the [mgfxc_wine_setup.sh](https://raw.githubusercontent.com/MonoGame/MonoGame/master/Tools/MonoGame.Effect.Compiler/mgfxc_wine_setup.sh) script and execute it by entering the following command in the terminal:

```sh
wget -qO- https://raw.githubusercontent.com/MonoGame/MonoGame/master/Tools/MonoGame.Effect.Compiler/mgfxc_wine_setup.sh | bash
```

This will create new directory called `.winemonogame` in your home directory.  If you ever wish to undo the setup this script performed, just simply delete that directory.

---

## Next Up
Visual Studio Code does not have an option within the UI to create a new MonoGame project like you would have in Visual Studio.  In the [Creating a New Project With VSCode](2_creating_a_new_project_vscode.md), we'll go over the steps to create a new MonoGame project when using Visual Studio Code.
