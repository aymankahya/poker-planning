import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import FormField from '@/components/common/form/FormField';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import useSignup from '@/hooks/useSignup';

const SignUpFormSchema = z
  .object({
    firstName: z.string().min(3, { message: 'First name should be at least 3 characters long' }),
    lastName: z.string().min(3, { message: 'Last name should be at least 3 characters long' }),
    email: z.string().email({ message: 'Email should be a in a valid email format' }),
    password: z
      .string()
      .min(8, {
        message: 'Password must be at least 8 characters long',
      })
      .regex(/^(?!.*?(.)\1\1)/, {
        message: 'Password should not contain three or more consecutive identical characters',
      })
      .regex(/[a-z]/, {
        message: 'Password should contain at least one lowercase letter',
      })
      .regex(/[A-Z]/, {
        message: 'Password should contain at least one uppercase letter',
      })
      .regex(/\d/, {
        message: 'Password should contain at least one digit character',
      })
      .regex(/[\W_]/, {
        message: 'Password should contain at least one special character or underscore',
      }),
    confirmPassword: z.string(),
  })
  .superRefine((value, ctx) => {
    if (value.confirmPassword !== value.password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Password confirmation does not match the provided password',
        path: ['confirmPassword'],
      });
    }
  });

export type SignUpFormFields = z.infer<typeof SignUpFormSchema>;

export default function SignUpForm() {
  const { loading, signup } = useSignup();
  const form = useForm<SignUpFormFields>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<SignUpFormFields> = async (data) => {
    signup(data);
  };
  return (
    <Card className="z-30 mx-5 md:m-0 md:w-[500px]">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Enter an email and password to create an account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="flex flex-col gap-5 " onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-7">
              <FormField name="firstName" form={form} label="First Name" placeholder="Enter your First Name" />
              <FormField name="lastName" form={form} label="Last Name" placeholder="Enter your Last Name" />
            </div>
            <FormField name="email" form={form} label="Email" placeholder="Enter your email address" />
            <FormField name="password" form={form} label="Password" placeholder="Choose a Password" />
            <FormField
              name="confirmPassword"
              form={form}
              label="Password Confirmation"
              placeholder="Confirm your password"
            />
            <Button disabled={loading} type="submit">
              Sign In
            </Button>
          </form>
        </Form>
        <p className="typography-small flex justify-center mt-5 gap-1">
          Already have an account ?{' '}
          <span role="button" aria-labelledby="login-redirect">
            <Link
              id="login-redirect"
              to="/login"
              className="underline font-medium hover:font-bold after:block after:opacity-0 after:content-['Sign\uup'] after:h-0 after:font-bold transition-all ease-in-out duration-200"
            >
              Login
            </Link>
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
