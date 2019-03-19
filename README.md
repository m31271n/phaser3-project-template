# Phaser 3 Webpack Project Template

A Phaser 3 project template with ES6 support via [Babel 7](https://babeljs.io/) and [Webpack 4](https://webpack.js.org/) that includes hot-reloading for development and production-ready builds.

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Structure

> Reference [here](https://github.com/jdotrjs/phaser-guides/blob/master/Basics/Part1.md).

Having a consistent approach to identifying where some code or asset should live doesn't magically improve your code. Bugs still happen and code is still messy but it does remove some of the load of navigating your codebase.

### `vendor/`

This directory contains any static code which isn't available through NPM, such as custom build of Phaser or CSS files.

### `assets/`

This directory contains audios, spritesheets, XMLs, fonts, etc.

### `src/`

- `src/scenes/` - one file per scene that my game contains.
- `src/objects/` - store entities that will exist in game.
- `src/components/` - a collection of UI elements that I'll use to display information or interact with the player.
- `src/util/` — helpers that aren't particularly tied to gameplay.

## Available Commands

| Command         | Description                                                                     |
| --------------- | ------------------------------------------------------------------------------- |
| `npm install`   | Install project dependencies                                                    |
| `npm start`     | Build project and open web server running project                               |
| `npm run build` | Builds code bundle with production settings (minification, uglification, etc..) |

## Writing Code

After cloning the repo, run `npm install` from your project directory. Then, you can start the local development server by running `npm start`.

After starting the development server with `npm start`, you can edit any files in the `src` folder and webpack will automatically recompile and reload your server (available at `http://localhost:8080` by default).

## Deploying Code

After you run the `npm run build` command, your code will be built into a single bundle located at `dist/bundle.min.js` along with any other assets you project depended.

If you put the contents of the `dist` folder in a publicly-accessible location (say something like `http://example.com`), you should be able to open `http://example.com/index.html` and play your game.
