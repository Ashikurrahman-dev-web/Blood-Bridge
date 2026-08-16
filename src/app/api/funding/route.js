import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { auth } from '@/lib/auth';

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get('origin');
    const userSession = await auth.api.getSession({ headers: await headers() });
    const user = userSession?.user;
    const formData = await request.formData();
    const amount = formData.get("amount")
    
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Blood Donation Funding',
            },
            unit_amount: Number(amount) * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: user?.id,
        userName: user?.name,
        userEmail: user?.email,
        userImage: user?.image,
        fundingAmount: amount,
      },
      mode: 'payment',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      integration_identifier: 'blood_donation_funding',
    });

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: err?.statusCode || 500 }
    );
  }
}