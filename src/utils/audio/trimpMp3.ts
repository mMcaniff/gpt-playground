const audioCtx = new AudioContext();

const trimpMp3 = (mp3: Blob, duration: number) => {
  return new Promise<Blob>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function() {
      audioCtx.decodeAudioData(reader.result as ArrayBuffer, function(buffer) {
        const mp3Duration = buffer.duration;
        let newBuffer;

        let startSample;
        let endSample;
        if (mp3Duration > duration) {
          const newDuration = duration;
          const startTime = 0;
          const endTime = startTime + newDuration;
          startSample = startTime * buffer.sampleRate;
          endSample = endTime * buffer.sampleRate;
          const newLength = endSample - startSample;

          newBuffer = audioCtx.createBuffer(
            buffer.numberOfChannels,
            newLength,
            buffer.sampleRate
          );

          for (let channel = 0; channel < buffer.numberOfChannels; channel++) {
            newBuffer.getChannelData(channel).set(
              buffer.getChannelData(channel).slice(startSample, endSample)
            );
          }
        } else {
          newBuffer = buffer;
          startSample = 0;
          endSample = 100;
        }

        const source = audioCtx.createBufferSource();
        // set the buffer in the AudioBufferSourceNode
        source.buffer = newBuffer;

        // connect the AudioBufferSourceNode to the
        // destination so we can hear the sound
        source.connect(audioCtx.destination);

        const newBufferArray = [newBuffer];
        console.log(newBufferArray)
        //const audioBlob = new Blob(newBufferArray, { type: "audio/mp3" });
        
        const audioBlob = mp3.slice(startSample, endSample, "audio/mp3")
        resolve(audioBlob);
      });
    };

    reader.onerror = function(error) {
      reject(error);
    };

    reader.readAsArrayBuffer(mp3);
  });
};

export default trimpMp3;
