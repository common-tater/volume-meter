var volumemeter = require('../')
var getusermedia = require('getusermedia')

var left = document.querySelector('.left')
var right = document.querySelector('.right')

getusermedia({ audio: true, video: false }, function (err, stream) {
  if (err) return console.error(err)

  var ctx = new AudioContext
  
  var leftmeter = volumemeter(ctx, function (volume) {
    left.style.height = volume + '%'
  })

  var rightmeter = volumemeter(ctx, function (volume) {
    right.style.height = volume + '%'
  })

  var split = ctx.createChannelSplitter()
  split.connect(leftmeter, 0, 0)
  split.connect(rightmeter, 1, 0)
  
  var src = ctx.createMediaStreamSource(stream)
  src.connect(split)
  src.connect(ctx.createGain())

  stream.onended = function () {
    leftmeter.stop()
    rightmeter.stop()
  }
})
