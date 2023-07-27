class CompressorFXModule {
  constructor(
    id,
    title,
    colour,
    inputGain,
    attack,
    knee,
    ratio,
    release,
    threshold,
    outputGain
  ) {
    this.id = id;
    this.title = title;
    this.colour = colour;
    this.input = new Tone.Gain(inputGain);
    this.compressor = new Tone.Compressor({
      attack: attack,
      knee: knee,
      ratio: ratio,
      release: release,
      threshold: threshold,
    });
    this.output = new Tone.Gain(outputGain);

    // Connect the components
    this.input.connect(this.compressor);
    this.compressor.connect(this.output);

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

  setParameter(parameterName, value) {
    switch (parameterName) {
      case "input":
        this.input.gain.value = value;
        break;
      case "attack":
        this.compressor.set({ attack: value });
        break;
      case "knee":
        this.compressor.set({ knee: value });
        break;
      case "ratio":
        this.compressor.set({ ratio: value });
        break;
      case "release":
        this.compressor.set({ release: value });
        break;
      case "threshold":
        this.compressor.set({ threshold: value });
        break;
      case "output":
        this.output.gain.value = value;
        break;
      default:
        console.log("setParameter: unknown parameter name: " + parameterName);
    }
  }

  connect(destination) {
    this.output.connect(destination || destination.input);
  }

  disconnect() {
    this.output.disconnect();
  }
}

export default CompressorFXModule;