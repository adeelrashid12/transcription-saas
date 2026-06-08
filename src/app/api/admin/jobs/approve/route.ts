import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { job_id } = await request.json();

    if (!job_id) {
      return NextResponse.json({ success: false, error: 'Missing job ID' }, { status: 400 });
    }

    // 1. Get the job to calculate earnings
    const { data: job, error: jobError } = await supabase
      .from('orders')
      .select('payout_amount, status, assigned_worker_id')
      .eq('id', job_id)
      .single();

    if (jobError || !job) throw new Error('Job not found');
    if (job.status === 'Completed') return NextResponse.json({ success: false, error: 'Job is already completed' }, { status: 400 });

    const earnings = parseFloat(job.payout_amount) || 0;

    // 2. Update job status to Completed
    const { error: updateError } = await supabase
      .from('orders')
      .update({ status: 'Completed' })
      .eq('id', job_id);

    if (updateError) throw updateError;

    // 3. Get current worker earnings
    if (job.assigned_worker_id && earnings > 0) {
      const { data: worker, error: workerError } = await supabase
        .from('workers')
        .select('earnings')
        .eq('id', job.assigned_worker_id)
        .single();

      if (!workerError && worker) {
        // 4. Add new earnings to their total
        const currentEarnings = parseFloat(worker.earnings) || 0;
        await supabase
          .from('workers')
          .update({ earnings: currentEarnings + earnings })
          .eq('id', job.assigned_worker_id);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Approve job error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to approve job' },
      { status: 500 }
    );
  }
}
