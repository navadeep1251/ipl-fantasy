import { Injectable } from '@angular/core';
import { createClient, RealtimeChannel, RealtimePostgresChangesPayload, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

export type SupabaseSyncState = 'connecting' | 'live' | 'offline';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private readonly baseUrl = environment.supabaseUrl;
  private readonly anonKey = environment.supabaseKey;
  private readonly client: SupabaseClient = createClient(this.baseUrl, this.anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
  private readonly retryableStatuses = new Set([408, 425, 429, 500, 502, 503, 504]);
  private readonly maxRetries = 3;
  private readonly retryDelaysMs = [300, 900, 1800];

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

    const response = await this.fetchWithRetry(url, { headers: this.headers() });
    return this.readResponse<T[]>(response);
  }

  async upsert<T>(table: string, payload: unknown, onConflict: string): Promise<T[]> {
    const response = await this.fetchWithRetry(`${this.baseUrl}/rest/v1/${table}?on_conflict=${onConflict}`, {
      method: 'POST',
      headers: {
        ...this.headers(),
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=representation',
      },
      body: JSON.stringify(payload),
    });

    return this.readResponse<T[]>(response);
  }

  async update<T>(table: string, payload: unknown, filters: Record<string, string | number>): Promise<T[]> {
    let url = `${this.baseUrl}/rest/v1/${table}?`;
    for (const [key, value] of Object.entries(filters)) {
      url += `${key}=eq.${encodeURIComponent(value)}&`;
    }

    const response = await this.fetchWithRetry(url, {
      method: 'PATCH',
      headers: {
        ...this.headers(),
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify(payload),
    });

    return this.readResponse<T[]>(response);
  }

  async delete<T>(table: string, filters: Record<string, string | number>): Promise<T[]> {
    let url = `${this.baseUrl}/rest/v1/${table}?`;
    for (const [key, value] of Object.entries(filters)) {
      url += `${key}=eq.${encodeURIComponent(value)}&`;
    }

    const response = await this.fetchWithRetry(url, {
      method: 'DELETE',
      headers: {
        ...this.headers(),
        Prefer: 'return=representation',
      },
    });

    return this.readResponse<T[]>(response);
  }

  subscribeToSharedChanges(options: {
    onChange: (payload: RealtimePostgresChangesPayload<Record<string, unknown>>) => void;
    onStatus?: (status: SupabaseSyncState) => void;
  }): () => void {
    const channel = this.client.channel(`ipl-fantasy-live-${Date.now()}`);
    const tables = ['matches', 'results', 'selections', 'player_scores', 'match_insights', 'users'];

    tables.forEach((table) => {
      channel.on('postgres_changes', { event: '*', schema: 'public', table }, (payload) => options.onChange(payload));
    });

    options.onStatus?.('connecting');
    channel.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        options.onStatus?.('live');
        return;
      }

      if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') {
        options.onStatus?.('offline');
        return;
      }

      options.onStatus?.('connecting');
    });

    return () => {
      options.onStatus?.('offline');
      void this.client.removeChannel(channel);
    };
  }

  private async readResponse<T>(response: Response): Promise<T> {
    if (response.ok) {
      return (await response.json()) as T;
    }

    let detail = response.statusText;

    try {
      const errorBody = await response.json();
      detail = errorBody?.message || errorBody?.error_description || errorBody?.hint || response.statusText;
    } catch {}

    throw new Error(`Supabase request failed (${response.status}): ${detail}`);
  }

  private async fetchWithRetry(url: string, init: RequestInit): Promise<Response> {
    let lastError: unknown;

    for (let attempt = 0; attempt <= this.maxRetries; attempt += 1) {
      try {
        const response = await fetch(url, init);
        if (!this.retryableStatuses.has(response.status) || attempt === this.maxRetries) {
          return response;
        }
      } catch (error) {
        lastError = error;
        if (attempt === this.maxRetries) {
          break;
        }
      }

      await this.wait(this.retryDelaysMs[Math.min(attempt, this.retryDelaysMs.length - 1)]);
    }

    throw lastError instanceof Error ? lastError : new Error('Supabase request failed: network error');
  }

  private wait(ms: number): Promise<void> {
    return new Promise((resolve) => {
      window.setTimeout(resolve, ms);
    });
  }

  private headers(): HeadersInit {
    return {
      apikey: this.anonKey,
      Authorization: `Bearer ${this.anonKey}`,
    };
  }
}
