class VibratoFXModule {
    constructor(
        id,
        title,
        colour,
        inputGain,
        depth,
        frequency,
        maxDelay,
        type,
        wetDryMix,
        outputGain
    ) {
        this.id = id;
        this.title = title;
        this.colour = colour;
        this.input = new Tone.Gain(inputGain);
        this.vibrato = new Tone.Vibrato({
            depth: depth,
            frequency: frequency,
            maxDelay: maxDelay,
            type: type,
            wet: wetDryMix,
        });
        this.output = new Tone.Gain(outputGain);

        this.input.connect(this.vibrato);
        this.vibrato.connect(this.output);

        const moduleElement = document.getElementById(id);
        if (moduleElement) {
            moduleElement.style.backgroundColor = colour;

            const titleElement = document.createElement("h2");
            titleElement.textContent = title;

            moduleElement.appendChild(titleElement);
        }
    }

    get wetDryMix() {
        return this.vibrato.wet.value;
    }

    set wetDryMix(value) {
        this.vibrato.wet.value = value;
    }

    setParameter(parameterName, value) {
        switch (parameterName) {
            case "inputGain":
                this.input.gain.value = value;
                break;
            case "depth":
                this.vibrato.set({ depth: value });
                break;
            case "frequency":
                this.vibrato.set({ frequency: value });
                break;
            case "maxDelay":
                this.vibrato.set({ maxDelay: value });
                break;
            case "type":
                this.vibrato.set({ type: value });
                break;
            case "wetDryMix":
                this.vibrato.set({ wet: value });
                break;
            case "outputGain":
                this.output.gain.value = value;
                break;
            default:
                console.log("Invalid parameterName: " + parameterName);
        }
    }

    connect(destination) {
        this.output.connect(destination);
    }

    disconnect() {
        this.output.disconnect();
    }
}

export default VibratoFXModule;