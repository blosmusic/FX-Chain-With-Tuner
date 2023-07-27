const select = document.getElementById("audio-devices-input");
const selectedOptions = document.getElementById("audio-source");

// Get the available audio devices

// Handle device selection change
select.addEventListener("change", async () => {
  const selectedDeviceId = select.value;

  // Check if there is an active MediaStream and disconnect it
  if (mediaStream && sourceNode) {
    sourceNode.disconnect();
    mediaStream.getTracks().forEach((track) => track.stop());
  }

  try {
    // Create a MediaStream using the selected audio device
    mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: { deviceId: selectedDeviceId },
    });

    // Create a MediaStreamAudioSourceNode
    sourceNode = audioContext.createMediaStreamSource(mediaStream);

    // Connect the source node to the audio context destination
    // sourceNode.connect(audioContext.destination);
  } catch (error) {
    console.error("Error accessing audio device:", error);
  }
});

// Enumerate audio devices after user permission is granted
navigator.mediaDevices
  .getUserMedia({ audio: true })
  .then(() => {
    // Enumerate audio devices
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        // Filter audio input devices
        const audioInputDevices = devices.filter(
          (device) => device.kind === "audioinput"
        );

        // Populate the select element with audio input devices
        audioInputDevices.forEach((device) => {
          const option = document.createElement("option");
          option.value = device.deviceId;
          option.text = device.label || `Audio Input ${device.deviceId}`;
          select.appendChild(option);
        });
      })
      .catch((error) => {
        console.error("Error enumerating audio devices:", error);
      });
  })
  .catch((error) => {
    console.error("Error accessing audio device:", error);
  });
