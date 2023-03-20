import { openAIConfig } from "../../configuration/configuration";

const ImageGenerator = async (prompt: string): Promise<string> => {
  const response = await fetch(openAIConfig.imageGenerationEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openAIConfig.accessKeyId}`
    },
    body: JSON.stringify({
      "model": openAIConfig.imageModels.default,
      "prompt": prompt,
      "num_images": 1,
      "size": "512x512"
    })
  });
  const data = await response.json();
  return data.data[0].url;
}

export default ImageGenerator;