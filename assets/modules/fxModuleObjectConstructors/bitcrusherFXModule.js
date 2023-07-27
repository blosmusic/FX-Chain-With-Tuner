class BitCrusherFXModule {
  constructor(
    id,
    title,
    colour,
    inputGain,
    bits,
    lowGain,
    midGain,
    highGain,
    lowFrequencyThreshold,
    highFrequencyThreshold,
    outputGain,
    wetDryMix
  ) {
    this.id = id;
    this.title = title;
    this.colour = colour;
    this.input = new Tone.Gain(inputGain);
    this.bitCrusher = new Tone.BitCrusher({
      bits: bits,
      wet: wetDryMix, // typically 1
    });
    this.eq = new Tone.EQ3({
      low: lowGain,
      mid: midGain,
      high: highGain,
      lowFrequency: lowFrequencyThreshold,
      highFrequency: highFrequencyThreshold,
    });
    this.output = new Tone.Gain(outputGain);

    this.input.connect(this.bitCrusher);
    this.bitCrusher.connect(this.eq);
    this.eq.connect(this.output);

    const moduleElement = document.getElementById(id);
    if (moduleElement) {
      moduleElement.style.backgroundColor = colour;

      const titleElement = document.createElement("h2");
      titleElement.textContent = title;

      moduleElement.appendChild(titleElement);
    }
  }

  get wetDryMix() {
    return this.bitCrusher.wet.value;
  }

  set wetDryMix(value) {
    this.bitCrusher.wet.value = value;
  }

  setParameter(parameterName, value) {
    switch (parameterName) {
      case "inputGain":
        this.input.gain.value = value;
        break;
      case "bits":
        this.bitCrusher.set({ bits: value });
        break;
      case "wet":
        this.bitCrusher.set({ wet: value });
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
      default:
        console.error("Invalid parameter name:", parameterName);
        break;
    }
  }

  connect(destination) {
    this.output.connect(destination);
  }

  disconnect() {
    this.output.disconnect();
  }
}

export default BitCrusherFXModule;
