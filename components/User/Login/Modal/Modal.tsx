"use client";

import { useUserStore } from "@/store/useUserStore";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useActionState, useEffect, useRef, useState } from "react";
import styles from "./Modal.module.scss";
import { useModal } from "@/hooks/useModal";
import { login, signup } from "@/actions/auth.action";

export default function Modal() {
  const [isLogin, setIsLogin] = useState(false);
  const [stateLogin, loginAction, pendingLogin] = useActionState(
    login,
    null
  );
  const [stateSignup, signupAction, pendingSignUp] = useActionState(
    signup,
    null
  );



  const { setUser } = useUserStore();
  const modalRef = useRef<null | HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useModal(modalRef, null);

  const router = useRouter();

  return (
    <section ref={modalRef}>
      {isLogin ? (
        <form action={loginAction}>
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
        </form>
      ) : (
        <form action={signupAction}>
          <input type="text" name="firstName" placeholder="First Name" />
          <input type="text" name="lastName" placeholder="Last Name" />
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <input type="date" name="dob" />
        </form>
      )}
    </section>
  );
}
