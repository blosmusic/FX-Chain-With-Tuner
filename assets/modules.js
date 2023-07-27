// Pitch, Filters, and EQs
import {
  volumeFX,
  volumeSwitch,
} from "./modules/fxModulesInstances/volumeFX.js";
import {
  pitchShifterFX,
  pitchShifterSwitch,
} from "./modules/fxModulesInstances/pitchshifterFX.js";
import {
  compressorFX,
  compressorSwitch,
} from "./modules/fxModulesInstances/compressorFX.js";
import {
  autowahFX,
  autowahSwitch,
} from "./modules/fxModulesInstances/autowahFX.js";
// Gains, Distortions, Overdrives, and Fuzzes
import {
  trebleboostFX,
  trebleboostSwitch,
} from "./modules/fxModulesInstances/trebleboostFX.js";
import {
  distortionFX,
  distortionSwitch,
} from "./modules/fxModulesInstances/distortionFX.js";
import {
  distortionFX2,
  distortionSwitch2,
} from "./modules/fxModulesInstances/distortionPlusFX.js";
import {
  bitcrusherFX,
  bitcrusherSwitch,
} from "./modules/fxModulesInstances/bitcrusherFX.js";
import {
  chebyshevDistortionFX,
  chebyshevDistortionSwitch,
} from "./modules/fxModulesInstances/chebydistortionFX.js";
import { fuzzFX, fuzzSwitch } from "./modules/fxModulesInstances/fuzzFX.js";
// Modulation
import {
  chorusFX,
  chorusSwitch,
} from "./modules/fxModulesInstances/chorusFX.js";
import {
  phaserFX,
  phaserSwitch,
} from "./modules/fxModulesInstances/phaserFX.js";
import {
  tremoloFX,
  tremoloSwitch,
} from "./modules/fxModulesInstances/tremoloFX.js";
import {
  vibratoFX,
  vibratoSwitch,
} from "./modules/fxModulesInstances/vibratoFX.js";
// Delay and Reverb
import { delayFX, delaySwitch } from "./modules/fxModulesInstances/delayFX.js";
import {
  pingpongDelayFX,
  pingpongDelaySwitch,
} from "./modules/fxModulesInstances/pingpongDelayFX.js";
import {
  reverbFX,
  reverbSwitch,
} from "./modules/fxModulesInstances/reverbFX.js";
import {
  jcreverbFX,
  jcreverbSwitch,
} from "./modules/fxModulesInstances/jcreverbFX.js";
import {
  IRConvolverAmp,
  IRConvolverAmpPowerSwitch,
} from "./modules/fxModulesInstances/IRConvolverAmp.js";

// Create an array to host the FX modules
const fxModules = [];
// Create an array to host the FX module buttons
const fxButtons = [];

// add the fx modules to the fxModules array
// Pitch, Filters, and EQs
fxModules.push(volumeFX); // volume module
fxModules.push(pitchShifterFX); // pitch shifter module
fxModules.push(compressorFX); // compressor module
fxModules.push(autowahFX); // autowah module

// Gains, Distortions, Overdrives, and Fuzzes
fxModules.push(trebleboostFX); // treble boost module
fxModules.push(distortionFX); // distortion module
fxModules.push(distortionFX2); // distortion module 2
fxModules.push(bitcrusherFX); // bitcrusher module
fxModules.push(chebyshevDistortionFX); // chebyshev distortion module
fxModules.push(fuzzFX); // fuzz module

// Modulation
fxModules.push(chorusFX); // chorus module
fxModules.push(phaserFX); // phaser module
fxModules.push(tremoloFX); // tremolo module
fxModules.push(vibratoFX); // vibrato module

// Delay and Reverb
fxModules.push(delayFX); // delay module
fxModules.push(pingpongDelayFX); // pingpong delay module
fxModules.push(reverbFX); // reverb module
fxModules.push(jcreverbFX); // jcreverb module

// add the fx buttons to the fxButtons array
// Pitch, Filters, and EQs
fxButtons.push(volumeSwitch); // volume button
fxButtons.push(pitchShifterSwitch); // pitch shifter button
fxButtons.push(compressorSwitch); // compressor button
fxButtons.push(autowahSwitch); // autowah button

// Gains, Distortions, Overdrives, and Fuzzes
fxButtons.push(trebleboostSwitch); // treble boost button
fxButtons.push(distortionSwitch); // distortion button
fxButtons.push(distortionSwitch2); // distortion button 2
fxButtons.push(bitcrusherSwitch); // bitcrusher button
fxButtons.push(chebyshevDistortionSwitch); // chebyshev distortion button
fxButtons.push(fuzzSwitch); // fuzz button

// Modulation
fxButtons.push(chorusSwitch); // chorus button
fxButtons.push(phaserSwitch); // phaser button
fxButtons.push(tremoloSwitch); // tremolo button
fxButtons.push(vibratoSwitch); // vibrato button

// Delay and Reverb
fxButtons.push(delaySwitch); // delay button
fxButtons.push(pingpongDelaySwitch); // pingpong delay button
fxButtons.push(reverbSwitch); // reverb button
fxButtons.push(jcreverbSwitch); // jcreverb button

// add the IRConvolverAmp module and button to the fxModules and fxButtons arrays
fxModules.push(IRConvolverAmp);
fxButtons.push(IRConvolverAmpPowerSwitch);

export { fxModules, fxButtons };
