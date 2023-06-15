import { MessageArraySchema } from "../../../lib/validators/message";
import {
  ChatGPTMessage,
  OpenAIStream,
  OpenAIStreamPayload,
} from "../../../lib/openai-stream";
import { chatbotPrompt } from "@/helpers/constants/chatbot-prompt";

export async function POST(req: Request, res: Response) {
  const { messages } = await req.json();
  const parsedMessages = MessageArraySchema.parse(messages);
  const outboundMessages: ChatGPTMessage[] = parsedMessages.map((message) => ({
    role: message.isUserMessage ? "user" : "system",
    content: message.text,
    id: message.id,
  }));
  outboundMessages.unshift({
    role: "system",
    content: chatbotPrompt,
  });
  //   Provided by openAI docs
  const payload: OpenAIStreamPayload = {
    model: `gpt-3.5-turbo`,
    messages: outboundMessages,
    temperature: 0.4,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 150,
    stream: true,
    n: 1,
  };
  const stream = await OpenAIStream(payload);
  return new Response(stream);
}
