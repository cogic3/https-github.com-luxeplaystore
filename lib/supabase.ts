import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://nznammfpdyelndgzxwvh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56bmFtbWZwZHllbG5kZ3p4d3ZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2NDg3NDMsImV4cCI6MjA5NjIyNDc0M30.GRLaA0nNWAfFhu5d-2rPU0lnsD8lobWurDENHyldgM4"
);
