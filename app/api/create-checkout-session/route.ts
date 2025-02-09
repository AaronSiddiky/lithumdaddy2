import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error("Missing Stripe Secret Key");
    return NextResponse.json(
      { error: "Stripe configuration error" },
      { status: 500 }
    );
  }

  try {
    const { priceId } = await req.json();
    console.log('Received price ID:', priceId);

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16",
    });
    console.log('Stripe initialized');

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_URL}/settings?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing?canceled=true`,
      billing_address_collection: 'required',
      payment_method_types: ['card'],
    });

    console.log('Session created:', session.id);
    return NextResponse.json({ sessionId: session.id }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (err) {
    console.error("Stripe Error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Error creating checkout session" },
      { status: 500 }
    );
  }
} 