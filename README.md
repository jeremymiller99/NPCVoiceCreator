# NPC Voice Creator

Transform your voice recordings into stylized NPC character speech!

## Features

- **Easy File Upload**: Drag and drop or click to select audio files
- **Real-time Preview**: Listen to your original audio before conversion
- **Adjustable Parameters**: Fine-tune all settings
  - **Pitch Shift**: From deep to squeaky
  - **Speed**: Control speech rate
  - **Segment Length**: Chunk size
  - **Pitch Variation**: Random pitch changes
- **Randomize Settings**: Generate random combinations
- **Download**: Export as WAV file

## How to Use

1. **Open the Application**
   - Simply open `index.html` in your web browser
   - Works best in Chrome, Firefox, or Edge

2. **Upload Your Audio**
   - Click "Choose Audio File" button
   - Select any audio file (MP3, WAV, OGG, etc.)
   - Your original audio will appear for preview

3. **Adjust Parameters**
   - Use the sliders to fine-tune the NPC voice effect
   - Experiment with different combinations
   - Try the Randomize button for random settings

4. **Convert**
   - Click "Convert to NPC Voice" button
   - Wait for processing to complete
   - Listen to your converted audio!

5. **Download**
   - Click "Download NPC Voice" to save the file
   - File will be saved as `[original-name]_NPCvoice.wav`

## Tips for Best Results

- **Clear Speech**: Use recordings with clear, distinct speech
- **Minimal Background Noise**: Cleaner audio produces better results
- **Experiment with Settings**: 
  - Lower pitch (1.0-1.5) = deeper, more serious voices
  - Higher pitch (2.0-3.0) = cute, playful voices
  - Faster speed (2.0+) = makes speech unintelligible like NPC voice
  - Slower speed (0.5-1.0) = more understandable but still stylized
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

This tool uses advanced audio processing to create stylized NPC character speech. The conversion process involves several key steps:

### 1. Audio Segmentation
Your audio is divided into small time-based segments (controlled by the Segment Length parameter). Each segment represents a single sound or syllable.

### 2. Pitch Shifting
Each segment undergoes pitch modification to create the characteristic high-pitched voice. The base Pitch Shift parameter sets the overall pitch level, while Pitch Variation adds randomness to make each segment unique.

### 3. Time Compression
Segments are sped up according to the Speed parameter, creating the rapid-fire speech pattern typical of NPC dialogue.

### 4. Reassembly
The processed segments are reconnected with small gaps between them, creating the distinctive choppy, staccato effect characteristic of NPC speech.

## Notes

- Larger audio files may take longer to process
- Processing happens in your browser - no data is uploaded
- All audio remains private on your device


