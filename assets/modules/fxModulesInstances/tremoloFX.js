import SliderParameters from "../audioModulesAndComponents/sliderParameters.js";
import ButtonSwitch from "../audioModulesAndComponents/buttonSwitch.js";
import TremoloFXModule from "../fxModuleObjectConstructors/tremoloFXModule.js";

// FX Module Setup
const tremoloModule = document.getElementById("tremolo-module");

// slider constructor: (id, min, max, step, value, label, moduleContainer)
const tremoloRate = new SliderParameters(
    "frequency",
    0.1,
    10,
    0.01,
    5,
    "rate",
    tremoloModule
);

const tremoloDepth = new SliderParameters(
    "depth",
    0,
    1,
    0.01,
    0.5,
    "depth",
    tremoloModule
);

// TremoloFXModule constructor: id, title, colour, inputGain, frequency, type, depth, spread, wet, outputGain
const tremoloFX = new TremoloFXModule(
    "tremolo-module",
    "tremolo",
    "aquamarine",
    1,
    tremoloRate.value,
    "sine",
    tremoloDepth.value,
    180,
    1,
    1
);

tremoloRate.sliderElement.addEventListener("input", () => {
    tremoloFX.setParameter("frequency", tremoloRate.value);
}
);

tremoloDepth.sliderElement.addEventListener("input", () => {
    tremoloFX.setParameter("depth", tremoloDepth.value);
}
);

// ButtonSwitch constructor: (id, label, moduleContainer)
const tremoloSwitch = new ButtonSwitch((state) => {
    if (!state) {
    tremoloFX.disconnect();
  } else {
    //
  }
}, tremoloModule);

export { tremoloFX, tremoloSwitch };