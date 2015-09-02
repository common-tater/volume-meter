var raf = require('raf');

module.exports = VolumeMeter

function VolumeMeter (context, opts, onenterframe) {
  if (typeof opts === 'function') {
    onenterframe = opts
    opts = null
  }
  opts = opts || {}
  opts.fftSize = opts.fftSize || 32
  opts.tweenIn = opts.tweenIn || 1.618
  opts.tweenOut = opts.tweenOut || opts.tweenIn * 3

  var buffer, self = this
  var range, next, tween, handle, last = 0
  var analyser = context.createAnalyser()

  analyser.stop = function () {
    this.ended = true
    raf.cancel(handle)
  }

  // the fftSize property governs the sample size even
  // when we are not requesting frequency domain data
  analyser.fftSize = opts.fftSize
  buffer = new Uint8Array(opts.fftSize)

  function render () {
    if (analyser.ended) return

    analyser.getByteTimeDomainData(buffer)
    range = getDynamicRange(buffer) * (Math.E - 1)
    next = Math.floor(Math.log1p(range) * 100)
    tween = next > last ? opts.tweenIn : opts.tweenOut
    next = last = last + (next - last) / tween

    onenterframe(next)
    handle = raf(render)
  }

  render()

  return analyser
}

function getDynamicRange(buffer) {
  var len = buffer.length
  var min = 128
  var max = 128

  for (var i = 0; i < len; i++) {
    var sample = buffer[i]
    if (sample < min) min = sample
    else if (sample > max) max = sample
  }

  return (max - min) / 255
}
