class TremoloFXModule {
  constructor(
    id,
    title,
    colour,
    inputGain,
    frequency,
    type,
    depth,
    spread,
    wetDryMix,
    outputGain
  ) {
    this.id = "tremolo";
    this.title = "Tremolo";
    this.colour = "darkred";
    this.input = new Tone.Gain(inputGain); // typically 1
    this.tremolo = new Tone.Tremolo({
      frequency: frequency,
      type: type,
      depth: depth,
      spread: spread,
      wet: wetDryMix, // a value between 0 and 1
    });
    this.output = new Tone.Gain(outputGain);
    this.input.connect(this.tremolo);
    this.tremolo.connect(this.output);

    // Connect the components
    this.input.connect(this.tremolo.start());
    this.tremolo.connect(this.output);

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
    return this.tremolo.wet.value;
  }

  set wetDryMix(value) {
    this.tremolo.wet.value = value;
  }

  setParameter(parameterName, value) {
    switch (parameterName) {
      case "inputGain":
        this.input.gain.value = value;
        break;
      case "frequency":
        this.tremolo.set({ frequency: value });
        break;
      case "type":
        this.tremolo.set({ type: value });
        break;
      case "depth":
        this.tremolo.set({ depth: value });
        break;
      case "spread":
        this.tremolo.set({ spread: value });
        break;
      case "wetDryMix":
        this.tremolo.set({ wet: value });
        break;
      case "outputGain":
        this.output.gain.value = value;
        break;
      default:
        console.log("Invalid parameter name: " + parameterName);
    }
  }

  connect(destination) {
    this.output.connect(destination);
  }

  disconnect() {
    this.output.disconnect();
  }
}

export default TremoloFXModule;
