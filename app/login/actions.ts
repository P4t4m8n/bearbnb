// "use server";

// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
// import Form from "next/app";
// import useActionData from "next/app";
// import { cookies } from "next/headers";
// import { serverSupabase } from "@/util/supabase/server";

// export async function login(formData: FormData) {
//   // type-casting here for convenience
//   // in practice, you should validate your inputs
//   const data = {
//     email: formData.get("email") as string,
//     password: formData.get("password") as string,
//   };

//   const authData = await serverSupabase.auth.signInWithPassword(data);
//   console.log("authData:", authData);

//   if (authData.error) {
//     redirect("/error");
//   }

//   revalidatePath("/", "layout");
//   redirect("/");
// }

// export async function signup(formData: FormData) {
//   const data = {
//     email: formData.get("email") as string,
//     password: formData.get("password") as string,
//   };
//   console.log("Data during signup:", data);

//   const authData = await serverSupabase.auth.signUp(data);
//   if (authData.error) {
//     console.error("Signup error:", authData.error.message);
//     redirect("/error");
//     return
//   }
  

//     revalidatePath("/", "layout");
//     redirect("/");
//   } else {
//     console.error("Signup completed but no session was created");
//     redirect("/error");
//   }
// }

