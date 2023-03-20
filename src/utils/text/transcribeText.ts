import { googleConfig } from "../../configuration/configuration";

const transcribeToText = async (audioChunks: BlobPart[], setProcessedText: (type: string) => void): Promise<void> => {
  const audioBlob = new Blob(audioChunks);
  const reader = new FileReader();
  reader.readAsDataURL(audioBlob);
  reader.onloadend = async () => {
    const base64data = reader.result as string;
    const audioContent = base64data.split(",")[1];
    const endpoint = `${googleConfig.speechRecognizeEndpoint}?key=${googleConfig.accessKeyId}`;
    const body = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        config: { encoding: "WEBM_OPUS", sampleRateHertz: 48000, languageCode: "en-US" },
        audio: { content: audioContent },
      }),
    };    
    const response = await fetch(endpoint, body);
    const data = await response.json();
    const { transcript } = data.results[0].alternatives[0];

    setProcessedText(transcript);
  };
};

export default transcribeToText;
