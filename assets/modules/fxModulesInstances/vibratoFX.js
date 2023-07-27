import SliderParameters from "../audioModulesAndComponents/sliderParameters.js";
import ButtonSwitch from "../audioModulesAndComponents/buttonSwitch.js";
import VibratoFXModule from "../fxModuleObjectConstructors/vibratoFXModule.js";

// FX Module Setup
const vibratoModule = document.getElementById("vibrato-module");

// slider constructor: (id, min, max, step, value, label, moduleContainer)
const vibratoDepth = new SliderParameters(
    "depth",
    0,
    1,
    0.01,
    0.5,
    "depth",
    vibratoModule
);

const vibratoRate = new SliderParameters(
    "frequency",
    0.1,
    10,
    0.01, 
    5,
    "rate",
    vibratoModule
);

// VibratoFXModule constructor: id, title, colour, inputGain, depth, frequency, maxDelay, type, wet, outputGain
const vibratoFX = new VibratoFXModule(
    "vibrato-module",
    "vibrato",
    "darkolivegreen",
    1,
    vibratoDepth.value,
    vibratoRate.value,
    0.005,
    "sine",
    1,
    1
);

vibratoDepth.sliderElement.addEventListener("input", () => {
    vibratoFX.setParameter("depth", vibratoDepth.value);
}
);

vibratoRate.sliderElement.addEventListener("input", () => {
    vibratoFX.setParameter("frequency", vibratoRate.value);
}
);

const vibratoSwitch = new ButtonSwitch((state) => {
    if (!state) {
        vibratoFX.disconnect();
    } else {
        //
    }
}, vibratoModule);

export { vibratoFX, vibratoSwitch };