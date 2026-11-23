import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://oqwzudnmcbovfyimyjtq.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_wvkmNjqmTEszCxDq3O2GTw_iDE29dzO';

export const createClient = () =>
  createBrowserClient(
    supabaseUrl,
    supabaseKey,
  );
