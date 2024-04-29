import Modal from "@/components/ui/User/Login/Modal/Modal";
import { UserSmall } from "@/model/stay.model";
import { prisma } from "@/prisma/prisma";
import { faker } from "@faker-js/faker";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";

export default function LoginPage() {
  const signUpWithPassword = async (formData: FormData): Promise<UserSmall> => {
    "use server";
    const supabase = createServerActionClient({
      cookies,
    });

    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const dob = formData.get("dob");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstName,
          lastName,
          dob,
          imgUrl: faker.image.avatar(),
        },
        emailRedirectTo: `http://localhost:3000/auth/callback`,
      },
    });

    if (error) throw new Error(error.message);
    if (!data || !data.user) throw new Error("no data");

    const profile = await prisma.profile.create({
      data: {
        isOwner: false,
        supabaseId: data.user.id,
      },
    });
    const { isOwner, id } = profile;
    return {
      isOwner,
      id,
      lastName: data.user.user_metadata.lastName,
      firstName: data.user.user_metadata.firstName,
      email: data.user.email || "",
      likes: [],
      imgUrl: data.user.user_metadata.imgUrl,
    };
  };

  const logInWithPassword = async (formData: FormData): Promise<UserSmall> => {
    "use server";

    const supabase = createServerActionClient({
      cookies,
    });

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);

    const _user = await prisma.profile.findUnique({
      where: { supabaseId: data.user.id },
    });

    if (!_user) throw new Error("no profile");

    return {
      isOwner: _user.isOwner,
      id: _user.id,
      lastName: data.user.user_metadata.lastName,
      firstName: data.user.user_metadata.firstName,
      email: data.user.email || "",
      imgUrl: data.user.user_metadata.imgUrl,
      likes: [],
    };
  };

  const signInWithSocial = async (
    type: "google" | "facebook"
  ): Promise<string> => {
    "use server";
    const supabase = createServerActionClient({
      cookies,
    });
    const origin = headers().get("origin");

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
