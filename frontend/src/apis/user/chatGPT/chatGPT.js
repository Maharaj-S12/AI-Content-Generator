import axios from "axios";

export const generateContentAPI = async (userPrompt) => {
  const response = await axios.post(
    "https://ai-content-generator-1-ond7.onrender.com/api/v1/openai/generate-content",
    {
      prompt: userPrompt,
    },
    {
      withCredentials: true,
    }
  );
  return response?.data;
};
