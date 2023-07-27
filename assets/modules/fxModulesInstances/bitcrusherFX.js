import SliderParameters from "../audioModulesAndComponents/sliderParameters.js";
import ButtonSwitch from "../audioModulesAndComponents/buttonSwitch.js";
import BitCrusherFXModule from "../fxModuleObjectConstructors/bitcrusherFXModule.js";

// FX Module Setup
const bitcrusherModule = document.getElementById("bitcrusher-module");

// slider constructor: (id, min, max, step, value, label, moduleContainer)
const bitcrusherInputGain = new SliderParameters(
  "inputGain",
  0.01,
  20,
  0.01,
  3,
  "gain",
  bitcrusherModule
);

const bitcrusherBits = new SliderParameters(
  "bits",
  1,
  8,
  1,
  4,
  "bits",
  bitcrusherModule
);

const bitcrusherMidBoost = new SliderParameters(
  "midGain",
  -10,
  10,
  0.01,
  0,
  "tone",
  bitcrusherModule
);

// BitcrusherFXModule constructor: (id, title, colour, inputGain, bits, lowGain, midGain, highGain, lowFrequencyThreshold, highFrequencyThreshold, outputGain, wetDryMix)
const bitcrusherFX = new BitCrusherFXModule(
  "bitcrusher-module",
  "bitcrusher",
  "darkgray",
  bitcrusherInputGain.value,
  bitcrusherBits.value,
  5,
  bitcrusherMidBoost.value,
  0.3,
  80,
  5000,
  1,
  1
);

bitcrusherInputGain.sliderElement.addEventListener("input", () => {
  bitcrusherFX.setParameter("inputGain", bitcrusherInputGain.value);
});

bitcrusherBits.sliderElement.addEventListener("input", () => {
  bitcrusherFX.setParameter("bits", bitcrusherBits.value);
});

bitcrusherMidBoost.sliderElement.addEventListener("input", () => {
  bitcrusherFX.setParameter("midGain", bitcrusherMidBoost.value);
});

// button constructor: (callback, module)
// const is calling the constructor from the buttonSwitch.js file
const bitcrusherSwitch = new ButtonSwitch((state) => {
  if (!state) {
    bitcrusherFX.disconnect();
  } else {
    //
  }
}, bitcrusherModule);

export { bitcrusherFX, bitcrusherSwitch };
