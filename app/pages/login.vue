<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'

definePageMeta({ layout: false })

const { sessionUser, fetchSession, login } = useAuth()

await useAsyncData('session-check', async () => {
  await fetchSession()
  if (sessionUser.value) {
    await navigateTo('/')
  }
})

const state = reactive({
  username: '',
  password: ''
})

const error = ref('')
const loading = ref(false)
const toast = useToast()

async function onSubmit(event: FormSubmitEvent<any>) {
  loading.value = true
  error.value = ''

  try {
    await login(state)
  
  } catch (e: any) {
    toast.add({
      title: '로그인 오류',
      description: '입력한 계정이 존재하지 않습니다.',
      color: 'error'
  
    })
  } finally {
    loading.value = false
  
  }

}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-(--ui-bg)">
    <div class="w-full max-w-sm">

      <!-- 로고 영역 -->
      <div class="flex flex-col items-center gap-2 mb-8">
        <img src="/img/hcrm360-logo.png" />
      </div>

      <!-- 로그인 카드 -->
      <UCard>
        <UForm :state="state" class="space-y-4" @submit="onSubmit">

          <UFormField label="아이디" name="username">
            <UInput
              v-model="state.username"
              placeholder="아이디를 입력하세요"
              icon="i-lucide-user"
              size="md"
              class="w-full"
              :disabled="loading"
              autofocus
            />
          </UFormField>

          <UFormField label="비밀번호" name="password">
            <UInput
              v-model="state.password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              icon="i-lucide-lock"
              size="md"
              class="w-full"
              :disabled="loading"
            />
          </UFormField>

          <UButton
            type="submit"
            class="w-full justify-center"
            size="md"
            :loading="loading"
            :disabled="!state.username || !state.password"
          >
            로그인
          </UButton>

        </UForm>
      </UCard>

    </div>
  </div>
</template>