import { createOpenAI } from '@ai-sdk/openai';
import { generateText, type ModelMessage } from 'ai';
import { z } from 'zod';
import { buildMdDocsContext } from '../utils/md-docs';
import { baseSystemPrompt } from '../utils/system-prompt';

const chatMessageSchema = z.object({
  role: z.enum([ 'user', 'assistant', ]),
  content: z.string().trim().min(1),
});

const chatBodySchema = z.object({
  messages: z.array(chatMessageSchema).min(1),
});

export default defineEventHandler(async (event) => {
  const body = chatBodySchema.safeParse(await readBody(event));

  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid chat request.',
    });
  }

  const config = useRuntimeConfig();

  if (!config.openaiApiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'OPENAI_API_KEY is not set.',
    });
  }

  const openai = createOpenAI({
    apiKey: config.openaiApiKey,
  });

  const messages: ModelMessage[] = body.data.messages.map((message) => ({
    role: message.role,
    content: message.content,
  }));

  const docsContext = await buildMdDocsContext();

  const result = await generateText({
    model: openai(config.aiModel),
    system: [
      baseSystemPrompt,
      '',
      '[Project Markdown Documents]',
      docsContext,
    ].join('\n'),
    messages,
  });

  return {
    message: {
      role: 'assistant',
      content: result.text,
    },
    model: config.aiModel,
    usage: result.usage,
  };
});
