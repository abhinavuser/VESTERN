"use server";

// Comment out the Resend import
// import { resend } from "@/utils/resend";

export async function subscribeAction(formData: FormData) {
  const email = formData.get("email") as string;

  // Comment out the Resend API call
  /*
  return resend.contacts.create({
    email,
    audienceId: process.env.RESEND_AUDIENCE_ID1,
  });
  */

  // Add a placeholder or log for testing
  console.log("Subscription received for:", email);
  return { success: true, message: "Subscription mock successful" };
}