import { Injectable } from '@angular/core';
import { DEFAULT_PLAYER_PASSWORDS } from './ipl-data';
import { seedInsights, seedMatches, seedPlayerScores, seedResults, seedSelections, seedUsers, seedVersion } from './seed-data';

declare global {
  interface Window {
    initSqlJs?: (config: { locateFile: (file: string) => string }) => Promise<SqlJsStatic>;
  }
}

interface SqlJsStatic {
  Database: new (data?: Uint8Array) => SqlJsDatabase;
}

interface SqlJsStatement {
  bind(values?: unknown[]): void;
  step(): boolean;
  getAsObject(): Record<string, unknown>;
  free(): void;
}

interface SqlJsDatabase {
  run(sql: string, params?: unknown[]): void;
  prepare(sql: string, params?: unknown[]): SqlJsStatement;
  export(): Uint8Array;
}

@Injectable({ providedIn: 'root' })
export class SQLiteService {
  private readonly storageKey = 'ipl-fantasy.sqlite.db';
  private readonly versionKey = 'ipl-fantasy.sqlite.version';
  private dbPromise?: Promise<SqlJsDatabase>;

  all<T>(sql: string, params: unknown[] = []): Promise<T[]> {
    return this.withDb((db) => {
      const statement = db.prepare(sql, params);
      const rows: T[] = [];
      while (statement.step()) {
        rows.push(statement.getAsObject() as T);
      }
      statement.free();
      return rows;
    });
  }

  async run(sql: string, params: unknown[] = []): Promise<void> {
    await this.withDb((db) => {
      db.run(sql, params);
      this.persist(db);
    });
  }

  async batch(statements: Array<{ sql: string; params?: unknown[] }>): Promise<void> {
    await this.withDb((db) => {
      db.run('BEGIN');
      try {
        for (const statement of statements) {
          db.run(statement.sql, statement.params ?? []);
        }
        db.run('COMMIT');
        this.persist(db);
      } catch (error) {
        db.run('ROLLBACK');
        throw error;
      }
    });
  }

  private withDb<T>(work: (db: SqlJsDatabase) => T | Promise<T>): Promise<T> {
    if (!this.dbPromise) {
      this.dbPromise = this.initialize();
    }

    return this.dbPromise.then(work);
  }

  private async initialize(): Promise<SqlJsDatabase> {
    const SQL = await this.loadSqlJs();
    const previousVersion = localStorage.getItem(this.versionKey);
    const saved = localStorage.getItem(this.storageKey);
    const db = saved ? new SQL.Database(this.base64ToUint8Array(saved)) : new SQL.Database();

    this.createSchema(db);
    this.seedIfNeeded(db);
    this.migrateSeedData(db, previousVersion);
    this.persist(db);

    return db;
  }

