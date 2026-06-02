import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // 1. Simulate saving to Database
    console.log("Saving intake form to database:", data);
    // TODO: Integrate with Prisma, Supabase, or MongoDB here

    // 2. Simulate sending Email to client and Admin Dashboard
    console.log("Sending email notification to admin with details:", data.name, data.email);
    // TODO: Integrate with SendGrid, Resend, or AWS SES here

    // 3. Return success
    return NextResponse.json(
      { message: "Intake form submitted successfully. We have received your project details." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing intake form:", error);
    return NextResponse.json(
      { error: "Failed to process intake form." },
      { status: 500 }
    );
  }
}
