"use client";

import { UserSmall } from "@/model/stay.model";
import { useUserStore } from "@/store/useUserStore";
import { useRouter, useSearchParams } from "next/navigation";
import { Router } from "next/router";
import { FormEvent, MouseEvent, useEffect, useRef, useState } from "react";

type Props = {
  logInWithPassword: (fromData: FormData) => Promise<UserSmall>;
  signUpWithPassword: (romData: FormData) => Promise<UserSmall>;
  signInWIthSocial: (type: "google" | "facebook") => Promise<string>;
};

export default function Modal({
  logInWithPassword,
  signUpWithPassword,
  signInWIthSocial,
}: Props) {
  const searchParams = useSearchParams();
  const [isLogin, setIsLogin] = useState(false);
  const { setUser } = useUserStore();

  const modalRef = useRef<null | HTMLDialogElement>(null);
  const showModal = searchParams.get("showDialog");
  const router = useRouter();

  useEffect(() => {
    if (showModal === "y") {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [showModal]);

  const closeModal = () => {
    modalRef.current?.close();
    router.push("/");
  };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    let user: UserSmall;
    if (isLogin) {
      user = await logInWithPassword(formData);
    } else {
      user = await signUpWithPassword(formData);
    }
    setUser(user);
    closeModal();
  };

  const onSocialLogin = async (
    ev: MouseEvent<HTMLButtonElement>,
    type: "google" | "facebook"
  ) => {
    ev.preventDefault();
    const url = await signInWIthSocial(type);
    console.log("url:", url)
    window.location.href = url;
    // setUser(_user);
    // closeModal();
  };

  const modal: JSX.Element | null =
    showModal === "y" ? (
      <dialog ref={modalRef}>
        <button onClick={closeModal}>X</button>
        <form onSubmit={onSubmit}>
          {!isLogin && (
            <>
              <input
                placeholder="Last name"
                name="lastName"
                type="text"
                required
              />
              <input
                placeholder="First name"
                name="firstName"
                type="text"
                required
              />
              <input type="date" name="dob" />
            </>
          )}
          <input placeholder="Email" name="email" type="email" required />
          <input
            placeholder="Password"
            name="password"
            type="password"
            required
          />
          <button type="submit">Submit</button>
        </form>
        <button onClick={(ev) => onSocialLogin(ev, "facebook")}>
          Continue with Facebook
        </button>
        <button onClick={(ev) => onSocialLogin(ev, "google")}>
          Continue with Google
        </button>
        <button onClick={() => setIsLogin(!isLogin)}>
          {!isLogin ? "Login" : "Signup"}
        </button>
      </dialog>
    ) : null;

  return modal;
}
