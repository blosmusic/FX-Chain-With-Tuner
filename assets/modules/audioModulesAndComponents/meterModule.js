class Meter {
  constructor(minDecibels, maxDecibels, meterElementId, dbElementId) {
    this.title = "meter";
    this.input = new Tone.Gain();
    this.minDecibels = minDecibels;
    this.maxDecibels = maxDecibels;
    this.meterElement = document.getElementById(meterElementId);
    this.dbElement = document.getElementById(dbElementId);
    this.meter = new Tone.Meter(0.8);
    this.animationFrameId = null;
    this.output = new Tone.Gain();

    // Connect the moduule nodes
    this.input = this.meter;
    this.meter.connect(this.output);

    // Start the animation loop
    this.start();
  }

  updateMeter() {
    const level = this.meter.getValue();

    // Convert decibel level to linear range between 0 and 1
    const normalizedValue =
      (level - this.minDecibels) / (this.maxDecibels - this.minDecibels);
    const clampedValue = Math.min(Math.max(normalizedValue, 0), 1); // Clamp value between 0 and 1

    // Adjust meter height based on the normalized value
    const meterHeight = clampedValue * 100 + "%";
    this.meterElement.style.height = meterHeight;

    // Change meter color based on signal strength
    if (clampedValue > 0.95) {
      this.meterElement.style.backgroundColor = "red";
    } else if (clampedValue > 0.8) {
      this.meterElement.style.backgroundColor = "yellow";
    } else {
      this.meterElement.style.backgroundColor = "green";
    }

    // Update dB level display
    const dBValue = Math.round(level * 10) / 10; // Round to one decimal place
    this.dbElement.textContent = dBValue + " dB";

    // Call the function again on the next animation frame
    this.animationFrameId = requestAnimationFrame(this.updateMeter.bind(this));
  }

  start() {
    this.animationFrameId = requestAnimationFrame(this.updateMeter.bind(this));
  }

  stop() {
    cancelAnimationFrame(this.animationFrameId);
  }

  connect(destination) {
    this.output.connect(destination || destination.input);
  }

  disconnect() {
    this.output.disconnect();
  }
}

export default Meter;