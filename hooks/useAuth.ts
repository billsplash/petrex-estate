'use client';

import { useState } from 'react';
import { User } from '@supabase/supabase-js';

export function useAuth() {
  const [user] = useState<User | null>(null);
  const [loading] = useState(false);
  return { user, loading };
}
