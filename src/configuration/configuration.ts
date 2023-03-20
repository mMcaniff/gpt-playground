export const navigationConfig = [
  { label: "Home", path: "/", key: 0},
  { label: "Map", path: "/map", key: 2 },
  { label: "Create Image", path: "/oi-create-image", key: 3 },
  { label: "Tasks", path: "/tasks", key: 4 },
  { label: "IDE", path: "/ide", key: 5 },
  { label: "Steller Admin Tool", path: "/steller-admin-tool", key: 6 },
];

export const awsConfig = {
  accessKeyId: "",
  secretAccessKey: "",
  region: "us-west-1",
  bucketName: "print-media",
}

export const googleConfig = {
  accessKeyId: "",
  speechRecognizeEndpoint: "https://speech.googleapis.com/v1/speech:recognize",
}

export const openAIConfig = {
  accessKeyId: "",

  imageGenerationEndpoint: "https://api.openai.com/v1/images/generations",
  textGenerationEndpoint: "https://api.openai.com/v1/completions",

  imageModels: {
    default: "image-alpha-001",
  },

  textModels: {
    default: "text-davinci-003",
  },
}

export const stellerConfig = {
  stellerAccessKeyId: "", 
  bingAccessToken: "",
}
