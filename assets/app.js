// Import Modules
import Meter from "./modules/audioModulesAndComponents/meterModule.js";
import PitchDectectionModule from "./modules/audioModulesAndComponents/pitchDetectionModule.js";
import { fxModules, fxButtons } from "./modules.js";

// Audio Context Setup
Tone.context.lookAhead = 0;
Tone.context.updateInterval = 0.01;
Tone.context.bufferSize = 128;

// Audio Source Setup
const audioSource = new Tone.UserMedia();
const monoSignal = new Tone.Mono();
const destination = Tone.getDestination();

// Meter Setup
const inputMeter = new Meter(-100, 0, "input-meter", "input-db-value");
const outputMeter = new Meter(-100, 0, "output-meter", "output-db-value");

// manage the button states and turn on/off the fx modules
fxButtons.forEach((button) => {
  button.button.addEventListener("click", () => {
    // Disconnect all modules from the inputMeter.input to establish new connections
    inputMeter.output.disconnect();
    // assign the last active module to the input meter
    let lastActiveModule = inputMeter;

    for (let i = 0; i < fxModules.length; i++) {
      if (fxButtons[i].on) {
        // console.log("loop", fxButtons[i].on, fxModules[i].title, "on");
        lastActiveModule.output.connect(fxModules[i].input);
        lastActiveModule = fxModules[i];
      } else {
        // console.log("loop", fxButtons[i].on, fxModules[i].title, "off");
        fxModules[i].output.disconnect();
      }
    }
    // connect the last active module to the output meter
    lastActiveModule.output.connect(outputMeter.input);
    // console.log(lastActiveModule.title, "last active module"); // this is the last active module
    // connect the output meter to the destination
    outputMeter.output.connect(destination);
  });
});

// Main function
async function main() {
  // Start the audio context
  await Tone.start();

  try {
    await audioSource.open();
    console.log("Audio source opened");

    // Usage:
    const pitchDetection = new PitchDectectionModule();

    // To get the closest chromatic note value to an incoming audio source
    // you can call the comparePitchToNote method like this:
    const audioFrequency = 100.5; // Replace with the actual audio frequency value
    const closestNote = pitchDetection.comparePitchToNote(audioFrequency);
    console.log("Closest chromatic note value:", closestNote);

    // connect the audio source to the meter
    audioSource.connect(monoSignal);
    // default connection
    monoSignal.connect(inputMeter.input);
    inputMeter.output.connect(outputMeter.input);
    outputMeter.output.connect(destination);
  } catch (error) {
    console.error("Failed to open audio source:", error);
  }
}

main();
