import SliderParameters from "../audioModulesAndComponents/sliderParameters.js";
import ButtonSwitch from "../audioModulesAndComponents/buttonSwitch.js";
import ChorusFXModule from "../fxModuleObjectConstructors/chorusFXModule.js";

// FX Module Setup
const chorusModule = document.getElementById("chorus-module");

// slider constructor: (id, min, max, step, value, label, moduleContainer)
const chorusRate = new SliderParameters(
  "frequency",
  0.1,
  10,
  0.01,
  5,
  "rate",
  chorusModule
);

const chorusDelay = new SliderParameters(
  "delayTime",
  0.1,
  1,
  0.01,
  0.5,
  "delay",
  chorusModule
);

const chorusDepth = new SliderParameters(
  "depth",
  0,
  1,
  0.01,
  0.5,
  "depth",
  chorusModule
);

// ChorusFXModule constructor: id, title, colour, inputGain, frequency, delayTime, depth, type, spread, wet, outputGain
const chorusFX = new ChorusFXModule(
  "chorus-module",
  "chorus",
  "purple",
  1,
  chorusRate.value,
  chorusDelay.value,
  chorusDepth.value,
  "sine",
  180,
  1,
  1
);

chorusRate.sliderElement.addEventListener("input", () => {
  chorusFX.setParameter("frequency", chorusRate.value);
});

chorusDelay.sliderElement.addEventListener("input", () => {
  chorusFX.setParameter("delayTime", chorusDelay.value);
});

chorusDepth.sliderElement.addEventListener("input", () => {
  chorusFX.setParameter("depth", chorusDepth.value);
});

// button constructor: (callback, module)
// const is calling the constructor from the buttonSwitch.js file
const chorusSwitch = new ButtonSwitch((state) => {
  if (!state) {
    chorusFX.disconnect();
  } else {
    //
  }
}, chorusModule);

export { chorusSwitch, chorusFX };
