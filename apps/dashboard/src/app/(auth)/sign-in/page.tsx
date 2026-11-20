import { Logo } from '@monorepo/ui/components/logo'

import { SignInForm } from '@/components/forms/sign-in-form'

export default function Page() {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <div className='flex w-full max-w-xs flex-col items-center gap-6'>
        <Logo className='fill-foreground size-14' />

        <div className='flex flex-col items-center gap-1 text-center'>
          <h1 className='text-xl font-medium select-none'>
            Sign in to your account
          </h1>
          <p className='text-muted-foreground text-sm text-balance select-none'>
            Enter your email below to sign in to your account
          </p>
        </div>

        <SignInForm />
      </div>
    </div>
  )
}
