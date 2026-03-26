import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("SUPABASE_URL 또는 SUPABASE_KEY가 없습니다.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
