import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const { error } = await supabase
      .from('workers')
      .insert([
        {
          name: data.name,
          email: data.email,
          status: 'Offline',
          rating: 0,
          earnings: 0
        }
      ]);

    if (error) {
      console.error("Supabase Error saving worker:", error);
      throw error;
    }

    return NextResponse.json({ success: true, message: "Worker added successfully" });
  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add worker' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const data = await request.json();
    
    const { error } = await supabase
      .from('workers')
      .delete()
      .eq('id', data.worker_id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, message: "Worker deleted successfully" });
  } catch (error) {
    console.error('Deletion error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete worker' },
      { status: 500 }
    );
  }
}
