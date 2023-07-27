class AudioModule {
  constructor(audioSource, audioContext, synth) {
    this.audioSource = audioSource;
    this.audioContext = audioContext;
    this.synth = synth;
  }

  start() {
    // Select audio type
    selectedOptions.addEventListener("change", (event) => {
      const selectedOptionValue = event.target.value;

      switch (selectedOptionValue) {
        case "mono":
          this.monoAudio();
          break;
        case "stereo":
          this.stereoAudio();
          break;
        case "midi":
          this.midiAudio();
          break;
        default:
          this.muteAudio();
          break;
      }
    });
  }

  monoAudio() {
    console.log("Mono");
    this.startAudio();
    const monoOutput = new Tone.Mono();
    this.audioSource.connect(monoOutput);
    monoOutput.toDestination();
  }

  stereoAudio() {
    console.log("Stereo");
    this.startAudio();
    const monoLeft = new Tone.Mono({ channelCount: 1 });
    const monoRight = new Tone.Mono({ channelCount: -1 });
    this.audioSource.connect(monoLeft, monoRight);
    monoLeft.toDestination();
    monoRight.toDestination();
  }

  midiAudio() {
    console.log("Midi");
    this.audioSource.close();

    const midi = new Tone.Midi();

    // Enable the MIDI connection
    navigator
      .requestMIDIAccess()
      .then((access) => {
        const inputSelector = document.getElementById("midi-input-selector"); // HTML element to display input selection

        // Populate the inputSelector with available MIDI input options
        access.inputs.forEach((input) => {
          const option = document.createElement("option");
          option.value = input.id;
          option.text = input.name;
          inputSelector.appendChild(option);
        });

        // Event handler for input selection change
        inputSelector.addEventListener("change", (event) => {
          const selectedInputId = event.target.value;

          // Clear existing input event listeners for all devices
          access.inputs.forEach((input) => {
            input.onmidimessage = null;
          });

          if (
            selectedInputId !== "none" &&
            selectedOptions.value !== "mono" &&
            selectedOptions.value !== "stereo"
          ) {
            const selectedInput = access.inputs.get(selectedInputId);
            // Enable MIDI input for the selected device
            selectedInput.onmidimessage = this.handleMIDIMessage.bind(this);
          }
        });

        // Event handler for audio output selection change
        selectedOptions.addEventListener("change", (event) => {
          const selectedOutput = event.target.value;
          const selectedInputId = inputSelector.value;

          if (
            selectedOutput === "mono" ||
            selectedOutput === "stereo" ||
            selectedOutput === "none"
          ) {
            // Clear existing input event listeners for all devices
            access.inputs.forEach((input) => {
              input.onmidimessage = null;
            });
          } else if (selectedInputId !== "none") {
            const selectedInput = access.inputs.get(selectedInputId);
            // Enable MIDI input for the selected device
            selectedInput.onmidimessage = this.handleMIDIMessage.bind(this);
          }
        });
      })
      .catch((error) => {
        console.log("MIDI connection error:", error);
      });
  }

  muteAudio() {
    this.audioSource.close();
    this.audioContext.suspend();
    Tone.Transport.stop();
    console.log("Mute");
  }

  resumeAudio() {
    // Resume the audio context
    if (this.audioContext.state === "suspended") {
      this.audioContext.resume();
      Tone.Transport.start();
    }
    console.log("Resume");
  }

  handleMIDIMessage(message) {
    const command = message.data[0] & 0xf0;
    const note = message.data[1];
    const velocity = message.data[2];

    if (command === 144 && velocity > 0) {
      // Note On event
      const frequency = Tone.Midi(note).toFrequency();
      this.synth.triggerAttack(frequency);
      console.log("note on", note, velocity);
    } else if (command === 128 || (command === 144 && velocity === 0)) {
      // Note Off event
      const frequency = Tone.Midi(note).toFrequency();
      this.synth.triggerRelease(frequency);
    }
  }

  startAudio() {
    // Start the audio context
    if (this.audioContext.state !== "running") {
      this.audioContext.resume();
      Tone.Transport.start();
    }
  }
}

export default AudioModule;
