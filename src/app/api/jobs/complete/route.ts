import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { job_id, worker_id, delivery_url, delivery_notes } = await request.json();

    if (!job_id || !worker_id || !delivery_url) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Get the job
    const { data: job, error: jobError } = await supabase
      .from('orders')
      .select('status')
      .eq('id', job_id)
      .single();

    if (jobError || !job) throw new Error('Job not found');
    if (job.status === 'Completed' || job.status === 'In Review') {
      return NextResponse.json({ success: false, error: 'Job is already delivered' }, { status: 400 });
    }

    // 2. Update job status to In Review
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        status: 'In Review',
        delivery_url,
        delivery_notes
      })
      .eq('id', job_id);

    if (updateError) throw updateError;

    return NextResponse.json({ success: true, message: 'Job completed and delivered successfully' });
  } catch (error) {
    console.error('Delivery error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to complete job' },
      { status: 500 }
    );
  }
}
