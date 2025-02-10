// Supa base config
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://tmnpkvhzhyfhdhsgbmkf.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtbnBrdmh6aHlmaGRoc2dibWtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5NDQ4MDQsImV4cCI6MjA1NDUyMDgwNH0.tRH9y5Qg00LZLa2uhmiYhokk3UKEKBgagKcUi0PnAnE";

// setting up supa base 
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);