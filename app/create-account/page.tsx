"use client";

import FormBtn from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { createAccount } from "./actions";

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">Hello!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <FormInput
          type="text"
          name="username"
          placeholder="Username"
          required
        />
        <FormInput type="email" name="email" placeholder="Email" required />
        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <FormInput
          type="password"
          name="confirm-password"
          placeholder="Confirm Password"
          required
        />
        <FormBtn text="Create" />
      </form>
      <SocialLogin />
    </div>
  );
}
