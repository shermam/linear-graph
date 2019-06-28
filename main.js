linearGraph.config({
  container: document.querySelector("div#container"),
  scaleRange: {
    left: 0,
    right: 100
  },
  acceptableRange: {
    left: 10,
    right: 60
  },
  acceptableRangeColor: "#22FF99",
  unacceptableRangeColor: "#FF9999",
  valueColor: "#FFFFFF",
  targetColor: "#000000",
  target: 40,
  targetWidth: 2,
  initialValue: 50
});

// Roda um interval chamando o update setando um valor simulado
var count = 0;
setInterval(function() {
  var valorSimulado = Math.sin((count += 0.01)) * 40 + 50;

  // Chama o update da biblioteca inventada
  linearGraph.update(valorSimulado);
}, 16);
