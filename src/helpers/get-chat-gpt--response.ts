import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: import.meta.env.PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const chatGptResponse = async (pokemonName: string): Promise<string> => {
  delete configuration.baseOptions.headers["User-Agent"];

  const response = await openai.createCompletion({
    model: "text-ada-001",
    prompt: `Datos interesantes sobre el pokemon ${pokemonName}`,
    temperature: 0.68,
    max_tokens: 60,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return (
    response.data.choices.at(0)?.text ||
    `No tengo datos acerca de ${pokemonName}`
  );
};
