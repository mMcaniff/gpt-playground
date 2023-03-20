import { openAIConfig } from "../../configuration/configuration";

const generateTextualResponsive = async (prompt: string): Promise<string> => {
  try {
    const response = await fetch(openAIConfig.textGenerationEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openAIConfig.accessKeyId}`
      },
      body: JSON.stringify({
        "prompt": prompt,
        "max_tokens": 2048,
        "temperature": 0.5,
        "model": openAIConfig.textModels.default,
      })
    });
  
    const data = await response.json();
    return data.choices[0].text;
  } catch (error) {
    // Handle the error here
    console.error(error);
    return "Error Generating Response... Check logs for more information.";
  }
}

export default generateTextualResponsive;
