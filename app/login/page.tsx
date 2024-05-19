import Modal from "@/components/ui/User/Login/Modal/Modal";
import { UserSmallModel } from "@/model/user.model";
import { prisma } from "@/prisma/prisma";
import { faker } from "@faker-js/faker";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";

export default function LoginPage() {
  const supabase = createServerActionClient({
    cookies,
  });
  const origin = headers().get("origin");

  ///////////////////////////////////////////////////
  const signUpWithPassword = async (
    formData: FormData
  ): Promise<UserSmallModel> => {
    "use server";

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const dob = formData.get("dob") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `http://localhost:3000/auth/callback`,
      },
    });

    if (error) throw new Error(error.message);
    if (!data || !data.user) throw new Error("no data");

    const profile = await prisma.profile.create({
      data: {
        isOwner: false,
        supabaseId: data.user.id,
        firstName,
        lastName,
        dob: new Date(dob),
        imgUrl: faker.image.avatar(),
      },
    });
    const { isOwner, id } = profile;
    return {
      isOwner,
      id,
      lastName: profile.lastName,
      firstName: profile.firstName,
      email: data.user.email || "",
      likes: [],
      imgUrl: profile.imgUrl,
    };
  };
  ///////////////////////////////////////////////////
  const logInWithPassword = async (
    formData: FormData
  ): Promise<UserSmallModel> => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);

    const profile = await prisma.profile.findUnique({
      where: { supabaseId: data.user.id },
    });

    if (!profile) throw new Error("no profile");

    return {
      isOwner: profile.isOwner,
      id: profile.id,
      lastName: profile.lastName,
      firstName: profile.firstName,
      email: data.user.email || "",
      imgUrl: profile.imgUrl,
      likes: [],
    };
  };
  ///////////////////////////////////////////////////
  const signInWithSocial = async (
    type: "google" | "facebook"
  ): Promise<string> => {
    "use server";

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${origin}/api/auth/callback`,
      },
    });
    if (error || !data.url) {
      throw new Error(error?.message || "no url");
    }
    return data.url;
  };
  return (
    <Modal
      logInWithPassword={logInWithPassword}
      signUpWithPassword={signUpWithPassword}
      signInWIthSocial={signInWithSocial}
    ></Modal>
  );
}
