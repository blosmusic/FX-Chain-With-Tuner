import SliderParameters from "../audioModulesAndComponents/sliderParameters.js";
import ButtonSwitch from "../audioModulesAndComponents/buttonSwitch.js";
import PingPongDelayFXModule from "../fxModuleObjectConstructors/pingpongDelayFXModule.js";

// FX Module Setup
const pingpongDelayModule = document.getElementById("pingpong-delay-module");

// slider constructor: (id, min, max, step, value, label, moduleContainer)
const pingpongDelayTime = new SliderParameters(
    "delayTime",
    0.1,
    1,
    0.01,
    0.5,
    "delay",
    pingpongDelayModule
);

const pingpongDelayFeedback = new SliderParameters(
    "feedback",
    0,
    1,
    0.01,
    0.5,
    "feedback",
    pingpongDelayModule
);

const pingpongDelayWet = new SliderParameters(
    "wet",
    0,
    1,
    0.01,
    0.5,
    "mix",
    pingpongDelayModule
);

// PingPongDelayFXModule constructor: id, title, colour, inputGain, delayTime, feedback, wet, outputGain
const pingpongDelayFX = new PingPongDelayFXModule(
    "pingpong-delay-module",
    "ping pong",
    "crimson",
    1,
    pingpongDelayTime.value,
    pingpongDelayFeedback.value,
    pingpongDelayWet.value,
    1
);

pingpongDelayTime.sliderElement.addEventListener("input", () => {
    pingpongDelayFX.setParameter("delayTime", pingpongDelayTime.value);
}
);

pingpongDelayFeedback.sliderElement.addEventListener("input", () => {
    pingpongDelayFX.setParameter("feedback", pingpongDelayFeedback.value);
}
);

pingpongDelayWet.sliderElement.addEventListener("input", () => {
    pingpongDelayFX.setParameter("wet", pingpongDelayWet.value);
}
);

// ButtonSwitch constructor: (id, label, moduleContainer)
const pingpongDelaySwitch = new ButtonSwitch((state) => {
    if (!state) {
        pingpongDelayFX.disconnect();
    } else {
        //
    }
}, pingpongDelayModule);

export { pingpongDelayFX, pingpongDelaySwitch };