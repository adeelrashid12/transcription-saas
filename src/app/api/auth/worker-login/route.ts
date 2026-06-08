import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    // Check if the worker exists in the database
    const { data: worker, error } = await supabase
      .from('workers')
      .select('*')
      .ilike('email', email)
      .single();

    if (error || !worker) {
      return NextResponse.json(
        { success: false, error: 'Worker not found. Please contact the administrator.' },
        { status: 401 }
      );
    }

    // Set them to Online
    await supabase.from('workers').update({ status: 'Online' }).eq('id', worker.id);

    return NextResponse.json({ success: true, worker });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process login' },
      { status: 500 }
    );
  }
}