  private async loadSqlJs(): Promise<SqlJsStatic> {
    if (!window.initSqlJs) {
      await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.13.0/sql-wasm.js');
    }

    if (!window.initSqlJs) {
      throw new Error('Failed to load SQLite runtime');
    }

    return window.initSqlJs({
      locateFile: (file) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.13.0/${file}`,
    });
  }

  private loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.head.appendChild(script);
    });
  }

  private createSchema(db: SqlJsDatabase): void {
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        username TEXT PRIMARY KEY,
        display_name TEXT NOT NULL,
        password TEXT NOT NULL,
        is_admin INTEGER NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS matches (
        id INTEGER PRIMARY KEY,
        home TEXT NOT NULL,
        away TEXT NOT NULL,
        date TEXT NOT NULL,
        time_label TEXT NOT NULL,
        lock_time TEXT NOT NULL,
        manual_lock_state INTEGER DEFAULT NULL
      );

      CREATE TABLE IF NOT EXISTS results (
        match_id INTEGER PRIMARY KEY,
        winning_team TEXT,
        win_by_runs INTEGER,
        run_margin INTEGER,
        wicket_margin INTEGER,
        top_scorer TEXT,
        top_scorer_runs INTEGER,
        best_bowler TEXT,
        best_bowler_points INTEGER,
        powerplay_winner TEXT,
        powerplay_score INTEGER,
        powerplay_diff INTEGER,
        powerplay_home_score INTEGER,
        powerplay_away_score INTEGER,
        powerplay_home_wickets INTEGER,
        powerplay_away_wickets INTEGER,
        dot_ball_leader TEXT,
        dot_balls INTEGER,
        total_wickets INTEGER,
        wickets_range TEXT,
        duck_batsmen TEXT,
        match_top_player TEXT,
        match_bottom_player TEXT
      );

      CREATE TABLE IF NOT EXISTS selections (
        username TEXT NOT NULL,
        match_id INTEGER NOT NULL,
        winning_team TEXT,
        best_batsman TEXT,
        best_bowler TEXT,
        powerplay_winner TEXT,
        dot_ball_bowler TEXT,
        total_wickets TEXT,
        duck_batsman TEXT,
        double_category TEXT,
        winning_horse TEXT,
        losing_horse TEXT,
        saved_at TEXT,
        PRIMARY KEY (username, match_id)
      );

      CREATE TABLE IF NOT EXISTS match_insights (
        match_id INTEGER PRIMARY KEY,
        generated_at TEXT,
        home_probable_xi TEXT,
        away_probable_xi TEXT,
        home_form_batsmen TEXT,
        away_form_batsmen TEXT,
        home_form_bowlers TEXT,
        away_form_bowlers TEXT,
        pitch_report TEXT,
        head_to_head TEXT,
        key_matchups TEXT,
        prediction_summary TEXT
      );

      CREATE TABLE IF NOT EXISTS player_scores (
        match_id INTEGER NOT NULL,
        player_name TEXT NOT NULL,
        runs INTEGER,
        fours INTEGER,
        sixes INTEGER,
        wickets INTEGER,
        maidens INTEGER,
        dot_balls INTEGER,
        batsman_score INTEGER,
        bowler_score INTEGER,
        dot_ball_score INTEGER,
        PRIMARY KEY (match_id, player_name)
      );
    `);

    try {
      db.run('ALTER TABLE matches ADD COLUMN manual_lock_state INTEGER DEFAULT NULL');
    } catch {}
    try {
      db.run('ALTER TABLE results ADD COLUMN powerplay_home_score INTEGER DEFAULT 0');
    } catch {}
    try {
      db.run('ALTER TABLE results ADD COLUMN powerplay_away_score INTEGER DEFAULT 0');
    } catch {}
    try {
      db.run('ALTER TABLE results ADD COLUMN powerplay_home_wickets INTEGER DEFAULT 0');
    } catch {}
    try {
      db.run('ALTER TABLE results ADD COLUMN powerplay_away_wickets INTEGER DEFAULT 0');
    } catch {}
  }

  private seedIfNeeded(db: SqlJsDatabase): void {
    const statement = db.prepare('SELECT COUNT(*) AS count FROM users');
    statement.step();
    const row = statement.getAsObject();
    statement.free();

    if (Number(row['count']) > 0) {
      return;
    }

    db.run('BEGIN');
    try {
      for (const user of seedUsers) {
        db.run(
          'INSERT INTO users (username, display_name, password, is_admin, created_at) VALUES (?, ?, ?, ?, ?)',
          [user.username, user.display_name, user.password, user.is_admin, user.created_at],
        );
      }

      for (const match of seedMatches) {
        db.run(
          'INSERT INTO matches (id, home, away, date, time_label, lock_time, manual_lock_state) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [match.id, match.home, match.away, match.date, match.time_label, match.lock_time, match.manual_lock_state],
        );
      }

      for (const result of seedResults) {
        db.run(
          `INSERT INTO results (
            match_id, winning_team, win_by_runs, run_margin, wicket_margin, top_scorer,
            top_scorer_runs, best_bowler, best_bowler_points, powerplay_winner, powerplay_score,
            powerplay_diff, powerplay_home_score, powerplay_away_score, powerplay_home_wickets,
            powerplay_away_wickets, dot_ball_leader, dot_balls, total_wickets, wickets_range,
            duck_batsmen, match_top_player, match_bottom_player
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)` ,
          [
            result.match_id,
            result.winning_team,
            result.win_by_runs,
            result.run_margin,
            result.wicket_margin,
            result.top_scorer,
            result.top_scorer_runs,
            result.best_bowler,
            result.best_bowler_points,
            result.powerplay_winner,
            result.powerplay_score,
            result.powerplay_diff,
            result.powerplay_home_score ?? 0,
            result.powerplay_away_score ?? 0,
            result.powerplay_home_wickets ?? 0,
            result.powerplay_away_wickets ?? 0,
            result.dot_ball_leader,
            result.dot_balls,
            result.total_wickets,
            result.wickets_range,
            result.duck_batsmen,
            result.match_top_player,
            result.match_bottom_player,
          ],
        );
      }

      for (const selection of seedSelections) {
        db.run(
          `INSERT INTO selections (
            username, match_id, winning_team, best_batsman, best_bowler, powerplay_winner,
            dot_ball_bowler, total_wickets, duck_batsman, double_category, winning_horse,
            losing_horse, saved_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            selection.username,
            selection.match_id,
            selection.winning_team,
            selection.best_batsman,
            selection.best_bowler,
            selection.powerplay_winner,
            selection.dot_ball_bowler,
            selection.total_wickets,
            selection.duck_batsman,
            selection.double_category,
            selection.winning_horse,
            selection.losing_horse,
            selection.saved_at,
          ],
        );
      }

      for (const insight of seedInsights) {
        db.run(
          `INSERT INTO match_insights (
            match_id, generated_at, home_probable_xi, away_probable_xi, home_form_batsmen,
            away_form_batsmen, home_form_bowlers, away_form_bowlers, pitch_report,
            head_to_head, key_matchups, prediction_summary
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            insight.match_id,
            insight.generated_at,
            insight.home_probable_xi,
            insight.away_probable_xi,
            insight.home_form_batsmen,
            insight.away_form_batsmen,
            insight.home_form_bowlers,
            insight.away_form_bowlers,
            insight.pitch_report,
            insight.head_to_head,
            insight.key_matchups,
            insight.prediction_summary,
          ],
        );
      }

      for (const score of seedPlayerScores) {
        db.run(
          `INSERT INTO player_scores (
            match_id, player_name, runs, fours, sixes, wickets, maidens, dot_balls,
            batsman_score, bowler_score, dot_ball_score
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            score.match_id,
            score.player_name,
            score.runs,
            score.fours,
            score.sixes,
            score.wickets,
            score.maidens,
            score.dot_balls,
            score.batsman_score,
            score.bowler_score,
            score.dot_ball_score,
          ],
        );
      }

      db.run('COMMIT');
    } catch (error) {
      db.run('ROLLBACK');
      throw error;
    }
  }

  private migrateSeedData(db: SqlJsDatabase, previousVersion: string | null): void {
    if (previousVersion === seedVersion) {
      return;
    }

    db.run('BEGIN');
    try {
      if (previousVersion) {
        db.run('DELETE FROM results');
        db.run('DELETE FROM selections');
        db.run('DELETE FROM player_scores');
      }

      for (const user of seedUsers) {
        db.run(
          `INSERT INTO users (username, display_name, password, is_admin, created_at)
           VALUES (?, ?, ?, ?, ?)
           ON CONFLICT(username) DO UPDATE SET
             display_name = excluded.display_name,
             is_admin = excluded.is_admin`,
          [user.username, user.display_name, user.password, user.is_admin, user.created_at],
        );
      }

      for (const [username, password] of Object.entries(DEFAULT_PLAYER_PASSWORDS)) {
        db.run('UPDATE users SET password = ? WHERE username = ?', [password, username]);
      }

      db.run('COMMIT');
    } catch (error) {
      db.run('ROLLBACK');
      throw error;
    }
  }

  private persist(db: SqlJsDatabase): void {
    localStorage.setItem(this.storageKey, this.uint8ArrayToBase64(db.export()));
    localStorage.setItem(this.versionKey, seedVersion);
  }

  private uint8ArrayToBase64(bytes: Uint8Array): string {
    let binary = '';
    const chunkSize = 0x8000;
    for (let index = 0; index < bytes.length; index += chunkSize) {
      binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
    }
    return btoa(binary);
  }

  private base64ToUint8Array(base64: string): Uint8Array {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }
    return bytes;
  }
}
