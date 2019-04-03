# stratum-assistant [<img src="https://github.com/chevalvert.png?size=100" align="right">](http://chevalvert.fr/)
**[Stratum](https://github.com/chevalvert?q=stratum)** setup and mapping assistant

<br>

## [Stratum](https://github.com/chevalvert?q=stratum) ecosystem
- [`stratum`](https://github.com/chevalvert/stratum/) : Stratum main app
- `stratum-assistant` : Stratum setup and mapping assistant
- [`stratum-hnode`](https://github.com/Hemisphere-Project/STRATUM) : leds UDP server + client
- [`stratum-viewer`](https://github.com/chevalvert/stratum-viewer) : Stratum `hnode` 3D previewer
- [`stratum-documentation`](https://github.com/chevalvert/stratum-documentation) : Stratum hardware, hookup & misc guides

## Installation
```sh
$ git clone https://github.com/chevalvert/stratum-assistant.git stratum-assistant
$ cd stratum-assistant
$ npm install
$ npm link
```

## Usage
### Basic
```sh
$ stratum-assistant "path/to/stratum.mapping.<ENV>.json" --open
```
<sup>`-o, --open` opens the webpage when the server launches.</sup>

### Standby mode
Running `stratum-assistant` with the `--standby` flag will run it in **standby mode**, in which the server will wait for user validation before starting.

This mode allows you to run `stratum-assistant` in parallel with [`stratum`](https://github.com/chevalvert/stratum/) without UDP port conflicts.
```sh
$ stratum-assistant "path/to/stratum.mapping.<ENV>.json" --standby
```
<sup>`stratum-assistant` will effectively start when an user connects to the front-page and click on the _"leave standby mode"_ button, killing any instance of [`stratum`](https://github.com/chevalvert/stratum/) in the process.</sup>

## Development
See [brocessing/`bro-start`](https://github.com/brocessing/bro-start).

## License
[MIT.](https://tldrlegal.com/license/mit-license)
