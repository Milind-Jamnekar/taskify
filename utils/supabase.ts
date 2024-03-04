import { createClient } from "@supabase/supabase-js";
import { Database } from "./supabase.types";

// Create a single supabase client for interacting with your database
const supabasekey = process.env.SUPABASE_KEY;
const supabaseurl = process.env.SUPABASE_URL;

if (!supabasekey) {
  throw new Error("Key is not defined");
}
if (!supabaseurl) {
  throw new Error("URL is not defined");
}

const supabase = createClient<Database>(supabaseurl, supabasekey);

export default supabase;
