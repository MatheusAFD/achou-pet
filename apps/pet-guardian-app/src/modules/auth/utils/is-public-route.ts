import { publicRoutes } from '@user-app/modules/@shared/constants'

export const isPublicRoute = (path: string) => {
  return publicRoutes.some((route) => {
    if (route.path.includes(':')) {
      const base = route.path.split('/:')[0]
      return path.startsWith(base + '/')
    }

    return path === route.path || path.startsWith(route.path + '/')
  })
}
