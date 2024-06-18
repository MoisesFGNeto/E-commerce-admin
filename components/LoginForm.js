import { useSession, signIn} from "next-auth/react";
import Nav from "@/components/Nav";
import { useState } from "react";
import Link from "next/link";

export default function LoginForm() {
  const { data: session } = useSession(); 
  
  async function login() {
    await signIn('google');
  }
  if (!session) {
    return (
      <div class="max-w-md relative flex mx-auto mt-12 flex-col p-4 rounded-md text-black bg-white border-solid border-2 border-black-500">
        <div class="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">Welcome to my <span class="text-[#7747ff]">Admin</span></div>
        <div class="text-sm font-normal mb-4 text-center text-[#1e0e4b]">Log in to your account</div>
          <form class="flex flex-col gap-3">
            <div class="block relative"> 
              <label for="email" class="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Email</label>
              <input type="text" id="email" class="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] ring-offset-2  ring-gray-500 outline-0"/>
              <label>email: myecommerceadm2023@gmail.com</label>
            </div>
            <div class="block relative"> 
              <label for="password" class="block text-gray-600 cursor-text text-sm leading-[140%] font-normal mb-2">Password</label>
              <input type="text" id="password" class="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] ring-offset-2 ring-gray-500 outline-0"/>
              <label>password: ecommerce_test</label>
            </div>
            <div><a class="text-sm text-[#7747ff]" href="#">Forgot your password?</a></div>
            <button type="submit" class="bg-[#7747ff] w-max m-auto px-6 py-2 rounded text-white text-sm font-normal">
              Submit
            </button>
          </form>
      <div class="text-sm text-center mt-[1.6rem]">Don’t have an account yet? <a class="text-sm text-[#7747ff]" href="#">Sign up for free!</a></div>
    </div>
    );
  }
  }