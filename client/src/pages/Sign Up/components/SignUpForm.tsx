import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import FormField from '@/components/common/form/FormField';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const SignUpFormSchema = z
  .object({
    username: z
      .string()
      .min(5, {
        message: 'Username must be at least 5 characters long',
      })
      .includes('@', {
        message: 'Must include @',
      }),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters long',
    }),
    confirmPassword: z.string(),
  })
  .superRefine((value, ctx) => {
    if (value.confirmPassword !== value.password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Password confirmation must match the actual password',
        path: ['confirmPassword'],
      });
    }
  });

type SignUpFormFields = z.infer<typeof SignUpFormSchema>;

export default function SignUpForm() {
  const form = useForm<SignUpFormFields>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<SignUpFormFields> = () => {
    // Add sublit handling logic here
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
            <FormField name="username" form={form} label="Username" placeholder="Choose a Username" />
            <FormField name="password" form={form} label="Password" placeholder="Choose a Password" />
            <FormField
              name="confirmPassword"
              form={form}
              label="Password Confirmation"
              placeholder="Confirm your password"
            />
            <Button type="submit">Sign In</Button>
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
