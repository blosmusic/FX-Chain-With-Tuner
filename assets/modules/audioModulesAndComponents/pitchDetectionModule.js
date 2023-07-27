class PitchDetectionModule {
  constructor(
    // constructor parameters
  ) {
    this.tonePlaying = null;
    this.allNoteValues = [
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

    this.model_url =
      "https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe";

    this.audioContext = new AudioContext();
    this.pitch = null;

    this.setup();
  }

  async setup() {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    this.startPitch(stream, this.audioContext);
  }

  startPitch(stream, audioContext) {
    this.pitch = ml5.pitchDetection(
      this.model_url,
      audioContext,
      stream,
      this.modelLoaded.bind(this)
    );
  }

  modelLoaded() {
    this.getPitch();
  }

  noteValueOfFrequency(frequencyValue) {
    frequencyValue = Tone.Frequency(frequencyValue, "hz").toNote();
    return frequencyValue;
  }

  // compare pitch to closest note in scale and return note value
  comparePitchToNote(frequency) {
    let closestNote = -1;
    let recordDifference = Infinity;

    for (let i = 0; i < this.allNoteValues.length; i++) {
      let diff = frequency - this.allNoteValues[i].frequency;
      if (Math.abs(diff) < Math.abs(recordDifference)) {
        closestNote = this.allNoteValues[i];
        recordDifference = diff;
      }
    }

    return closestNote.note;
  }

}

export default PitchDetectionModule;