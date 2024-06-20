import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function CreateAccount() {
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">Hello!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <input
            className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 focus:ring-2 ring-neutral-200 focus:ring-green-500 focus:ring-opacity-50 border-none placeholder:text-neutral-400"
            type="text"
            placeholder="Username"
            required
          />
          <span className="text-red-500 font-medium">Input error</span>
        </div>
        <button className="parimary-btn h-10">Create account</button>
      </form>
      <div className="w-full h-px bg-neutral-500"/>
      <div>
        <Link href="/sms" className="parimary-btn h-10 flex items-center justify-center gap-3">
          <span><ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6"/></span>
          <span>Sign up with SMS</span>
        </Link>
      </div>
    </div>
  );
}