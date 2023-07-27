class JCReverbFXModule {
  constructor(id, title, colour, inputGain, roomSize, wetDryMix, outputGain) {
    this.id = id;
    this.title = title;
    this.colour = colour;
    this.input = new Tone.Gain(inputGain);
    this.reverb = new Tone.JCReverb({
      roomSize: roomSize,
      wet: wetDryMix,
    });
    this.output = new Tone.Gain(outputGain);

    this.input.connect(this.reverb);
    this.reverb.connect(this.output);

    const moduleElement = document.getElementById(id);
    if (moduleElement) {
      moduleElement.style.backgroundColor = colour;

      const titleElement = document.createElement("h2");
      titleElement.textContent = title;

      moduleElement.appendChild(titleElement);
    }
  }

  get wetDryMix() {
    return this.reverb.wet.value;
  }

  set wetDryMix(value) {
    this.reverb.wet.value = value;
  }

  setParameter(parameterName, value) {
    switch (parameterName) {
      case "inputGain":
        this.input.gain.value = value;
        break;
      case "roomSize":
        this.reverb.set({ roomSize: value });
        break;
      case "wet":
        this.reverb.set({ wet: value });
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

export default JCReverbFXModule;