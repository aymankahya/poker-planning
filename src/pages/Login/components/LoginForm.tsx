import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import FormField from '@/components/common/form/FormField';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const LoginFormSchema = z.object({
  email: z.string().email('Email entered is not a valid email'),
  password: z.string(),
});

export type LoginFormFields = z.infer<typeof LoginFormSchema>;

type LoginFormProps = {
  login: (data: { email: string; password: string }) => Promise<void>;
  loading: boolean;
};

export default function LoginForm({ login, loading }: LoginFormProps) {
  const form = useForm<LoginFormFields>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginFormFields> = (data) => {
    login(data);
  };

  return (
    <Card className="z-30 mx-5 md:m-0 md:w-[500px] ">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your email and password to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="flex flex-col gap-5 " onSubmit={form.handleSubmit(onSubmit)}>
            <FormField name="email" form={form} label="Email" placeholder="Enter your Email" />
            <FormField name="password" form={form} label="Password" placeholder="Enter your Password" />
            <Button type="submit" disabled={loading}>
              Login
            </Button>
          </form>
        </Form>
        <p className="typography-small flex justify-center mt-5 gap-1">
          Don&apos;t have an account yet ?{' '}
          <span role="button" aria-labelledby="sign-up-redirect">
            <Link
              id="sign-up-redirect"
              to="/sign-up"
              className="underline font-medium hover:font-bold after:block after:opacity-0 after:content-['Sign\uup'] after:h-0 after:font-bold transition-all ease-in-out duration-200"
            >
              Sign up
            </Link>
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
