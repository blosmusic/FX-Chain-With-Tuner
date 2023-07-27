import SliderParameters from "../audioModulesAndComponents/sliderParameters.js";
import ButtonSwitch from "../audioModulesAndComponents/buttonSwitch.js";
import VolumeFXModule from "../fxModuleObjectConstructors/volumeFXModule.js";

// FX Module Setup
const volumeModule = document.getElementById("volume-module");

// slider constructor: (id, min, max, step, value, label, moduleContainer)
const volumeValue = new SliderParameters(
  "volume",
  -50,
  0,
  0.01,
  0,
  "volume",
  volumeModule
);

// volumeFXModule constructor: id, title, colour, inputGain, volume, outputGain
const volumeFX = new VolumeFXModule(
  "volume-module",
  "volume",
  "slategray",
  1,
  volumeValue.value,
  1
);

// slider event listeners
volumeValue.sliderElement.addEventListener("input", () => {
  volumeFX.setParameter("volume", volumeValue.value);
});

// button constructor: (callback, module)
// const is calling the constructor from the buttonSwitch.js file
const volumeSwitch = new ButtonSwitch((state) => {
  if (!state) {
    volumeFX.disconnect();
  } else {
    //
  }
}, volumeModule);

export { volumeFX, volumeSwitch };
