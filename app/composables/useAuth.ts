export const useAuth = () => {
  const sessionUser = useState<{ id: number; username: string } | null>('user', () => null)

  const fetchSession = async () => {
    try {
      const data = await $fetch<{ id: number; userName: string }>(
        '/api/v1/auth/session', 
        { credentials: 'include' })
      
        sessionUser.value = data
    
      } catch {
      sessionUser.value = null
    
    }
  
  }

  const login = async (credentials: { username: string; password: string }) => {
    // Spring Boot 로그인 엔드포인트 호출
    await $fetch('/api/v1/auth/login', {
      method: 'POST',
      body: credentials,
      credentials: 'include', // 세션 쿠키 수신을 위해 필수
    
    })
    
    await fetchSession()

    if (sessionUser.value) {
      return navigateTo('/')
    
    }

  }

  const logout = async () => {
    await $fetch('/api/v1/auth/logout', { method: 'POST', credentials: 'include' })
    sessionUser.value = null
    
    return navigateTo('/login')
  
  }

  return { sessionUser, fetchSession, login, logout }

}