# volume-meter
Renders the dynamic range of a [`MediaStream`](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream) waveform slice as a percentage in a [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame) callback.

[![npm](http://img.shields.io/npm/v/volume-meter.svg?style=flat-square)](http://www.npmjs.org/volume-meter)

## Why
Not a particularly complicated task, but it required more code than I had expected. Also being able to control how the output is tweened (in and out independently!) allows you to get a custom look and feel pretty easily 😎.

## How
[Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)'s [`AnalyserNode#getByteTimeDomainData()`](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode.getByteTimeDomainData)

## Example
```javascript
var volumemeter = require('volume-meter')
var getusermedia = require('getusermedia')

var ctx = new AudioContext()
var el = document.querySelector('.meter')

var meter = volumemeter(ctx, { tweenIn: 2, tweenOut: 6 }, function (volume) {
  el.style.height = volume + '%'
})

getusermedia({ audio: true, video: false }, function (err, stream) {
  if (err) return console.error(err)
  
  var src = ctx.createMediaStreamSource(stream)
  src.connect(meter)
  src.connect(ctx.destination)
  stream.onended = meter.stop.bind(meter)
})
```
A slightly more full featured example can be found [here](https://github.com/jessetane/volume-meter/tree/master/example). You can run it by doing:
```bash
$ npm run example
```

## Install
```bash
$ npm install volume-meter
```

## Require
#### `var volumemeter = require('volume-meter')`

## Constructor
#### `var meter = volumemeter(context, [opts], onenterframe)`

## Instance methods
#### `meter.stop()`

## Releases
The latest stable release is published to [npm](http://npmjs.org/volume-meter).
* [1.0.0](https://github.com/jessetane/volume-meter/archive/1.0.0.tar.gz)
 * First pass.

## License
Copyright © 2014 Jesse Tane <jesse.tane@gmail.com>

This work is free. You can redistribute it and/or modify it under the
terms of the [WTFPL](http://www.wtfpl.net/txt/copying).

No Warranty. The Software is provided "as is" without warranty of any kind, either express or implied, including without limitation any implied warranties of condition, uninterrupted use, merchantability, fitness for a particular purpose, or non-infringement.
