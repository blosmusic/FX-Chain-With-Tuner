import SliderParameters from "../audioModulesAndComponents/sliderParameters.js";
import ButtonSwitch from "../audioModulesAndComponents/buttonSwitch.js";
import CompressorFXModule from "../fxModuleObjectConstructors/compressorFXModule.js";

// FX Module Setup
const compressorModule = document.getElementById("compressor-module");

// slider constructor: (id, min, max, step, value, label, moduleContainer)
const inputGainValue = new SliderParameters(
  "input",
  0,
  20,
  0.01,
  5,
  "input",
  compressorModule
);  

const thresholdValue = new SliderParameters(
  "threshold",
  -70,
  -10,
  0.01,
  -24,
  "threshold",
  compressorModule
);

// compressorFXModule constructor: id, title, colour, inputGain, attack, knee, ratio, release, threshold, outputGain
const compressorFX = new CompressorFXModule(
  "compressor-module",
  "compressor",
  "slategray",
  inputGainValue.value,
  0.003,
  40,
  3,
  0.25,
  thresholdValue.value,
  1
);

// slider event listeners
inputGainValue.sliderElement.addEventListener("input", () => {
  compressorFX.setParameter("input", inputGainValue.value);
});

thresholdValue.sliderElement.addEventListener("input", () => {
  compressorFX.setParameter("threshold", thresholdValue.value);
});

// button constructor: (callback, module)
// const is calling the constructor from the buttonSwitch.js file
const compressorSwitch = new ButtonSwitch((state) => {
    if (!state) {
        compressorFX.disconnect();
    } else {
        //
    }
}, compressorModule);

export { compressorFX, compressorSwitch };