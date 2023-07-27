let tunerButton = document.getElementById("tuner-value");
let tunerIsRunning = false;
let tonePlaying = null;

let allNoteValues = [
  { note: "C", frequency: 261.63 },
  { note: "C#", frequency: 277.18 },
  { note: "D", frequency: 293.66 },
  { note: "D#", frequency: 311.13 },
  { note: "E", frequency: 329.63 },
  { note: "F", frequency: 349.23 },
  { note: "F#", frequency: 369.99 },
  { note: "G", frequency: 392.0 },
  { note: "G#", frequency: 415.3 },
  { note: "A", frequency: 440.0 },
  { note: "A#", frequency: 466.16 },
  { note: "B", frequency: 493.88 },
];

// ml5 code from https://learn.ml5js.org/#/reference/pitch-detection
let model_url =
  "https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe";

  tunerButton.onclick = function () {
    if (!tunerIsRunning) {
      startTuner();
    } else {
      stopTuner();
    }
  };

  function startTuner() {
    console.log("tuner started");
    tunerButton.innerText = "O";
    tunerIsRunning = true;
    setup();
  }

  function stopTuner() {
    console.log("tuner stopped, mic closed");
    tunerButton.innerText = "I";
    tunerIsRunning = false;
    audioContext.close();
    tunerButton.style.backgroundColor = "darkred";
  }

  async function setup() {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    startPitch(stream, audioContext);
  }

  function startPitch(stream, audioContext) {
    pitch = ml5.pitchDetection(model_url, audioContext, stream, modelLoaded);
  }

  function modelLoaded() {
    getPitch();
  }

  function noteValueOfFrequency(frequencyValue) {
    frequencyValue = Tone.Frequency(frequencyValue, "hz").toNote();
    document.querySelector("#value").textContent = frequencyValue;
    return frequencyValue;
  }

  // compare pitch to closest note in scale and display note
  function comparePitchToNote(frequency) {
    let closestNote = -1;
    let recordDifference = Infinity;

    for (let i = 0; i < filteredNotes.length; i++) {
      let diff = frequency - filteredNotes[i].freq;
      if (Math.abs(diff) < Math.abs(recordDifference)) {
        closestNote = filteredNotes[i];
        recordDifference = diff;
      }

      checkIfNoteIsInKey(
        closestNote.mode,
        frequency,
        closestNote.note,
        closestNote.freq
      );
      tunerButton.textContent = closestNote.note;
    }
  }

  // check if note is in key and display note name in green if it is, gold if it isn't
  function checkIfNoteIsInKey(noteMode, inputFrequency, noteName, noteFreq) {
    console.log(
      "mode is:",
      noteMode,
      "\t",
      "input frequency is:",
      inputFrequency,
      "Hz",
      "\t",
      "equals the note value:",
      noteValueOfFrequency(inputFrequency),
      "\t",
      "closest note is:",
      noteName,
      "\t",
      "with frequency:",
      noteFreq
    );
    switch (true) {
      case inputFrequency < noteFreq - 1:
        tunerButton.style.backgroundColor = "gold";
        break;
      case inputFrequency > noteFreq + 1:
        tunerButton.style.backgroundColor = "gold";
        break;
      default:
        tunerSuccess();
    }
  }

  function tunerSuccess() {
    console.log("tuner success");
  }