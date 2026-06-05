export default defineNuxtRouteMiddleware(async (to) => {
  
  const { sessionUser, fetchSession } = useAuth()

  await fetchSession()

  if (sessionUser.value && to.path === '/login') {
    return navigateTo('/')
  }

  if (!sessionUser.value && to.path !== '/login') {
    return navigateTo('/login')
  }
})