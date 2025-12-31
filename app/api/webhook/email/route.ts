import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Parse the webhook payload
    const body = await req.json();

    // Verify webhook secret (optional but recommended)
    const webhookSecret = req.headers.get('x-resend-webhook-secret');

    if (process.env.RESEND_WEBHOOK_SECRET && webhookSecret !== process.env.RESEND_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Handle the webhook event
    const { type, data } = body;

    if (type === 'email.sent') {
      console.log('Email sent successfully:', data);
    } else if (type === 'email.delivered') {
      console.log('Email delivered:', data);
    } else if (type === 'email.bounced') {
      console.log('Email bounced:', data);
    } else if (type === 'email.complained') {
      console.log('Email complained:', data);
    } else if (type === 'email.opened') {
      console.log('Email opened:', data);
    } else if (type === 'email.clicked') {
      console.log('Email link clicked:', data);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook failed' }, { status: 400 });
  }
}