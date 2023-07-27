import SliderParameters from "../audioModulesAndComponents/sliderParameters.js";
import ButtonSwitch from "../audioModulesAndComponents/buttonSwitch.js";
import AutoWahFXModule from "../fxModuleObjectConstructors/autowahFXModule.js";

// FX Module Setup
const autowahModule = document.getElementById("autowah-module");

// slider constructor: (id, min, max, step, value, label, moduleContainer)
const autowahFrequency = new SliderParameters(
  "baseFrequency",
  5,
  30,
  0.0001,
  10,
  "frequency",
  autowahModule
);

const autowahGain = new SliderParameters(
  "gain",
  0.01,
  10,
  0.01,
  2,
  "gain",
  autowahModule
);

const autowahSensivity = new SliderParameters(
  "sensitivity",
  -100,
  -10,
  0.01,
  -20,
  "sensitivity",
  autowahModule
);

// AutoWahFXModule constructor: id, title, colour, inputGain, q, baseFrequency, gain, octaves, sensitivity, wetDryMix
const autowahFX = new AutoWahFXModule(
  "autowah-module",
  "autowah",
  "fuchsia",
  1,
  3,
  autowahFrequency.value,
  autowahGain.value,
  6,
  autowahSensivity.value,
  1,
  1
);

autowahFrequency.sliderElement.addEventListener("input", () => {
  autowahFX.setParameter("baseFrequency", autowahFrequency.value);
});

autowahGain.sliderElement.addEventListener("input", () => {
  autowahFX.setParameter("gain", autowahGain.value);
});

autowahSensivity.sliderElement.addEventListener("input", () => {
    autowahFX.setParameter("sensitivity", autowahSensivity.value);
});

// button constructor: (callback, module)
// const is calling the constructor from the buttonSwitch.js file
const autowahSwitch = new ButtonSwitch((state) => {
  if (!state) {
    autowahFX.disconnect();
  } else {
    //
  }
}, autowahModule);

export { autowahFX, autowahSwitch };
