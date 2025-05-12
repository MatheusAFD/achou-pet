export const publicRoutes = [
  { path: '/auth/sign-in', whenAuthenticated: 'redirect' },
  { path: '/auth/sign-up', whenAuthenticated: 'redirect' },
  { path: '/auth/sign-out', whenAuthenticated: 'keep' }
] as const
