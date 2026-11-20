'use client'

import { ThemeProvider } from '@teispace/next-themes/client'

interface RootProviderProps {
  children: React.ReactNode
}

export function RootProvider({ children }: RootProviderProps) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='dark'
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
