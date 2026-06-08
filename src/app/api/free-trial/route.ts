import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // 1. Save the Lead to the Supabase Database
    const { error } = await supabase
      .from('leads')
      .insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone || null,
        }
      ]);

    if (error) {
      console.error("Supabase Error saving lead:", error);
      throw error;
    }

    console.log("New Free Trial Account Saved in Supabase:", data.email);

    // 2. Return success
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
