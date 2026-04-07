import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private readonly baseUrl = 'https://olewyqrxgwjjjspeonon.supabase.co';
  private readonly anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sZXd5cXJ4Z3dqampzcGVvbm9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3MzM3NjMsImV4cCI6MjA5MDMwOTc2M30.mbY5GR8eZu7BH1UD0Yq2B_l5dr4bPB-RkYXa-vgRwYI';

  async query<T>(table: string, options: { select?: string; eq?: Record<string, string | number>; order?: string } = {}): Promise<T[]> {
    let url = `${this.baseUrl}/rest/v1/${table}?`;

    if (options.select) {
      url += `select=${options.select}&`;
    }

    if (options.eq) {
      for (const [key, value] of Object.entries(options.eq)) {
        url += `${key}=eq.${encodeURIComponent(value)}&`;
      }
    }

    if (options.order) {
      url += `order=${options.order}&`;
    }

    const response = await fetch(url, { headers: this.headers() });
    return response.json();
  }

  async upsert<T>(table: string, payload: unknown, onConflict: string): Promise<T[]> {
    const response = await fetch(`${this.baseUrl}/rest/v1/${table}?on_conflict=${onConflict}`, {
      method: 'POST',
      headers: {
        ...this.headers(),
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=representation',
      },
      body: JSON.stringify(payload),
    });

    return response.json();
  }

  async update<T>(table: string, payload: unknown, filters: Record<string, string | number>): Promise<T[]> {
    let url = `${this.baseUrl}/rest/v1/${table}?`;
    for (const [key, value] of Object.entries(filters)) {
      url += `${key}=eq.${encodeURIComponent(value)}&`;
    }

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        ...this.headers(),
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify(payload),
    });

    return response.json();
  }

  private headers(): HeadersInit {
    return {
      apikey: this.anonKey,
      Authorization: `Bearer ${this.anonKey}`,
    };
  }
}
