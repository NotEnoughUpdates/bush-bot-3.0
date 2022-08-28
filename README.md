<!-- markdownlint-disable-file MD010 MD033 MD041 -->

<a href="https://discord.com/api/oauth2/authorize?client_id=767478359348740148&permissions=5368709119918&scope=bot%20applications.commands">
    <h1 align="center">BushBot</h1>
</a>

<div align="center">
    <!-- lint -->
    <a href="https://github.com/NotEnoughUpdates/bush-bot/actions">
        <img src="https://img.shields.io/github/workflow/status/NotEnoughUpdates/bush-bot/lint/master?style=normal" target="_blank">
    </a>
    <!-- code factor -->
    <a href="https://www.codefactor.io/repository/github/notenoughupdates/bush-bot">
        <img src="https://www.codefactor.io/repository/github/notenoughupdates/bush-bot/badge" alt="CodeFactor" />
    </a>
    <!-- language -->
    <a href="https://github.com/NotEnoughUpdates/bush-bot/">
        <img src="https://img.shields.io/github/languages/top/NotEnoughUpdates/bush-bot?&color=informational&logo=GitHub">
    </a>
    <!-- lines -->
    <a href="https://github.com/NotEnoughUpdates/bush-bot/graphs/code-frequency" target="_blank">
        <img src="https://img.shields.io/tokei/lines/github/NotEnoughUpdates/bush-bot?label=lines&color=informational&logo=GitHub" alt="lines">
    </a>
    <!-- license -->
    <a href="https://github.com/NotEnoughUpdates/bush-bot/blob/master/LICENSE" target="_blank">
        <img src="https://img.shields.io/badge/license-CC--BY--NC--SA--4.0-informational?logo=GitHub" alt="license">
    </a>
    <!-- contributors -->
    <a href="https://github.com/NotEnoughUpdates/bush-bot/graphs/contributors" target="_blank">
        <img src="https://img.shields.io/github/contributors/NotEnoughUpdates/bush-bot?color=informational&logo=GitHub" alt="contributors">
    </a>
    <!-- TODO: guild count and invite -->
    <!-- <a href="https://discord.gg/moulberry" target="_blank">
        <img src="https://img.shields.io/discord/516977525906341928?label=discord&color=informational&logo=Discord&logoColor=FFFFFF" alt="discord">
    </a> -->
</div>

BushBot is an open-sourced multi-purpose moderation, and leveling bot.

<h2 align="center">Set Up</h2>

<h3>Prerequisites</h3>

- <a href="https://nodejs.org/en/">Node.JS</a> v18.0.0+
- <a href="https://yarnpkg.com/getting-started/install">Yarn</a>
- <a href="https://git-scm.com/">git</a>
- <a href="https://discord.com/developers/applications">A discord bot to use</a>

<h3>Steps</h3>

- Clone the repo
- Install the dependencies with `yarn`
- Copy the `config/example-options.ts` to `config/options.ts`
- Create `lib/badlinks-secret.ts` exporting an empty array (`export default []`)
- Edit the `options.ts` with your credentials
- Start the bot with `yarn start`

<h2 align="center">Contributing</h2>
If you would like to contribute to the bot feel free to open a pull request and one of the devs will look at it.

<h2 align="center">Credits</h2>

- <a href="https://discord.js.org/">discord.js</a> - The main library used to interface with discord
- <a href="https://github.com/NotEnoughUpdates/discord-akairo">discord-akairo</a> - The framework the bot is built on
