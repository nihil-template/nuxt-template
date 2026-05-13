<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '~/utils/cn';

type ChatRole = 'user' | 'assistant';

type ChatMessage = {
  role: ChatRole;
  content: string;
};

type ChatRoom = {
  id: number;
  title: string;
  active?: boolean;
};

interface Props extends /* @vue-ignore */ VariantProps<typeof cssVariants> {
  class?: string;
  custom?: {
    div?: string;
  };
}

const props = defineProps<Props>();

const cssVariants = cva(
  [
    `h-full min-h-0 grid grid-cols-[292px_1fr] gap-4 bg-black-100 p-4`,
  ],
  {
    variants: {},
    defaultVariants: {},
    compoundVariants: [],
  },
);

const chatRooms = ref<ChatRoom[]>([
  {
    id: 1,
    title: '새 이미지 프롬프트',
    active: true,
  },
  {
    id: 2,
    title: '서리 기사 컨셉',
  },
  {
    id: 3,
    title: 'TRPG 파티 초상화',
  },
]);

const activeChatRoom = computed(() => chatRooms.value.find((room) => room.active) ?? chatRooms.value[0]);

const messages = ref<ChatMessage[]>([
  {
    role: 'assistant',
    content: '이미지 생성용 프롬프트를 같이 만들어볼게요. 만들고 싶은 캐릭터나 장면을 한 줄로 적어주세요.',
  },
]);
const inputMessage = ref('');
const isLoading = ref(false);
const errorMessage = ref('');

const canSubmit = computed(() => inputMessage.value.trim().length > 0 && !isLoading.value);

async function sendMessage() {
  const content = inputMessage.value.trim();

  if (!content || isLoading.value) {
    return;
  }

  errorMessage.value = '';

  const nextMessages: ChatMessage[] = [
    ...messages.value,
    {
      role: 'user',
      content,
    },
  ];

  messages.value = nextMessages;
  inputMessage.value = '';
  isLoading.value = true;

  try {
    const response = await $fetch<{
      message: ChatMessage;
      model: string;
    }>('/api/chat', {
      method: 'POST',
      body: {
        messages: nextMessages,
      },
    });

    messages.value = [
      ...nextMessages,
      response.message,
    ];
  }
  catch (error) {
    console.error(error);
    errorMessage.value = 'AI 응답을 가져오지 못했습니다. API 키와 서버 로그를 확인해주세요.';
    messages.value = nextMessages;
  }
  finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div :class='cn(cssVariants({}), props.class)'>
    <aside class='flex min-h-0 flex-col rounded-[28px] border border-black-200 bg-black-50 shadow-sm'>
      <div class='border-b border-black-200 p-4'>
        <button class='flex w-full items-center justify-center gap-2 rounded-full bg-black-900 px-3 py-3 text-sm font-700 text-white'>
          <Icon icon='mdi:plus' class='size-5' />
          <span>새 채팅</span>
        </button>
      </div>

      <nav class='min-h-0 flex-1 overflow-y-auto p-3'>
        <ul class='space-y-2'>
          <li v-for='room in chatRooms' :key='room.id'>
            <button
              type='button'
              class='w-full rounded-2xl border p-3 text-left transition'
              :class='room.active
                ? "border-black-300 bg-white shadow-sm"
                : "border-transparent bg-transparent hover:bg-white"'
            >
              <span class='block truncate text-sm font-800 text-black-900'>
                {{ room.title }}
              </span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>

    <main class='flex min-h-0 flex-col rounded-[28px] border border-black-200 bg-white shadow-sm'>
      <header class='flex items-center justify-between border-b border-black-200 px-6 py-4'>
        <h2 class='truncate text-lg font-900 text-black-950'>
          {{ activeChatRoom?.title }}
        </h2>

        <div class='flex items-center gap-2 rounded-full border border-black-200 px-3 py-1.5 text-xs text-black-600'>
          <span class='size-2 rounded-full bg-green-500' />
          <span>gpt-4o-mini · 대화 가능</span>
        </div>
      </header>

      <section class='min-h-0 flex-1 overflow-y-auto px-6 py-8'>
        <div class='mx-auto flex max-w-4xl flex-col gap-6'>
          <article
            v-for='(message, index) in messages'
            :key='`${message.role}-${index}`'
            class='flex gap-3'
            :class='message.role === "user" ? "justify-end" : "justify-start"'
          >
            <div
              v-if='message.role === "assistant"'
              class='flex size-9 shrink-0 items-center justify-center rounded-full bg-black-900 text-white'
            >
              <Icon icon='mdi:sparkles' class='size-5' />
            </div>

            <div
              class='max-w-[74%] whitespace-pre-wrap rounded-[24px] px-5 py-3 text-sm leading-7'
              :class='message.role === "user"
                ? "rounded-br-md bg-blue-600 text-white shadow-sm"
                : "rounded-bl-md border border-black-200 bg-black-50 text-black-900"'
            >
              {{ message.content }}
            </div>
          </article>

          <div v-if='isLoading' class='flex items-center gap-3 text-sm text-black-500'>
            <div class='flex size-9 items-center justify-center rounded-full bg-black-900 text-white'>
              <Icon icon='mdi:sparkles' class='size-5' />
            </div>
            <div class='rounded-[24px] rounded-bl-md border border-black-200 bg-black-50 px-5 py-4'>
              <span class='typing-dots' aria-label='AI가 답변을 작성하는 중입니다'>
                <span />
                <span />
                <span />
              </span>
            </div>
          </div>
        </div>
      </section>

      <footer class='px-6 pb-6'>
        <form class='mx-auto max-w-4xl' @submit.prevent='sendMessage'>
          <p v-if='errorMessage' class='mb-2 text-sm text-red-600'>
            {{ errorMessage }}
          </p>

          <div class='rounded-[28px] border border-black-200 bg-white p-3 shadow-[0_8px_30px_rgba(0,0,0,0.12)]'>
            <textarea
              v-model='inputMessage'
              rows='2'
              class='max-h-40 min-h-14 w-full resize-none bg-transparent px-3 py-2 text-sm leading-6 text-black-900 outline-none placeholder:text-black-500'
              placeholder='만들고 싶은 캐릭터의 컨셉을 입력하세요'
              @keydown.enter.exact.prevent='sendMessage'
            />

            <div class='flex justify-end px-1 pt-2'>
              <button
                type='submit'
                class='flex size-9 items-center justify-center rounded-full bg-black-900 text-white disabled:bg-black-300'
                :disabled='!canSubmit'
                title='전송'
              >
                <Icon icon='mdi:arrow-up' class='size-5' />
              </button>
            </div>
          </div>

          <p class='mt-2 text-center text-xs text-black-500'>
            Enter로 전송하고 Shift + Enter로 줄바꿈합니다.
          </p>
        </form>
      </footer>
    </main>
  </div>
</template>

<style scoped>
.typing-dots {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.typing-dots span {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 9999px;
  background: var(--color-black-500);
  animation: typing-bounce 1s infinite ease-in-out;
}

.typing-dots span:nth-child(2) {
  animation-delay: 0.14s;
}

.typing-dots span:nth-child(3) {
  animation-delay: 0.28s;
}

@keyframes typing-bounce {
  0%,
  80%,
  100% {
    transform: translateY(0);
    opacity: 0.45;
  }

  40% {
    transform: translateY(-0.25rem);
    opacity: 1;
  }
}
</style>
