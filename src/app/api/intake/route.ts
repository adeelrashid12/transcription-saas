import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Save the full order details into the Supabase database
    const { error } = await supabase
      .from('orders')
      .insert([
        {
          client_name: data.name,
          client_email: data.email,
          client_phone: data.phone || null,
          contact_method: data.contactMethod,
          billing_address: data.billingAddress,
          transcription_type: `${data.tier} (${data.type})`,
          audio_length_minutes: data.length ? parseInt(data.length) : null,
          number_of_files: data.files ? parseInt(data.files) : null,
          file_formats: data.formats,
          turnaround_time: data.turnaround,
          transcript_format: data.transcriptFormat,
          delivery_method: data.delivery,
          special_instructions: data.specialInstructions,
          spellings: data.spellings,
          exhibits: data.exhibits,
          status: 'pending'
        }
      ]);

    if (error) {
      console.error("Supabase Error saving order:", error);
      throw error;
    }

    console.log("Intake Form successfully saved to Supabase Orders table");
    
    return NextResponse.json({ success: true, message: "Intake form submitted successfully" });
  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process intake form' },
      { status: 500 }
    );
  }
}
