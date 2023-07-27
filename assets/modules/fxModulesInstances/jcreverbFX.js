import SliderParameters from "../audioModulesAndComponents/sliderParameters.js";
import ButtonSwitch from "../audioModulesAndComponents/buttonSwitch.js";
import JCReverbFXModule from "../fxModuleObjectConstructors/jcreverbFXModule.js";

// FX Module Setup
const jcreverbModule = document.getElementById("jcreverb-module");

// slider constructor: (id, min, max, step, value, label, moduleContainer)
const jcreverbRoomSize = new SliderParameters(
  "roomSize",
  0.1,
  1,
  0.01,
  0.5,
  "room size",
  jcreverbModule
);

const jcreverbMix = new SliderParameters(
  "wet",
  0,
  1,
  0.01,
  0.5,
  "mix",
  jcreverbModule
);

// JCReverbFXModule constructor: id, title, colour, inputGain, roomSize, wet, outputGain
const jcreverbFX = new JCReverbFXModule(
  "jcreverb-module",
  "JC reverb",
  "darkslategrey",
  1,
  jcreverbRoomSize.value,
  jcreverbMix.value,
  1
);

jcreverbRoomSize.sliderElement.addEventListener("input", () => {
  jcreverbFX.setParameter("roomSize", jcreverbRoomSize.value);
});

jcreverbMix.sliderElement.addEventListener("input", () => {
  jcreverbFX.setParameter("wet", jcreverbMix.value);
});

const jcreverbSwitch = new ButtonSwitch((state) => {
  if (!state) {
    jcreverbFX.disconnect();
  } else {
    //
  }
}, jcreverbModule);

export { jcreverbFX, jcreverbSwitch };
