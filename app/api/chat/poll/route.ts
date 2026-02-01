// API route to poll for new human messages
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/lib/supabase';

export async function POST(request: NextRequest) {
    try {
        const { userId, lastMessageTime } = await request.json();

        if (!userId) {
            return NextResponse.json(
                { error: 'userId is required' },
                { status: 400 }
            );
        }

        // Get active conversation for this user
        const { data: conversation } = await supabaseAdmin
            .from('conversations')
            .select('id, status')
            .eq('user_id', userId)
            .in('status', ['active', 'human_active', 'waiting_human'])
            .single();

        if (!conversation) {
            return NextResponse.json({ newMessages: [] });
        }

        // Get new messages since last check (only human messages)
        const query = supabaseAdmin
            .from('messages')
            .select('sender_type, message, created_at')
            .eq('conversation_id', conversation.id)
            .eq('sender_type', 'human')
            .order('created_at', { ascending: true });

        if (lastMessageTime) {
            query.gt('created_at', lastMessageTime);
        }

        const { data: newMessages } = await query;

        return NextResponse.json({
            newMessages: newMessages || [],
            conversationStatus: conversation.status
        });

    } catch (error) {
        console.error('Poll API Error:', error);
        return NextResponse.json(
            { error: 'Failed to poll messages' },
            { status: 500 }
        );
    }
}
