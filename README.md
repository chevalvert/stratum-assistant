# stratum-assistant [<img src="https://github.com/chevalvert.png?size=100" align="right">](http://chevalvert.fr/)

*Stratum setup and mapping assistant.*

<br>
<br>
<br>

## Stratum ecosystem
- [`stratum`](https://github.com/chevalvert/stratum/) : stratum main app
- `stratum-assistant` : stratum setup & mapping assistant
- [`stratum-hnode`](https://github.com/Hemisphere-Project/STRATUM) : leds UDP server + client
- [`stratum-viewer`](https://github.com/chevalvert/stratum-viewer) : alternative UDP client

<br>

## Installation

```sh
$ npm i -g chevalvert/stratum-assistant
```

<br>

## Usage
### Basic mode
```sh
$ stratum-assistant <mapping.json> -o --width=10 --height=9
```
<sup>`-o, --open` opens the webpage when the server launches.</sup>

### Standby mode
Running `stratum-assistant` with the `--standby` flag will run it in **standby mode**, in which the server will wait for user validation before starting.

This mode allows you to run `stratum-assistant` in parallel with [`stratum`](https://github.com/chevalvert/stratum/) without UDP port conflicts.
```sh
$ stratum-assistant <mapping.json> --standby
```
<sup>`stratum-assistant` will effectively start when an user connects to the front-page and click on the _"leave standby mode"_ button.</sup>

<br>

## Development
See [brocessing/`bro-start`](https://github.com/brocessing/bro-start).

<br>

## License
[MIT.](https://tldrlegal.com/license/mit-license)
