import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with a fallback so Vercel builds don't crash without ENV variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2025-02-24.acacia' as any,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { durationMinutes, tier, format } = body;

    // TODO: We will replace this with the exact pricing logic the client gives us.
    // For now, this is a placeholder calculation ($1.00 per minute).
    const pricePerMinute = 1.00;
    const totalAmountInCents = Math.round(durationMinutes * pricePerMinute * 100);

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${tier} Transcription (${format})`,
              description: `${durationMinutes} minutes of audio.`,
            },
            unit_amount: totalAmountInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      // Redirect URLs after successful or canceled payment
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe Error:", err.message);
    return NextResponse.json({ error: 'Error creating Stripe checkout session' }, { status: 500 });
  }
}
