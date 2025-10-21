// Audio processing variables
let audioContext;
let audioBuffer;
let originalFileName = '';

// DOM elements
const audioFileInput = document.getElementById('audioFile');
const fileNameDisplay = document.getElementById('fileName');
const originalPlayer = document.getElementById('originalPlayer');
const originalAudioSection = document.getElementById('originalAudio');
const controlsSection = document.getElementById('controlsSection');
const resultSection = document.getElementById('resultSection');
const convertedPlayer = document.getElementById('convertedPlayer');
const processingIndicator = document.getElementById('processingIndicator');

// Control elements
const pitchShiftInput = document.getElementById('pitchShift');
const speedMultiplierInput = document.getElementById('speedMultiplier');
const choppinessInput = document.getElementById('choppiness');
const pitchVariationInput = document.getElementById('pitchVariation');

const pitchValueDisplay = document.getElementById('pitchValue');
const speedValueDisplay = document.getElementById('speedValue');
const choppinessValueDisplay = document.getElementById('choppinessValue');
const pitchVariationValueDisplay = document.getElementById('pitchVariationValue');

const convertBtn = document.getElementById('convertBtn');
const randomizeBtn = document.getElementById('randomizeBtn');
const resetBtn = document.getElementById('resetBtn');
const downloadBtn = document.getElementById('downloadBtn');

// Initialize AudioContext
function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

// Update value displays
pitchShiftInput.addEventListener('input', (e) => {
    pitchValueDisplay.textContent = e.target.value;
});

speedMultiplierInput.addEventListener('input', (e) => {
    speedValueDisplay.textContent = e.target.value;
});

choppinessInput.addEventListener('input', (e) => {
    choppinessValueDisplay.textContent = e.target.value;
});

pitchVariationInput.addEventListener('input', (e) => {
    pitchVariationValueDisplay.textContent = e.target.value;
});

// Handle file upload
audioFileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    originalFileName = file.name.split('.')[0];
    fileNameDisplay.textContent = file.name;
    
    // Show original audio player
    const url = URL.createObjectURL(file);
    originalPlayer.src = url;
    originalAudioSection.style.display = 'block';
    
    // Load audio into buffer
    initAudioContext();
    const arrayBuffer = await file.arrayBuffer();
    audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
    // Show controls
    controlsSection.style.display = 'block';
    resultSection.style.display = 'none';
});

// Randomize settings
randomizeBtn.addEventListener('click', () => {
    // Generate random values within each slider's range
    const randomPitch = (Math.random() * 2.0 + 1.0).toFixed(1); // 1.0 to 3.0
    const randomSpeed = (Math.random() * 2.0 + 0.5).toFixed(1); // 0.5 to 2.5
    const randomChoppiness = (Math.random() * 0.14 + 0.01).toFixed(2); // 0.01 to 0.15
    const randomPitchVar = (Math.random() * 0.5).toFixed(2); // 0.0 to 0.5
    
    pitchShiftInput.value = randomPitch;
    speedMultiplierInput.value = randomSpeed;
    choppinessInput.value = randomChoppiness;
    pitchVariationInput.value = randomPitchVar;
    
    pitchValueDisplay.textContent = randomPitch;
    speedValueDisplay.textContent = randomSpeed;
    choppinessValueDisplay.textContent = randomChoppiness;
    pitchVariationValueDisplay.textContent = randomPitchVar;
});

// Reset settings to default
resetBtn.addEventListener('click', () => {
    pitchShiftInput.value = 1.8;
    speedMultiplierInput.value = 1.4;
    choppinessInput.value = 0.05;
    pitchVariationInput.value = 0.15;
    
    pitchValueDisplay.textContent = '1.8';
    speedValueDisplay.textContent = '1.4';
    choppinessValueDisplay.textContent = '0.05';
    pitchVariationValueDisplay.textContent = '0.15';
});

// Convert audio to NPC voice
convertBtn.addEventListener('click', async () => {
    if (!audioBuffer) return;
    
    processingIndicator.style.display = 'flex';
    convertBtn.disabled = true;
    resultSection.style.display = 'none';
    
    try {
        // Get parameters
        const pitchShift = parseFloat(pitchShiftInput.value);
        const speedMultiplier = parseFloat(speedMultiplierInput.value);
        const choppiness = parseFloat(choppinessInput.value);
        const pitchVariation = parseFloat(pitchVariationInput.value);
        
        // Process audio
        const convertedBuffer = await processToNPCVoice(
            audioBuffer,
            pitchShift,
            speedMultiplier,
            choppiness,
            pitchVariation
        );
        
        // Create blob and URL for playback
        const wavBlob = audioBufferToWav(convertedBuffer);
        const url = URL.createObjectURL(wavBlob);
        
        convertedPlayer.src = url;
        resultSection.style.display = 'block';
        
        // Setup download
        downloadBtn.onclick = () => {
            const a = document.createElement('a');
            a.href = url;
            a.download = `${originalFileName}_NPCvoice.wav`;
            a.click();
        };
        
    } catch (error) {
        console.error('Error processing audio:', error);
        alert('Error processing audio. Please try again with a different file.');
    } finally {
        processingIndicator.style.display = 'none';
        convertBtn.disabled = false;
    }
});

