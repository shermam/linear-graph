// @ts-check

(function(w, d) {
  "use strict";

  var _config = null;

  /** @type HTMLElement */
  var _container = null;
  var _canvas = d.createElement("canvas");
  var _context = _canvas.getContext("2d");

  w["linearGraph"] = {
    config: function(config) {
      _config = config;
      _container = config.container;
      _canvas.width = _container.clientWidth;
      _canvas.height = _container.clientHeight;
      _container.appendChild(_canvas);
      update(config.initialValue, config);
    },
    update: update
  };

  function update(value, config) {
    config = config || _config;
    drawGraph();
    drawRuler();
    drawtarget();
    drawValue(value);
  }

  function drawValue(value) {
    var height = _canvas.height * 0.2;
    var width = mapRange(value);
    var x = 0;
    var y = _canvas.height * 0.3;

    rect(x, y, width, height, _config.valueColor);
    strokeRect(x, y, width, height, "#000000");
  }

  function drawtarget() {
    var height = _canvas.height * 0.6;
    var width = mapRange(_config.targetWidth);
    var x = mapRange(_config.target) - width / 2;
    var y = _canvas.height * 0.1;

    rect(x, y, width, height, _config.targetColor);
  }

  function drawRuler() {
    var height = _canvas.height * 0.2;
    var width = _canvas.width;
    var x = 0;
    var y = _canvas.height - height;

    rect(x, y, width, height, "#CCCCCC");
  }

  function drawGraph() {
    drawUnacceptableRange();
    drawAcceptableRange();
  }

  function drawUnacceptableRange() {
    rect(0, 0, _canvas.width, _canvas.height, _config.unacceptableRangeColor);
  }

  function drawAcceptableRange() {
    var x = mapRange(_config.acceptableRange.left);
    var y = 0;
    var height = _canvas.height;
    var width = mapRange(_config.acceptableRange.right) - x;

    rect(x, y, width, height, _config.acceptableRangeColor);
  }

  function mapNumber(n, fromINI, toINI, fromFIN, toFIN) {
    var scale = (toINI - fromINI) / (toFIN - fromFIN);
    return (n - fromINI) / scale + fromFIN;
  }

  function mapRange(n) {
    return mapNumber(
      n,
      _config.scaleRange.left,
      _config.scaleRange.right,
      0,
      _canvas.width
    );
  }

  function rect(x, y, w, h, color) {
    _context.beginPath();
    _context.fillStyle = color;
    _context.rect(x, y, w, h);
    _context.fill();
    _context.closePath();
  }

  function strokeRect(x, y, w, h, color) {
    _context.beginPath();
    _context.strokeStyle = color;
    _context.rect(x, y, w, h);
    _context.stroke();
    _context.closePath();
  }
})(window, document);
