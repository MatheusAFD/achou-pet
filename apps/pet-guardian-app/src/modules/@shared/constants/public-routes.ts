export const publicRoutes = [
  { path: '/auth/sign-in', whenAuthenticated: 'redirect' },
  { path: '/auth/sign-up', whenAuthenticated: 'redirect' },
  { path: '/auth/sign-out', whenAuthenticated: 'keep' },
  { path: '/guia-de-uso', whenAuthenticated: 'keep' },
  { path: '/pet', whenAuthenticated: 'keep' }
] as const