// Process audio to NPC voice style
async function processToNPCVoice(buffer, basePitchShift, speedMultiplier, choppiness, pitchVariation) {
    const sampleRate = buffer.sampleRate;
    const numberOfChannels = buffer.numberOfChannels;
    
    // Segment size (in seconds) - how long each "syllable" chunk is
    const segmentDuration = choppiness;
    const segmentSamples = Math.floor(sampleRate * segmentDuration);
    
    // Calculate total segments
    const totalSegments = Math.ceil(buffer.length / segmentSamples);
    
    // Process each channel separately
    const processedChannels = [];
    
    for (let channel = 0; channel < numberOfChannels; channel++) {
        const channelData = buffer.getChannelData(channel);
        const outputData = [];
        
        // Process each segment
        for (let segIdx = 0; segIdx < totalSegments; segIdx++) {
            const startSample = segIdx * segmentSamples;
            const endSample = Math.min(startSample + segmentSamples, channelData.length);
            const segmentLength = endSample - startSample;
            
            // Random pitch shift for this segment
            const randomPitchMod = 1 + (Math.random() - 0.5) * pitchVariation;
            const finalPitch = basePitchShift * randomPitchMod;
            
            // Extract segment
            const segment = channelData.slice(startSample, endSample);
            
            // Apply pitch shift and speed to this segment
            const processedSegment = pitchShiftSegment(
                segment, 
                finalPitch, 
                speedMultiplier,
                sampleRate
            );
            
            // Add processed segment to output
            outputData.push(...processedSegment);
            
            // Add small gap between segments for choppiness effect
            const gapSamples = Math.floor(segmentSamples * 0.05);
            for (let i = 0; i < gapSamples; i++) {
                outputData.push(0);
            }
        }
        
        processedChannels.push(new Float32Array(outputData));
    }
    
    // Create new audio buffer with processed data
    const outputLength = processedChannels[0].length;
    const outputBuffer = audioContext.createBuffer(
        numberOfChannels,
        outputLength,
        sampleRate
    );
    
    for (let channel = 0; channel < numberOfChannels; channel++) {
        outputBuffer.copyToChannel(processedChannels[channel], channel);
    }
    
    return outputBuffer;
}

// Pitch shift a single segment using simple resampling
function pitchShiftSegment(segment, pitchShift, speedMultiplier, sampleRate) {
    // Combined rate change
    const rateChange = pitchShift * speedMultiplier;
    
    // Calculate new length
    const newLength = Math.floor(segment.length / rateChange);
    const output = new Float32Array(newLength);
    
    // Resample with linear interpolation
    for (let i = 0; i < newLength; i++) {
        const srcIndex = i * rateChange;
        const srcIndexFloor = Math.floor(srcIndex);
        const srcIndexCeil = Math.min(srcIndexFloor + 1, segment.length - 1);
        const fraction = srcIndex - srcIndexFloor;
        
        // Linear interpolation
        if (srcIndexFloor < segment.length) {
            output[i] = segment[srcIndexFloor] * (1 - fraction) + 
                       segment[srcIndexCeil] * fraction;
        }
    }
    
    // Apply envelope to avoid clicks
    const fadeLength = Math.min(50, Math.floor(output.length * 0.1));
    for (let i = 0; i < fadeLength; i++) {
        const fadeIn = i / fadeLength;
        const fadeOut = (output.length - 1 - i) / fadeLength;
        
        if (i < output.length) {
            output[i] *= fadeIn;
        }
        if (output.length - 1 - i >= 0) {
            output[output.length - 1 - i] *= Math.min(fadeOut, 1);
        }
    }
    
    return output;
}

// Convert AudioBuffer to WAV blob
function audioBufferToWav(buffer) {
    const numberOfChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;
    
    const bytesPerSample = bitDepth / 8;
    const blockAlign = numberOfChannels * bytesPerSample;
    
    const data = [];
    for (let i = 0; i < buffer.length; i++) {
        for (let channel = 0; channel < numberOfChannels; channel++) {
            const sample = buffer.getChannelData(channel)[i];
            // Convert to 16-bit PCM
            const int16 = Math.max(-1, Math.min(1, sample)) * 0x7FFF;
            data.push(int16);
        }
    }
    
    const dataSize = data.length * bytesPerSample;
    const bufferSize = 44 + dataSize;
    const arrayBuffer = new ArrayBuffer(bufferSize);
    const view = new DataView(arrayBuffer);
    
    // Write WAV header
    const writeString = (offset, string) => {
        for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    };
    
    writeString(0, 'RIFF');
    view.setUint32(4, bufferSize - 8, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true); // fmt chunk size
    view.setUint16(20, format, true);
    view.setUint16(22, numberOfChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * blockAlign, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitDepth, true);
    writeString(36, 'data');
    view.setUint32(40, dataSize, true);
    
    // Write audio data
    let offset = 44;
    for (let i = 0; i < data.length; i++) {
        view.setInt16(offset, data[i], true);
        offset += 2;
    }
    
    return new Blob([arrayBuffer], { type: 'audio/wav' });
}

