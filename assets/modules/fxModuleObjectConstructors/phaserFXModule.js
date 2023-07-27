class PhaserFXModule {
  constructor(
    id,
    title,
    colour,
    inputGain,
    q,
    baseFrequecy,
    frequency,
    octaves,
    stages,
    wet,
    outputGain
  ) {
    // Create components
    this.id = id;
    this.title = title;
    this.input = new Tone.Gain(inputGain); // typically 1
    this.phaser = new Tone.Phaser({
      q: q,
      baseFrequency: baseFrequecy,
      frequency: frequency,
      octaves: octaves,
      stages: stages,
      wet: wet, // a value between 0 and 1
    });
    this.output = new Tone.Gain(outputGain);

    // Connect the components
    this.input.connect(this.phaser);
    this.phaser.connect(this.output);

    // Attach the module to the HTML element with the provided id
    const moduleElement = document.getElementById(id);
    if (moduleElement) {
      moduleElement.style.backgroundColor = colour;

      // Create an <h2> element with the provided title
      const titleElement = document.createElement("h2");
      titleElement.textContent = title;

      // Append the title element to the module element
      moduleElement.appendChild(titleElement);
    }
  }

  get wetDryMix() {
    return this.phaser.wet.value;
  }

  set wetDryMix(value) {
    this.phaser.wet.value = value;
  }

  setParameter(parameterName, value) {
    switch (parameterName) {
      case "inputGain":
        this.input.gain.value = value;
        break;
      case "q":
        this.phaser.set({ q: value });
        break;
      case "baseFrequency":
        this.phaser.set({ baseFrequency: value });
        break;
      case "frequency":
        this.phaser.set({ frequency: value });
        break;
      case "octaves":
        this.phaser.set({ octaves: value });
        break;
      case "stages":
        this.phaser.set({ stages: value });
        break;
      case "wet":
        this.phaser.set({ wet: value });
        break;
      default:
        console.log("Invalid parameter name");
    }
  }

  connect(destination) {
    this.output.connect(destination);
  }

  disconnect() {
    this.output.disconnect();
  }
}

export default PhaserFXModule;
