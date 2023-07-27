class PingPongDelayFXModule {
  constructor(
    id,
    title,
    colour,
    inputGain,
    delayTime,
    feedback,
    maxDelayTime,
    wetDryMix,
    outputGain
  ) {
    // Create components
    this.id = id;
    this.title = title;
    this.input = new Tone.Gain(inputGain); // typically 1
    this.delay = new Tone.PingPongDelay({
      delayTime: delayTime,
      feedback: feedback,
      maxDelay: maxDelayTime,
      wet: wetDryMix, // a value between 0 and 1
    });
    this.output = new Tone.Gain(outputGain);

    // Connect the components
    this.input.connect(this.delay);
    this.delay.connect(this.output);

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
    // console.log("wetDryMix", this.delay.wet.value);
    return this.delay.wet.value;
  }

  set wetDryMix(value) {
    this.delay.wet.value = value;
  }

  setParameter(parameterName, value) {
    switch (parameterName) {
      case "inputGain":
        this.input.gain.value = value;
        break;
      case "delayTime":
        this.delay.set({ delayTime: value });
        break;
      case "feedback":
        this.delay.set({ feedback: value });
        break;
      case "wet":
        this.delay.set({ wet: value });
        break;
      case "outputGain":
        this.output.gain.value = value;
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

export default PingPongDelayFXModule;