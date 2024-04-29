"use client";

import { UserSmall } from "@/model/stay.model";
import { useUserStore } from "@/store/useUserStore";
import { useRouter, useSearchParams } from "next/navigation";
import { Router } from "next/router";
import { FormEvent, useEffect, useRef, useState } from "react";

type Props = {
  login: (fromData: FormData) => Promise<UserSmall>;
  signup: (romData: FormData) => Promise<UserSmall>;
};

export default function Modal({ login, signup }: Props) {
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

  const clickOk = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const formData = new FormData(ev.currentTarget);
    let user :UserSmall;
    if (isLogin) {
      user = await login(formData);
    } else {
      user = await signup(formData);
    }
    setUser(user);
    closeModal();
  };

  const modal: JSX.Element | null =
    showModal === "y" ? (
      <dialog ref={modalRef}>
        <button onClick={closeModal}>X</button>
        <form onSubmit={clickOk}>
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
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Login" : "Signup"}
        </button>
      </dialog>
    ) : null;

  return modal;
}
