class PitchShifter {
  constructor(
    id,
    title,
    colour,
    inputGain,
    delayTime,
    feedback,
    pitch,
    wetDryMix,
    outputGain
  ) {
    // Create components
    this.id = id;
    this.title = title;
    this.input = new Tone.Gain(inputGain); // typically 1
    this.delay = new Tone.FeedbackDelay({
      delayTime: delayTime,
      feedback: feedback,
      wet: wetDryMix, // a value between 0 and 1
    });
    this.pitchShift = new Tone.PitchShift({
      pitch: pitch,
    });
    this.output = new Tone.Gain(outputGain);

    // Connect the components
    // order based on https://www.electrosmash.com/tube-screamer-analysis
    this.input.connect(this.delay);
    this.delay.connect(this.pitchShift);
    this.pitchShift.connect(this.output);

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
        this.delay.delayTime.value = value;
        break;
      case "feedback":
        this.delay.feedback.value = value;
        break;
      case "pitch":
        this.pitchShift.pitch = value;
        break;
      case "wet":
        this.delay.wet.value = value;
        break;
      case "outputGain":
        this.output.gain.value = value;
        break;
      default:
        console.log("Invalid parameter name: " + parameterName);
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

export default PitchShifter;