import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, property_id, type } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // In production, save to Supabase and send email via Resend
    console.log('Inquiry received:', { name, email, phone, message, property_id, type });

    return NextResponse.json({ success: true, message: 'Inquiry sent successfully' });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
