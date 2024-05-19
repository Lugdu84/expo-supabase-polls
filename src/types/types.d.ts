import { Tables } from './supabase';

export type Poll = Tables<'polls'>;
export type Vote = Tables<'votes'>;
