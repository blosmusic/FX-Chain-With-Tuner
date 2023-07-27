class ButtonSwitch {
  constructor(updateCallback, moduleContainer) {
    this.button = null;
    this.on = false; // Set the initial state to off
    this.indicator = null;
    this.updateCallback = updateCallback; // Custom update callback function
    this.moduleContainer = moduleContainer; // Reference to the FX module's container element
    this.createButton(); // Create the button element
  }

  createButton() {
    // Create a container to hold the button and indicator
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    // Create a button element
    this.button = document.createElement("button");
    this.button.textContent = this.on ? "On" : "Off";

    // Create an indicator element for the button
    this.indicator = document.createElement("div");
    this.indicator.id = `${this.moduleContainer.id}-indicator`; // Set the id to `moduleContainerId-indicator`
    this.indicator.classList.add("indicator");
    this.indicator.style.backgroundColor = this.on ? "red" : "darkred";

    // Append the button and indicator to the moduleContainer
    buttonContainer.appendChild(this.button);
    buttonContainer.appendChild(this.indicator);

    // Append the buttonContainer to the moduleContainer
    this.moduleContainer.appendChild(buttonContainer);

    // Add a click event listener to the button
    this.button.addEventListener("click", () => {
      this.toggle();
      this.updateButtonAppearance();
    });


    return this.button;
  }

  toggle() {
    this.on = !this.on; // Toggle the state between on and off
    this.updateButtonAppearance();
    this.updateCallback(this.on); // Call the custom update callback function with the current state
  }

  updateButtonAppearance() {
    if (this.button) {
      this.button.textContent = this.on ? "On" : "Off";
      this.indicator.style.backgroundColor = this.on ? "red" : "darkred";
    }
  }
}

export default ButtonSwitch;
