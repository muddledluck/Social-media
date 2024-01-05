"use client";
import { loginFormValidationSchema } from "@/app/(auth)/(login)/loginForm.validator";
import ErrorMessage from "@/components/ErrorMessage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
interface ILoginFormInitialValues {
  email: string;
  password: string;
  rememberMe: boolean;
}
function LoginForm() {
  const router = useRouter();
  const formik = useFormik<ILoginFormInitialValues>({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: loginFormValidationSchema,
    onSubmit: (values) => {
      console.log({ values });
      router.push("/dashboard");
    },
  });

  return (
    <Card className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Sign in to your accountfdsafds
        </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="space-y-4 md:space-y-6">
            <div>
              <Input
                label="Your email"
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                {...formik.getFieldProps("email")}
              />
              <ErrorMessage
                content={formik.errors.email}
                shouldShow={!!formik.touched.email && !!formik.errors.email}
              />
            </div>
            <div>
              <Input
                label="Password"
                type="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                {...formik.getFieldProps("password")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <Checkbox
                  id="remember"
                  checked={formik.values.rememberMe}
                  onCheckedChange={(e) =>
                    formik.setFieldValue("rememberMe", !!e)
                  }
                />
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="remember"
                    className="text-gray-500 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <a
                href="#"
                className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Forgot password?
              </a>
            </div>
            <Button
              className="w-full  hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              type="submit"
            >
              Sign in
            </Button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?{" "}
              <Link
                href="/sign-up"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Card>
  );
}

export default LoginForm;
