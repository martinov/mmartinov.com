import { define } from "../../utils.ts";

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
  preferredTime?: string;
}

export const handler = define.handlers({
  async POST(ctx) {
    try {
      const data: ContactFormData = await ctx.req.json();

      // Validate required fields
      if (!data.name || !data.email || !data.message) {
        return new Response(
          JSON.stringify({ error: "Missing required fields" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        return new Response(
          JSON.stringify({ error: "Invalid email address" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // Log the submission (in production, this would send an email)
      console.log("Contact form submission:", {
        timestamp: new Date().toISOString(),
        name: data.name,
        email: data.email,
        company: data.company || "N/A",
        message: data.message,
        preferredTime: data.preferredTime || "N/A",
      });

      // TODO: In production, integrate with email service (e.g., Resend, SendGrid)
      // Example with Resend:
      // await resend.emails.send({
      //   from: 'website@mmartinov.com',
      //   to: 'me@mmartinov.com',
      //   subject: `New contact form submission from ${data.name}`,
      //   html: `
      //     <h2>New Contact Form Submission</h2>
      //     <p><strong>Name:</strong> ${data.name}</p>
      //     <p><strong>Email:</strong> ${data.email}</p>
      //     <p><strong>Company:</strong> ${data.company || 'N/A'}</p>
      //     <p><strong>Message:</strong></p>
      //     <p>${data.message}</p>
      //     <p><strong>Preferred Time:</strong> ${data.preferredTime || 'N/A'}</p>
      //   `
      // });

      return new Response(
        JSON.stringify({ success: true, message: "Message received" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } catch (error) {
      console.error("Error processing contact form:", error);
      return new Response(
        JSON.stringify({ error: "Internal server error" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  },
});
