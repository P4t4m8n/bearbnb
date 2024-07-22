"use client";

import { useUserStore } from "@/store/useUserStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import styles from "./Modal.module.scss";
import { useModal } from "@/hooks/useModal";
import { login, signup } from "@/actions/auth.action";
import { useFormState } from "react-dom";

export default function LoginModel() {
  const [isLogin, setIsLogin] = useState(true);

  const { setUser } = useUserStore();
  const modalRef = useRef<HTMLDivElement>(null);
  const [openModal, setIsModel] = useModal(modalRef, onClose);

  const router = useRouter();
  const searchParams = useSearchParams();
  const showModal = searchParams.get("showDialog");

  useEffect(() => {
    setIsModel(!!showModal);
  }, [showModal]);

  function onClose() {
    setIsModel(false);

    router.push("/");
  }

  const onSubmit = async (ev: any) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    
    try {
      let user = null;
      if (isLogin) {
        user = await login(formData);
      } else {
        user = await signup(formData);
      }
      setUser(user);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  if (!openModal) return null;
  return (
    <section className={styles.modal} ref={modalRef}>
      <div className={styles.loginModelHeader}>
        <button onClick={onClose}>X</button>
        <h3>Log in or sign up</h3>
      </div>
      {isLogin ? (
        <form onSubmit={onSubmit}>
          <input type="email" name="email" placeholder="Email" />
          <input type="password" name="password" placeholder="Password" />
          <div className={styles.actions}>
            <button
              onClick={(ev) => {
                setIsLogin(false);
              }}
            >
              Not a user, Signup
            </button>
            <button type="submit">Login</button>
          </div>
        </form>
      ) : (
        <form onSubmit={onSubmit}>
          <h3>Legal name</h3>
          <input type="text" name="firstName" placeholder="First Name" />
          <input type="text" name="lastName" placeholder="Last Name" />
          <h3>Date of birth</h3>
          <input type="date" name="dob" />
          <h3>Contact info</h3>
          <input type="email" name="email" placeholder="Email" />
          <h3>Password</h3>
          <input type="password" name="password" placeholder="Password" />
          <div className={styles.actions}>
            <button
              onClick={(ev) => {
                setIsLogin(true);
              }}
            >
              Already a member, Login?
            </button>
            <button type="submit">Signup</button>
          </div>
        </form>
      )}
    </section>
  );
}
