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

const detailsSchema = z.object({
  name: z.string(),
  email: z.email(),
})
const otpSchema = z.object({ otp: z.string().length(6) })

export function SignUpForm() {
  const router = useRouter()

  const [step, setStep] = useState<'details' | 'otp'>('details')
  const [details, setDetails] = useState({ name: '', email: '' })

  const detailsForm = useZodForm(detailsSchema)
  const otpForm = useZodForm(otpSchema)

  const onRequestOtp = detailsForm.handleSubmit(async (values) => {
    const { error } = await authClient.emailOtp.sendVerificationOtp({
      email: values.email,
      type: 'sign-in',
    })
    if (error) {
      return
    }
    setDetails(values)
    setStep('otp')
  })

  const onSignUp = otpForm.handleSubmit(async ({ otp }) => {
    const { error } = await authClient.signIn.emailOtp({
      email: details.email,
      otp,
      name: details.name,
    })
    if (error) {
      return
    }
    router.push('/')
  })

  if (step === 'otp') {
    return (
      <form onSubmit={onSignUp} className='flex w-full flex-col gap-4'>
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
          <Field>
            <Button type='submit' className='w-full'>
              Create account
            </Button>
          </Field>
        </FieldGroup>
      </form>
    )
  }

  return (
    <form onSubmit={onRequestOtp} className='flex w-full flex-col gap-4'>
      <FieldGroup>
        <Controller
          control={detailsForm.control}
          name='name'
          render={({ field }) => (
            <Field>
              <FieldLabel>Name</FieldLabel>
              <Input
                {...field}
                value={field.value ?? ''}
                placeholder='Your name'
              />
            </Field>
          )}
        />
        <Controller
          control={detailsForm.control}
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
        <Field>
          <Button type='submit' className='w-full'>
            Send code
          </Button>
        </Field>
      </FieldGroup>
    </form>
  )
}
