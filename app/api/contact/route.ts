import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Determine the email subject based on content
    const isTrainingRequest = message.toLowerCase().includes('training') || message.toLowerCase().includes('session');
    const subject = isTrainingRequest
      ? `New Training Session Request from ${name}`
      : `New Contact Form Message from ${name}`;

    const emailTitle = isTrainingRequest ? 'New Training Session Request' : 'New Contact Form Message';

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <anything>@onteeantof.resend.app', // verified domain
      to: [process.env.CONTACT_EMAIL || 'davidhervas777@gmail.com'],
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #DC2626;">${emailTitle}</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;">
            ${message}
          </p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e5e5;">
          <p style="font-size: 12px; color: #666;">
            This email was sent from your website contact form.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Email sent successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
