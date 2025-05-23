//calculadora fisica 

// ecuaciones ;b
const equations = {
  velocity: {
    formula: (d, t) => d / t,
    variables: ["d", "t"],
    unit: "m/s"
  },
  acceleration: {
    formula: (dv, dt) => dv / dt,
    variables: ["dv", "dt"],
    unit: "m/s²"
  },
  force: {
    formula: (m, a) => m * a,
    variables: ["m", "a"],
    unit: "N" // Newtons
  },
  work: {
    formula: (F, d, theta) => F * d * Math.cos(theta * Math.PI / 180),
    variables: ["F", "d", "theta"],
    unit: "J" // Julios
  },
  kinetic: {
    formula: (m, v) => 0.5 * m * v * v,
    variables: ["m", "v"],
    unit: "J"
  },
  potential: {
    formula: (m, g, h) => m * g * h,
    variables: ["m", "g", "h"],
    unit: "J"
  },
  density: {
    formula: (m, V) => m / V,
    variables: ["m", "V"],
    unit: "kg/m³"
  },
  pressure: {
    formula: (F, A) => F / A,
    variables: ["F", "A"],
    unit: "Pa" // Pascales
  },
  charge: {
    formula: (I, t) => I * t,
    variables: ["I", "t"],
    unit: "C" // Coulombs
  },
  ohm: {
    formula: (I, R) => I * R,
    variables: ["I", "R"],
    unit: "V" // Voltios
  },
};

// Referencias a elementos del DOM
const equationSelect = document.getElementById("equationSelect");
const inputsContainer = document.getElementById("inputsContainer");
const resultDiv = document.getElementById("result");

// aca se muestran los inputs c:
equationSelect.addEventListener("change", () => {
  const selected = equationSelect.value;
  inputsContainer.innerHTML = "";

  if (equations[selected]) {
    equations[selected].variables.forEach(variable => {
      const input = document.createElement("input");
      input.type = "number";
      input.placeholder = variable;
      input.id = variable;
      inputsContainer.appendChild(input);
    });
  }
});

// en este apartado calculamos los resultados :D
function calculate() {
  const selected = equationSelect.value;

  if (!equations[selected]) return;

  const values = equations[selected].variables.map(id => parseFloat(document.getElementById(id).value));
  if (values.some(isNaN)) {
    resultDiv.textContent = "Por favor completa todos los campos correctamente.";
    return;
  }

  const result = equations[selected].formula(...values);
  const unit = equations[selected].unit || "";
  resultDiv.textContent = "Resultado: " + result.toFixed(3) + " " + unit;
}