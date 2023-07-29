class PitchDetectionModule {
  constructor() {
    // constructor parameters
    this.tonePlaying = null;
    this.allNoteValues = [
      // https://mixbutton.com/mixing-articles/music-note-to-frequency-chart/
      {
        note: "C",
        frequency: [32.7, 65.41, 130.81, 261.63, 523.25, 1046.5, 2093, 4186.01],
      },
      {
        note: "C#",
        frequency: [
          34.65, 69.3, 138.59, 277.18, 554.37, 1108.73, 2217.46, 4434.92,
        ],
      },
      {
        note: "D",
        frequency: [
          36.71, 73.42, 146.83, 293.66, 587.33, 1174.66, 2349.32, 4698.64,
        ],
      },
      {
        note: "D#",
        frequency: [
          38.89, 77.78, 155.56, 311.13, 622.25, 1244.51, 2489.02, 4978.03,
        ],
      },
      {
        note: "E",
        frequency: [
          41.2, 82.41, 164.81, 329.63, 659.25, 1318.51, 2637.02, 5274.04,
        ],
      },
      {
        note: "F",
        frequency: [
          43.65, 87.31, 174.61, 349.23, 698.46, 1396.91, 2793.83, 5587.65,
        ],
      },
      {
        note: "F#",
        frequency: [
          46.25, 92.5, 185.0, 369.99, 739.99, 1479.98, 2959.96, 5919.91,
        ],
      },
      {
        note: "G",
        frequency: [
          49.0, 98.0, 196.0, 392.0, 783.99, 1567.98, 3135.96, 6271.93,
        ],
      },
      {
        note: "G#",
        frequency: [
          51.91, 103.83, 207.65, 415.3, 830.61, 1661.22, 3322.44, 6644.88,
        ],
      },
      {
        note: "A",
        frequency: [55.0, 110.0, 220.0, 440.0, 880.0, 1760.0, 3520.0, 7040.0],
      },
      {
        note: "A#",
        frequency: [
          58.27, 116.54, 233.08, 466.16, 932.33, 1864.66, 3729.31, 7458.62,
        ],
      },
      {
        note: "B",
        frequency: [
          61.74, 123.47, 246.94, 493.88, 987.77, 1975.53, 3951.07, 7902.13,
        ],
      },
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
    // this.getPitch();
  }

  noteValueOfFrequency(frequencyValue) {
    frequencyValue = Tone.Frequency(frequencyValue, "hz").toNote();
    return frequencyValue;
  }

  // compare pitch to closest note in scale and return note value
  comparePitchToNote(frequency) {
    let closestNote = null;
    let recordDifference = Infinity;

    for (let i = 0; i < this.allNoteValues.length; i++) {
      const noteFrequencies = this.allNoteValues[i].frequency;
      for (let j = 0; j < noteFrequencies.length; j++) {
        const diff = frequency - noteFrequencies[j];
        if (Math.abs(diff) < Math.abs(recordDifference)) {
          closestNote = this.allNoteValues[i];
          recordDifference = diff;
        }
      }
    }

    return closestNote ? closestNote.note : null;
  }
}

export default PitchDetectionModule;
