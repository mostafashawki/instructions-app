// Creates i-v data as measured in a solar simulator
// See  https://www.pveducation.org/pvcdrom/solar-cell-operation/iv-curve for details on i-v characteristics for solar cells

const { round, randomInt, randomFloat } = require('../utils/utils.js');

exports.createDataIV = () => {
  const e = 1.62e-19;
  const k_B = 1.381e-23;

  let T = 300; // temperature in K
  let n = randomFloat(0.8, 1.3); // ideality factor
  let I_L = randomFloat(2, 4.5); // light generated current in A
  let I_0 = 10 ** randomInt(-5, -10); // dark generated current in A
  let R_sh = 10 ** randomInt(0, 4); // Shunt resistance in Ohm
  let area = 100; // solar cell area in cm²

  let voltages = [];
  let current_densities = [];
  for (let v = 0; v <= 1; v += 0.01) {
    const j = (1000 * (I_L - I_0 * Math.exp((e * v) / (n * k_B * T) - v / R_sh))) / area;
    voltages.push(round(v, 3));
    current_densities.push(round(j, 3));
  }

  let j_sc, v_oc, ff, eta, j_mpp, v_mpp;
  current_densities.forEach((j, index) => {
    if (index === 0) {
      j_sc = j;
    }
    if (index < current_densities.length - 1) {
      const v = voltages[index];
      if (j >= 0 && current_densities[index + 1] < 0) {
        v_oc = v;
      }
      if (
        index > 0 &&
        voltages[index - 1] * current_densities[index - 1] < v * j &&
        voltages[index + 1] * current_densities[index + 1] < v * j
      ) {
        v_mpp = v;
        j_mpp = j;
      }
    }
    ff = round((v_mpp * j_mpp) / (v_oc * j_sc), 3);
    eta = round((v_oc * j_sc) / ff, 3);
  });

  return {
    iv: {
      voltages,
      current_densities,
    },
    j_sc,
    v_oc,
    ff,
    eta,
    j_mpp,
    v_mpp,
  };
};
