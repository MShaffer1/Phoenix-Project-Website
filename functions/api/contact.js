
export async function onRequestPost({ request, env }) {
  const json = (data, status = 200) =>
    new Response(JSON.stringify(data), {
      status,
      headers: { "Content-Type": "application/json" },
    });

  try {
    const form = await request.formData();

    const name = (form.get("name") || "").toString().trim();
    const email = (form.get("email") || "").toString().trim();
    const message = (form.get("message") || "").toString().trim();

    if (!name || !email || !message) {
      return json({ error: "Please complete all fields." }, 400);
    }

    if (
      name.length > 150 ||
      email.length > 254 ||
      message.length > 10000 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return json({ error: "Please check your entries and try again." }, 400);
    }

    const emailResponse = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/email/sending/send`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.CF_EMAIL_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "contact@thephoenixproject4k.com",
          to: "thephoenixproject4k@gmail.com",
          reply_to: email,
          subject: `Website contact message from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        }),
      }
    );

    const result = await emailResponse.json();

    if (!emailResponse.ok || !result.success) {
      console.error("Cloudflare Email API error:", result.errors);
      return json(
        { error: "Your message could not be sent. Please try again later." },
        502
      );
    }

    return json({ success: true });
  } catch (error) {
    console.error("Contact function error:", error);
    return json(
      { error: "A connection error occurred. Please try again." },
      500
    );
  }
}
