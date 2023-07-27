class ChorusFXModule {
  constructor(
    id,
    title,
    colour,
    inputGain,
    frequency,
    delayTime,
    depth,
    type,
    spread,
    wet,
    outputGain
  ) {
    // Create components
    this.id = id;
    this.title = title;
    this.input = new Tone.Gain(inputGain); // typically 1
    this.chorus = new Tone.Chorus({
      frequency: frequency,
      delayTime: delayTime,
      depth: depth,
      type: type,
      spread: spread,
      wet: wet, // a value between 0 and 1
    });
    this.output = new Tone.Gain(outputGain);

    // Connect the components
    this.input.connect(this.chorus.start());
    this.chorus.connect(this.output);

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
        return this.chorus.wet.value;
        }

    set wetDryMix(value) {
        this.chorus.wet.value = value;
        }

    setParameter(parameterName, value) {
        switch (parameterName) {
            case "inputGain":
                this.input.gain.value = value;
                break;
            case "frequency":
                this.chorus.set({frequency: value})
                break;
            case "delayTime":
                this.chorus.set({delayTime: value})
                break;
            case "depth":
                this.chorus.set({depth: value})
                break;
            case "type":
                this.chorus.set({type: value})
                break;
            case "spread":
                this.chorus.set({spread: value})
                break;
            case "outputGain":
                this.output.gain.value = value;
                break;
            case "wetDryMix":
                this.chorus.set({wet: value})
                break;
            default:
                console.log("No parameter of name " + parameterName);
        }
    }

    connect(destination) {
        this.output.connect(destination);
    }

    disconnect() {
        this.output.disconnect();
    }
}

export default ChorusFXModule;
