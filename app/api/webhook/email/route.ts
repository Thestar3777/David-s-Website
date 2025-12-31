import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const payload = await req.text(); // Get raw body for verification
    const sigId = req.headers.get('svix-id');
    const sigTimestamp = req.headers.get('svix-timestamp');
    const sigSignature = req.headers.get('svix-signature');

    // 1. Verify the webhook signature (Security Best Practice)
    if (!sigId || !sigTimestamp || !sigSignature) {
      return NextResponse.json({ error: 'Missing headers' }, { status: 400 });
    }

    const result = resend.webhooks.verify({
      payload,
      headers: {
        'svix-id': sigId,
        'svix-timestamp': sigTimestamp,
        'svix-signature': sigSignature,
      },
      secret: process.env.RESEND_WEBHOOK_SECRET!,
    });

    // 2. Handle the "email.received" event
    if (result.type === 'email.received') {
      const emailData = result.data;
      console.log('New email from:', emailData.from);
      console.log('Subject:', emailData.subject);
      console.log('Content:', emailData.text || emailData.html);
      
      // Add your logic here (e.g., save to database, forward to Slack)
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Webhook failed' }, { status: 400 });
  }
}