import SliderParameters from "../audioModulesAndComponents/sliderParameters.js";
import ButtonSwitch from "../audioModulesAndComponents/buttonSwitch.js";
import DelayFXModule from "../fxModuleObjectConstructors/delayFXModule.js";

// FX Module Setup
const delayModule = document.getElementById("delay-module");

// slider constructor: (id, min, max, step, value, label, moduleContainer)
const delayTime = new SliderParameters(
  "delayTime",
  0.1,
  1,
  0.01,
  0.5,
  "delay",
  delayModule
);

const delayFeedback = new SliderParameters(
  "feedback",
  0,
  1,
  0.01,
  0.5,
  "feedback",
  delayModule
);

const delayWetDryMix = new SliderParameters(
  "wetDryMix",
  0,
  1,
  0.01,
  0.5,
  "mix",
  delayModule
);

// DelayFXModule constructor: id, title, colour, inputGain, delayTime, feedback, maxDelayTime, wetDryMix, outputGain
const delayFX = new DelayFXModule(
  "delay-module",
  "delay",
  "brown",
  1,
  delayTime.value,
  delayFeedback.value,
  1,
  delayWetDryMix.value,
  1
);

delayTime.sliderElement.addEventListener("input", () => {
  delayFX.setParameter("delayTime", delayTime.value);
});

delayFeedback.sliderElement.addEventListener("input", () => {
  delayFX.setParameter("feedback", delayFeedback.value);
});

delayWetDryMix.sliderElement.addEventListener("input", () => {
  delayFX.setParameter("wet", delayWetDryMix.value);
});

// button constructor: (callback, module)
// const is calling the constructor from the buttonSwitch.js file
const delaySwitch = new ButtonSwitch((state) => {
  if (!state) {
    delayFX.disconnect();
  } else {
    //
  }
}, delayModule);

export { delayFX, delaySwitch };
