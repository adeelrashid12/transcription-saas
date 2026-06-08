import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { job_id, worker_id } = await request.json();

    if (!job_id || !worker_id) {
      return NextResponse.json({ success: false, error: 'Missing job_id or worker_id' }, { status: 400 });
    }

    // Assign the job (works even if it's already assigned to someone else, Admin override)
    const { error: updateError } = await supabase
      .from('orders')
      .update({ 
        status: 'in-progress',
        assigned_worker_id: worker_id
      })
      .eq('id', job_id);

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json({ success: true, message: 'Job successfully assigned!' });
  } catch (error) {
    console.error('Error assigning job:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to assign job' },
      { status: 500 }
    );
  }
}
