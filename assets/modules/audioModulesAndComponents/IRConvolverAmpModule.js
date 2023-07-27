class ConvolverAmpModule {
  constructor(
    basePath,
    inputGain,
    lowGain,
    midGain,
    highGain,
    lowFrequencyThreshold,
    highFrequencyThreshold,
    outputGain,
    volume
  ) {
    this.basePath = basePath;
    this.input = new Tone.Gain(inputGain);
    // set the EQ parameters and thresholds
    this.eq = new Tone.EQ3({
      low: lowGain,
      mid: midGain,
      high: highGain,
      lowFrequency: lowFrequencyThreshold,
      highFrequency: highFrequencyThreshold,
    });
    this.postgain = new Tone.Gain(outputGain);
    this.output = new Tone.Volume(volume);
    this.convolver = new Tone.Convolver();

    // Connect the components
    this.input.connect(this.eq);
    this.eq.connect(this.postgain);
    this.postgain.connect(this.convolver);
    this.convolver.connect(this.output);

    this.headers = {
      Accept: "application/vnd.github.v3+json",
    };

    this.ampType = document.getElementById("amp-type");
    this.ampType.addEventListener(
      "change",
      this.handleAmpTypeChange.bind(this)
    );

    this.getAmpIRs();
  }

  getAmpIRs() {
    fetch(this.basePath, { headers: this.headers })
      .then((response) => response.json())
      .then((data) => {
        const wavFiles = data.filter((item) => item.name.endsWith(".wav"));
        wavFiles.forEach((file) => {
          const option = document.createElement("option");
          option.value = file.download_url;
          option.textContent = file.name.substring(0, file.name.length - 4);
          this.ampType.appendChild(option);
        });
      })
      .catch((error) => {
        console.error("Error getting amp IRs:", error);
      });
  }

  handleAmpTypeChange() {
    const selectedAmpType = this.ampType.value;

    this.convolver.dispose(); // dispose of the last IR

    if (selectedAmpType === "") {
      // console.log("No amp IR selected");
      this.convolver = new Tone.Convolver();
      this.postgain.connect(this.convolver);
      this.convolver.connect(this.output);
    } else {
      // console.log("Amp IR:", selectedAmpType);

      const impulseResponse = new Tone.Buffer(selectedAmpType, () => {
        // this.convolver.dispose(); // dispose of the last IR
        if (impulseResponse.loaded) {
          // console.log("Amp IR loaded"); 
          this.convolver.buffer = impulseResponse;
          this.convolver = new Tone.Convolver(impulseResponse);
          this.postgain.connect(this.convolver);
          this.convolver.connect(this.output);
        } else {
          console.error("Error loading amp IR");
        }
      });
    }
  }

  setParameter(parameterName, value) {
    switch (parameterName) {
      case "input":
        this.input.gain.value = value;
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
      case "postgain":
        this.postgain.gain.value = value;
        break;
      case "volume":
        this.output.volume.value = value;
        break;
      default:
        console.error("Invalid parameter name:", parameterName);
    }
  }

  connect(destination) {
    this.output.connect(destination);
  }

  disconnect() {
    this.output.disconnect();
  }
}

export default ConvolverAmpModule;
