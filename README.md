# go-loader-dir

[![npm](https://img.shields.io/npm/v/go-loader-dir.svg?style=flat-square)](https://www.npmjs.com/package/go-loader-dir)
[![Travis](https://img.shields.io/travis/gocli/go-loader-dir.svg?style=flat-square)](https://travis-ci.org/gocli/go-loader-dir)
[![Coveralls](https://img.shields.io/coveralls/github/gocli/go-loader-dir.svg?style=flat-square)](https://coveralls.io/github/gocli/go-loader-dir)
[![Vulnerabilities](https://snyk.io/test/github/gocli/go-loader-dir/badge.svg?style=flat-square)](https://snyk.io/test/github/gocli/go-loader-dir)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-green.svg?style=flat-square)](https://github.com/gocli/go-loader-dir)

[Go](https://www.npmjs.com/package/go) loader for local files

## Usage

```bash
$ npm install --global go go-loader-dir
$ go dir boilerplate/directory/path destination/path
```

## Options

```bash
$ go dir <source> <destination> [options]
```

- `source` — valid source path
- `destination` — folder path to put loaded files (destination folder will be created if it doesn't exist)
- `options`:
  - `--no-install` — do not install boilerplate after loading

## License

MIT © Stanislav Termosa <termosa.stanislav@gmail.com> (https://me.st)

