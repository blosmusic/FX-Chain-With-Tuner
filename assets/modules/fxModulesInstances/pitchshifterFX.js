import SliderParameters from "../audioModulesAndComponents/sliderParameters.js";
import ButtonSwitch from "../audioModulesAndComponents/buttonSwitch.js";
import PitchShifter from "../fxModuleObjectConstructors/pitchshifterFXModule.js";

// FX Module Setup
const pitchShifterModule = document.getElementById("pitchshifter-module");

// slider constructor: (id, min, max, step, value, label, moduleContainer)
const pitchShifterValue = new SliderParameters(
    "pitch",
    -12,
    12,
    1,
    0,
    "pitch",
    pitchShifterModule
);

// PitchShifterFXModule constructor: id, title, colour, inputGain, delayTime, feedback, pitch, windowSize, wetDryMix
const pitchShifterFX = new PitchShifter(
    "pitchshifter-module",
    "pitch",
    "red",
    1,
    0.1,
    0.5,
    pitchShifterValue.value,
    1,
    1
);

pitchShifterValue.sliderElement.addEventListener("input", () => {
    pitchShifterFX.setParameter("pitch", pitchShifterValue.value);
}
);

// button constructor: (callback, module)
// const is calling the constructor from the buttonSwitch.js file
const pitchShifterSwitch = new ButtonSwitch((state) => {
    if (!state) {
        pitchShifterFX.disconnect();
    } else {
        //
    }
}, pitchShifterModule);

export { pitchShifterFX, pitchShifterSwitch };