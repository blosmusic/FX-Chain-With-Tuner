import SliderParameters from "../audioModulesAndComponents/sliderParameters.js";
import ButtonSwitch from "../audioModulesAndComponents/buttonSwitch.js";
import ReverbFXModule from "../fxModuleObjectConstructors/reverbFXModule.js";

// FX Module Setup
const reverbModule = document.getElementById("reverb-module");

// slider constructor: (id, min, max, step, value, label, moduleContainer)
const reverbDecay = new SliderParameters(
    "decay",
    0.1,
    10,
    0.01,
    5,
    "decay",
    reverbModule
);

const reverbPreDelay = new SliderParameters(
    "preDelay",
    0.1,
    1,
    0.01,
    0.5,
    "pre-delay",
    reverbModule
);

const reverbWetDryMix = new SliderParameters(
    "wet",
    0,
    1,
    0.01,
    0.5,
    "mix",
    reverbModule
);

// ReverbFXModule constructor: id, title, colour, inputGain, decay, preDelay, wetDryMix, outputGain
const reverbFX = new ReverbFXModule(
    "reverb-module",
    "reverb",
    "aqua",
    1,
    reverbDecay.value,
    reverbPreDelay.value,
    reverbWetDryMix.value,
    1
);

reverbDecay.sliderElement.addEventListener("input", () => {
    reverbFX.setParameter("decay", reverbDecay.value);
}
);

reverbPreDelay.sliderElement.addEventListener("input", () => {  
    reverbFX.setParameter("preDelay", reverbPreDelay.value);
}
);

reverbWetDryMix.sliderElement.addEventListener("input", () => {
    reverbFX.setParameter("wet", reverbWetDryMix.value);
}
);

// button constructor: (callback, module)
// const is calling the constructor from the buttonSwitch.js file
const reverbSwitch = new ButtonSwitch((state) => {
    if (!state) {
        reverbFX.disconnect();
    } else {
        //
    }
}, reverbModule);

export { reverbFX, reverbSwitch };
