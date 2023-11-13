"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useRef } from "react";

function VerifyAccountForm() {
  const router = useRouter();
  const input2 = useRef<HTMLInputElement>(null);
  const input3 = useRef<HTMLInputElement>(null);
  const input4 = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    nextInput: React.RefObject<HTMLInputElement>,
  ) => {
    if (e.target.value.length === 1) {
      nextInput.current?.focus();
    }
  };
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <Card className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email sh**@gmail.com</p>
            </div>
          </div>

          <div>
            <div>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs ">
                  <div className="w-16 h-16 ">
                    <Input
                      className="w-full h-full flex-col items-center justify-center text-center px-5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="number"
                      maxLength={1}
                      onChange={(e) => handleInputChange(e, input2)}
                    />
                  </div>
                  <div className="w-16 h-16 ">
                    <Input
                      className="w-full h-full flex-col items-center justify-center text-center px-5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="number"
                      maxLength={1}
                      ref={input2}
                      onChange={(e) => handleInputChange(e, input3)}
                    />
                  </div>
                  <div className="w-16 h-16 ">
                    <Input
                      className="w-full h-full flex-col items-center justify-center text-center px-5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="number"
                      maxLength={1}
                      ref={input3}
                      onChange={(e) => handleInputChange(e, input4)}
                    />
                  </div>
                  <div className="w-16 h-16 ">
                    <Input
                      className="w-full h-full flex-col items-center justify-center text-center px-5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="number"
                      maxLength={1}
                      ref={input4}
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <Button
                      className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 border-none text-white text-sm shadow-sm"
                      onClick={() => {
                        router.push("/dashboard");
                      }}
                    >
                      Verify Account
                    </Button>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500 dark:text-gray-400">
                    <p>Didn&apos;t recieve code?</p>{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="http://"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Resend
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default VerifyAccountForm;
