interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className='to-background mx-auto grid h-dvh w-full bg-linear-to-b from-neutral-900'>
      {children}
    </div>
  )
}
