import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://uxifsqzgxmreynxutuph.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4aWZzcXpneG1yZXlueHV0dXBoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE2MTE3MzYsImV4cCI6MjAzNzE4NzczNn0.bQPTcNPvnUdgp-VUuKwTjW5a63RvbQL5uXddvv_zLaU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
