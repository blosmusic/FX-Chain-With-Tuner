class CompleteDistortionFXModule {
  constructor(
    id,
    title,
    colour,
    inputGain,
    distortionAmount,
    bits,
    lowGain,
    midGain,
    highGain,
    lowFrequencyThreshold,
    highFrequencyThreshold,
    outputGain,
    wet
  ) {
    // Create components
    this.id = id;
    this.title = title;
    this.input = new Tone.Gain(inputGain); // typically 1
    this.distortion = new Tone.Distortion({
      distortion: distortionAmount,
      oversample: "none",
      wet: wet, // typically 1
    });
    this.bitCrusher = new Tone.BitCrusher({
      bits: bits,
      wet: wet, // typically 1
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
    this.distortion.connect(this.bitCrusher);
    this.bitCrusher.connect(this.eq);
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
    return this.bitCrusher.wet.value;
  }

  set wetDryMix(value) {
    this.distortion.wet.value = value;
    this.bitCrusher.wet.value = value;
  }

  setParameter(parameterName, value) {
    switch (parameterName) {
      case "input":
        this.input.gain.value = value;
        break;
      case "distortion":
        this.distortion.distortion = value;
        break;
      case "bits":
        this.bitCrusher.set({ bits: value });
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
      case "lowFrequencyThreshold":
        this.eq.lowFrequency.value = value;
        break;
      case "highFrequencyThreshold":
        this.eq.highFrequency.value = value;
        break;
      case "output":
        this.output.gain.value = value;
        break;
      case "wet":
        this.distortion.wet.value = value;
        this.bitCrusher.wet.value = value;
        break;
      default:
        console.log("Invalid parameter");
    }
  }

  connect(destination) {
    this.output.connect(destination || destination.input);
  }

  disconnect() {
    this.output.disconnect();
  }
}

export default CompleteDistortionFXModule;
