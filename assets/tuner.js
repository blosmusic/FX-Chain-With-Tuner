import PitchDectectionModule from "./modules/pitchDetectionModule.js";

let tunerButton = document.getElementById("tuner-value");
let tunerIsRunning = false;

// tunerButton.onclick = function () {
//   if (!tunerIsRunning) {
//     startTuner();
//   } else {
//     stopTuner();
//   }
// };

// function startTuner() {
//   console.log("tuner started");
//   tunerButton.innerText = "O";
//   tunerIsRunning = true;
//   setup();
// }

// function stopTuner() {
//   console.log("tuner stopped, mic closed");
//   tunerButton.innerText = "I";
//   tunerIsRunning = false;
//   audioContext.close();
//   tunerButton.style.backgroundColor = "darkred";
// }

// switch (true) {
//   case inputFrequency < noteFreq - 1:
//     tunerButton.style.backgroundColor = "gold";
//     break;
//   case inputFrequency > noteFreq + 1:
//     tunerButton.style.backgroundColor = "gold";
//     break;
//   default:
//     tunerSuccess();
// }

// function tunerSuccess() {
//   console.log("tuner success");
// }

// Usage:
const pitchDetection = new PitchDectectionModule();

// To get the closest chromatic note value to an incoming audio source
// you can call the comparePitchToNote method like this:
const audioFrequency = 440.5; // Replace with the actual audio frequency value
const closestNote = pitchDetection.comparePitchToNote(audioFrequency);
console.log("Closest chromatic note value:", closestNote);