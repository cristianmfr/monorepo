import { Logo } from '@monorepo/ui/components/logo'

import { SignUpForm } from '@/components/forms/sign-up-form'

export default function Page() {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <div className='flex w-full max-w-sm flex-col items-center gap-6'>
        <Logo className='fill-foreground size-14' />

        <div className='flex flex-col items-center gap-1 text-center'>
          <h1 className='text-xl font-medium select-none'>Create an account</h1>
          <p className='text-muted-foreground text-sm text-balance select-none'>
            Enter your information below to create your account
          </p>
        </div>
      </div>

      <SignUpForm />
    </div>
  )
}
