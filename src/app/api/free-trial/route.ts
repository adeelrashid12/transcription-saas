import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // 1. Simulate saving the Lead to the Database
    console.log("New Free Trial Account Created:", data.email);
    console.log("Saving user contact info for future sales follow-up:", data);
    // TODO: Integrate with Prisma/Supabase here

    // 2. Simulate provisioning the 30 free minutes
    console.log("Provisioned 30 free AI minutes for account:", data.email);

    // 3. Return success
    return NextResponse.json(
      { message: "Account created successfully. 30 free minutes provisioned." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating free trial account:", error);
    return NextResponse.json(
      { error: "Failed to create account." },
      { status: 500 }
    );
  }
}
