class VolumeFXModule {
    constructor(
        id,
        title,
        colour,
        inputGain,
        volume,
        outputGain,
    ) {
        this.id = id;
        this.title = title;
        this.colour = colour;
        this.input = new Tone.Gain(inputGain);
        this.volume = new Tone.Volume({
            volume: volume,
        });
        this.output = new Tone.Gain(outputGain);

        this.input.connect(this.volume);
        this.volume.connect(this.output);

        const moduleElement = document.getElementById(id);
        if (moduleElement) {
            moduleElement.style.backgroundColor = colour;

            const titleElement = document.createElement("h2");
            titleElement.textContent = title;

            moduleElement.appendChild(titleElement);
        }
    }

    setParameter(parameterName, value) {
        switch (parameterName) {
            case "inputGain":
                this.input.gain.value = value;
                break;
            case "volume":
                this.volume.volume.value = value;
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

export default VolumeFXModule;