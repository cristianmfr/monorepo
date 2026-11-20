'use client'

import { Button } from '@monorepo/ui/components/button'
import { Field, FieldGroup, FieldLabel } from '@monorepo/ui/components/field'
import { Input } from '@monorepo/ui/components/input'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { z } from 'zod'

import { useZodForm } from '@/hooks/use-zod-form'
import { authClient } from '@/shared/auth-client'

const emailSchema = z.object({ email: z.email() })
const otpSchema = z.object({ otp: z.string().length(6) })

export function SignInForm() {
  const router = useRouter()

  const [step, setStep] = useState<'email' | 'otp'>('email')
  const [email, setEmail] = useState('')

  const emailForm = useZodForm(emailSchema)
  const otpForm = useZodForm(otpSchema)

  const onRequestOtp = emailForm.handleSubmit(async (formValues) => {
    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email: formValues.email,
      type: 'sign-in',
    })

    if (error) {
      return
    }

    setEmail(email)
    setStep('otp')
  })

  const onSignIn = otpForm.handleSubmit(async ({ otp }) => {
    const { error } = await authClient.signIn.emailOtp({ email, otp })

    if (error) {
      return
    }

    router.push('/')
  })

  if (step === 'otp') {
    return (
      <form onSubmit={onSignIn} className='flex w-full flex-col gap-4'>
        <FieldGroup>
          <Controller
            control={otpForm.control}
            name='otp'
            render={({ field }) => (
              <Field>
                <FieldLabel>Code</FieldLabel>
                <Input
                  {...field}
                  inputMode='numeric'
                  value={field.value ?? ''}
                  placeholder='000000'
                />
              </Field>
            )}
          />
          <Button className='w-full'>Sign in</Button>
        </FieldGroup>
      </form>
    )
  }

  return (
    <form onSubmit={onRequestOtp} className='flex w-full flex-col gap-4'>
      <FieldGroup>
        <Controller
          control={emailForm.control}
          name='email'
          render={({ field }) => (
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                {...field}
                type='email'
                value={field.value ?? ''}
                placeholder='example@email.com'
              />
            </Field>
          )}
        />
        <Button className='w-full'>Send code</Button>
      </FieldGroup>
    </form>
  )
}
