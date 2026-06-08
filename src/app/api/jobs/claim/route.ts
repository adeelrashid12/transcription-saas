import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { job_id, worker_id } = await request.json();

    if (!job_id || !worker_id) {
      return NextResponse.json({ success: false, error: 'Missing job_id or worker_id' }, { status: 400 });
    }

    // Verify the job is still pending (hasn't been claimed by someone else)
    const { data: job, error: fetchError } = await supabase
      .from('orders')
      .select('status, assigned_worker_id')
      .eq('id', job_id)
      .single();

    if (fetchError || !job) {
      return NextResponse.json({ success: false, error: 'Job not found' }, { status: 404 });
    }

    if (job.status !== 'pending' || job.assigned_worker_id !== null) {
      return NextResponse.json({ success: false, error: 'This job has already been claimed or is no longer available.' }, { status: 400 });
    }

    // Claim the job
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

    return NextResponse.json({ success: true, message: 'Job successfully claimed!' });
  } catch (error) {
    console.error('Error claiming job:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to claim job' },
      { status: 500 }
    );
  }
}
