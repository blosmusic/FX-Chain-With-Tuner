class AutoWahFXModule {
  constructor(
    id,
    title,
    colour,
    inputGain,
    q,
    baseFrequency,
    gain,
    octaves,
    sensitivity,
    outputGain,
    wetDryMix
  ) {
    this.id = id;
    this.title = title;
    this.colour = colour;
    this.input = new Tone.Gain(inputGain);
    this.autoWah = new Tone.AutoWah({
      q: q,
      baseFrequency: baseFrequency,
      gain: gain,
      octaves: octaves,
      sensitivity: sensitivity,
      wet: wetDryMix, // a value between 0 and 1
    });
    this.output = new Tone.Gain(outputGain);

    // Connect the components
    this.input.connect(this.autoWah);
    this.autoWah.connect(this.output);

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
    return this.autoWah.wet.value;
  }

  set wetDryMix(value) {
    this.autoWah.wet.value = value;
  }

  setParameter(parameterName, value) {
    switch (parameterName) {
      case "inputGain":
        this.input.gain.value = value;
        break;
      case "q":
        this.autoWah.set({ q: value });
        break;
      case "baseFrequency":
        this.autoWah.set({ baseFrequency: value });
        break;
      case "gain":
        this.autoWah.set({ gain: value });
        break;
      case "octaves":
        this.autoWah.set({ octaves: value });
        break;
      case "sensitivity":
        this.autoWah.set({ sensitivity: value });
        break;
      case "wet":
        this.autoWah.set({ wet: value });
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

export default AutoWahFXModule;
