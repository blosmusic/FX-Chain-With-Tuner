class DistortionFXModule {
  constructor(
    id,
    title,
    colour,
    inputGain,
    distortionAmount,
    lowGain,
    midGain,
    highGain,
    lowFrequencyThreshold,
    highFrequencyThreshold,
    outputGain,
    wetDryMix
  ) { 
    // Create components
    this.id = id;
    this.title = title;
    this.input = new Tone.Gain(inputGain); // typically 1
    this.distortion = new Tone.Distortion({
      distortion: distortionAmount,
      oversample: "2x",
      wet: wetDryMix, // a value between 0 and 1
    });
    // set the EQ parameters and thresholds
    this.eq = new Tone.EQ3({
      low: lowGain,
      mid: midGain,
      high: highGain,
      lowFrequency: lowFrequencyThreshold,
      highFrequency: highFrequencyThreshold,
    });
    this.output = new Tone.Gain(outputGain);

    // Connect the components
    this.input.connect(this.distortion);
    this.distortion.connect(this.eq);
    this.eq.connect(this.output);

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
    return this.distortion.wet.value;
  }

  set wetDryMix(value) {
    this.distortion.wet.value = value;
  }

  setParameter(parameterName, value) {
    switch (parameterName) {
      case "inputGain":
        this.input.gain.value = value;
        break;
      case "distortion":
        this.distortion.distortion = value;
        break;
      case "lowGain":
        this.eq.low.value = value;
        break;
      case "midGain":
        this.eq.mid.value = value;
        break;
      case "highGain":
        this.eq.high.value = value;
        break;
      case "outputGain":
        this.output.gain.value = value;
        break;
      case "wetDryMix":
        this.distortion.wet = value;
        break;
      default:
        console.error("Invalid parameter name:", parameterName);
        break;
    }
  }

  connect(destination) {
    this.output.connect(destination || destination.input);
  }

  disconnect() {
    this.output.disconnect();
  }
}

export default DistortionFXModule;
