import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://exdboxtznxuwghpnmhdw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4ZGJveHR6bnh1d2docG5taGR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQwNTQxNzMsImV4cCI6MjA0OTYzMDE3M30.RZ9RrlS_FVaMnyOSi0in4a2SJfn-jKT48GgcKeeI5lg";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);