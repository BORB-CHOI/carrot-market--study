"use server";

export async function smsVerifycation(prevState: any, formData: FormData) {
  const data = {
    number: formData.get("number"),
    token: formData.get("token"),
  };

  console.log(data);
}
