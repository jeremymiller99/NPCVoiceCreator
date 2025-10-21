# NPC Voice Creator

Transform your voice recordings into Animal Crossing style NPC speech (Animalese)!

## Features

- **Easy File Upload**: Drag and drop or click to select audio files
- **Real-time Preview**: Listen to your original audio before conversion
- **Customizable Parameters**: 
  - **Pitch Shift**: Adjust how high-pitched the voice sounds (1.0 - 3.0)
  - **Speed**: Control how fast the speech plays (1.0 - 2.5)
  - **Segment Length**: Size of each audio chunk in seconds (0.01 - 0.15, lower = choppier)
  - **Pitch Variation**: Random pitch changes between segments (0.0 - 0.5)
- **Randomize Settings**: Instantly generate random parameter combinations
- **Download Converted Audio**: Export your Animalese audio as a WAV file
- **Beautiful UI**: Modern, responsive design with smooth animations

## How to Use

1. **Open the Application**
   - Simply open `index.html` in your web browser
   - Works best in Chrome, Firefox, or Edge

2. **Upload Your Audio**
   - Click "Choose Audio File" button
   - Select any audio file (MP3, WAV, OGG, etc.)
   - Your original audio will appear for preview

3. **Adjust Parameters**
   - Use the sliders to fine-tune the Animalese effect
   - **Recommended starting values:**
     - Pitch Shift: 1.8
     - Speed: 1.4
     - Segment Length: 0.05
     - Pitch Variation: 0.15

4. **Convert**
   - Click "Convert to Animalese" button
   - Wait for processing to complete
   - Listen to your converted audio!
   - Try "Randomize Settings" to experiment with different voices!

5. **Download**
   - Click "Download NPC Voice" to save the file
   - File will be saved as `[original-name]_NPCvoice.wav`

## Tips for Best Results

- **Clear Speech**: Use recordings with clear, distinct speech
- **Minimal Background Noise**: Cleaner audio produces better results
- **Experiment**: Try different parameter combinations!
  - Higher pitch + faster speed = classic Animalese
  - Smaller segment length = more choppy/staccato effect
  - Higher pitch variation = more character personality

## Technical Details

- Built with vanilla HTML, CSS, and JavaScript
- Uses Web Audio API for all audio processing
- Client-side only - no server required
- No external dependencies
- Processes audio in real-time using OfflineAudioContext

## Browser Compatibility

- Chrome 14+
- Firefox 25+
- Edge 12+
- Safari 6+
- Opera 15+

## How It Works

This tool uses advanced audio processing to recreate the distinctive "Animalese" speech pattern from Animal Crossing games. The conversion process involves several key steps:

### 1. Audio Segmentation
Your audio is divided into small time-based segments (controlled by the Segment Length parameter). Each segment represents a single sound or syllable.

### 2. Pitch Shifting
Each segment undergoes pitch modification to create the characteristic high-pitched voice. The base Pitch Shift parameter sets the overall pitch level, while Pitch Variation adds randomness to make each segment unique.

### 3. Time Compression
Segments are sped up according to the Speed parameter, creating the rapid-fire speech pattern typical of NPC dialogue.

### 4. Reassembly
The processed segments are reconnected with small gaps between them, creating the distinctive choppy, staccato effect that makes Animalese instantly recognizable.

## Notes

- Larger audio files may take longer to process
- Processing happens in your browser - no data is uploaded
- All audio remains private on your device

## Customization

Feel free to modify the default parameters in the code:
- Open `index.html` and adjust the `value` attributes on the range inputs
- Open `styles.css` to customize colors and styling

