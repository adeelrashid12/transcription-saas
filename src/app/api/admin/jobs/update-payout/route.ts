import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { job_id, payout_amount } = await request.json();

    if (!job_id || payout_amount === undefined) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const { error } = await supabase
      .from('orders')
      .update({ payout_amount: parseFloat(payout_amount) })
      .eq('id', job_id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update payout error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update payout' },
      { status: 500 }
    );
  }
}
