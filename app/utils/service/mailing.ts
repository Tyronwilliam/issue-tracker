import axios from "axios";

export async function sendInvitationLink(
  email: string,
  htmlContent: string,
  subject: string
) {
  const API_KEY = process.env.NEXT_PUBLIC_BREVO_API_KEY;
  const API_BASE_URL = "https://api.brevo.com/v3";

  const data = {
    sender: {
      email: process.env.NEXT_PUBLIC_EMAIL,
    },
    to: [
      {
        email: email,
      },
    ],
    subject,
    htmlContent,
  };
  const response = await axios.post(`${API_BASE_URL}/smtp/email`, data, {
    headers: {
      "api-key": API_KEY,
    },
  });
  return response;
}
