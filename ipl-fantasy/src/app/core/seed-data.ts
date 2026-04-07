import { FANTASY_PLAYERS, TEAM_PLAYERS, getDefaultPlayerPassword, normalizeFantasyUsername } from './ipl-data';

export interface SeedUser {
  username: string;
  display_name: string;
  password: string;
  is_admin: number;
  created_at: string;
}

export interface SeedMatch {
  id: number;
  home: string;
  away: string;
  date: string;
  time_label: string;
  lock_time: string;
}

export const seedVersion = '2026-fresh-start-v3';

export const seedUsers: SeedUser[] = [
  {
    username: 'admin',
    display_name: 'Admin',
    password: 'admin123',
    is_admin: 1,
    created_at: '2026-03-20T10:00:00.000Z',
  },
  ...FANTASY_PLAYERS.map((name) => ({
    username: normalizeFantasyUsername(name),
    display_name: name,
    password: getDefaultPlayerPassword(name),
    is_admin: 0,
    created_at: '2026-03-20T10:10:00.000Z',
  })),
];

const seedMatchRows: Array<[number, string, string, string, string, string]> = [
  [1, 'RCB', 'SRH', 'Mar 28, 2026', '7:30 PM IST', '2026-03-28T19:30:00+05:30'],
  [2, 'MI', 'KKR', 'Mar 29, 2026', '7:30 PM IST', '2026-03-29T19:30:00+05:30'],
  [3, 'RR', 'CSK', 'Mar 30, 2026', '7:30 PM IST', '2026-03-30T19:30:00+05:30'],
  [4, 'PBKS', 'GT', 'Mar 31, 2026', '7:30 PM IST', '2026-03-31T19:30:00+05:30'],
  [5, 'LSG', 'DC', 'Apr 01, 2026', '7:30 PM IST', '2026-04-01T19:30:00+05:30'],
  [6, 'KKR', 'SRH', 'Apr 02, 2026', '7:30 PM IST', '2026-04-02T19:30:00+05:30'],
  [7, 'CSK', 'PBKS', 'Apr 03, 2026', '7:30 PM IST', '2026-04-03T19:30:00+05:30'],
  [8, 'DC', 'MI', 'Apr 04, 2026', '3:30 PM IST', '2026-04-04T15:30:00+05:30'],
  [9, 'GT', 'RR', 'Apr 04, 2026', '7:30 PM IST', '2026-04-04T19:30:00+05:30'],
  [10, 'SRH', 'LSG', 'Apr 05, 2026', '3:30 PM IST', '2026-04-05T15:30:00+05:30'],
  [11, 'RCB', 'CSK', 'Apr 05, 2026', '7:30 PM IST', '2026-04-05T19:30:00+05:30'],
  [12, 'KKR', 'PBKS', 'Apr 06, 2026', '7:30 PM IST', '2026-04-06T19:30:00+05:30'],
  [13, 'RR', 'MI', 'Apr 07, 2026', '7:30 PM IST', '2026-04-07T19:30:00+05:30'],
  [14, 'DC', 'GT', 'Apr 08, 2026', '7:30 PM IST', '2026-04-08T19:30:00+05:30'],
  [15, 'KKR', 'LSG', 'Apr 09, 2026', '7:30 PM IST', '2026-04-09T19:30:00+05:30'],
  [16, 'RR', 'RCB', 'Apr 10, 2026', '7:30 PM IST', '2026-04-10T19:30:00+05:30'],
  [17, 'PBKS', 'SRH', 'Apr 11, 2026', '3:30 PM IST', '2026-04-11T15:30:00+05:30'],
  [18, 'CSK', 'DC', 'Apr 11, 2026', '7:30 PM IST', '2026-04-11T19:30:00+05:30'],
  [19, 'LSG', 'GT', 'Apr 12, 2026', '3:30 PM IST', '2026-04-12T15:30:00+05:30'],
  [20, 'MI', 'RCB', 'Apr 12, 2026', '7:30 PM IST', '2026-04-12T19:30:00+05:30'],
  [21, 'SRH', 'RR', 'Apr 13, 2026', '7:30 PM IST', '2026-04-13T19:30:00+05:30'],
  [22, 'CSK', 'KKR', 'Apr 14, 2026', '7:30 PM IST', '2026-04-14T19:30:00+05:30'],
  [23, 'RCB', 'LSG', 'Apr 15, 2026', '7:30 PM IST', '2026-04-15T19:30:00+05:30'],
  [24, 'MI', 'PBKS', 'Apr 16, 2026', '7:30 PM IST', '2026-04-16T19:30:00+05:30'],
  [25, 'GT', 'KKR', 'Apr 17, 2026', '7:30 PM IST', '2026-04-17T19:30:00+05:30'],
  [26, 'RCB', 'DC', 'Apr 18, 2026', '3:30 PM IST', '2026-04-18T15:30:00+05:30'],
  [27, 'SRH', 'CSK', 'Apr 18, 2026', '7:30 PM IST', '2026-04-18T19:30:00+05:30'],
  [28, 'KKR', 'RR', 'Apr 19, 2026', '3:30 PM IST', '2026-04-19T15:30:00+05:30'],
  [29, 'PBKS', 'LSG', 'Apr 19, 2026', '7:30 PM IST', '2026-04-19T19:30:00+05:30'],
  [30, 'GT', 'MI', 'Apr 20, 2026', '7:30 PM IST', '2026-04-20T19:30:00+05:30'],
  [31, 'SRH', 'DC', 'Apr 21, 2026', '7:30 PM IST', '2026-04-21T19:30:00+05:30'],
  [32, 'LSG', 'RR', 'Apr 22, 2026', '7:30 PM IST', '2026-04-22T19:30:00+05:30'],
  [33, 'MI', 'CSK', 'Apr 23, 2026', '7:30 PM IST', '2026-04-23T19:30:00+05:30'],
  [34, 'RCB', 'GT', 'Apr 24, 2026', '7:30 PM IST', '2026-04-24T19:30:00+05:30'],
  [35, 'DC', 'PBKS', 'Apr 25, 2026', '3:30 PM IST', '2026-04-25T15:30:00+05:30'],
  [36, 'RR', 'SRH', 'Apr 25, 2026', '7:30 PM IST', '2026-04-25T19:30:00+05:30'],
  [37, 'GT', 'CSK', 'Apr 26, 2026', '3:30 PM IST', '2026-04-26T15:30:00+05:30'],
  [38, 'LSG', 'KKR', 'Apr 26, 2026', '7:30 PM IST', '2026-04-26T19:30:00+05:30'],
  [39, 'DC', 'RCB', 'Apr 27, 2026', '7:30 PM IST', '2026-04-27T19:30:00+05:30'],
  [40, 'PBKS', 'RR', 'Apr 28, 2026', '7:30 PM IST', '2026-04-28T19:30:00+05:30'],
  [41, 'MI', 'SRH', 'Apr 29, 2026', '7:30 PM IST', '2026-04-29T19:30:00+05:30'],
  [42, 'GT', 'RCB', 'Apr 30, 2026', '7:30 PM IST', '2026-04-30T19:30:00+05:30'],
  [43, 'RR', 'DC', 'May 01, 2026', '7:30 PM IST', '2026-05-01T19:30:00+05:30'],
  [44, 'CSK', 'MI', 'May 02, 2026', '7:30 PM IST', '2026-05-02T19:30:00+05:30'],
  [45, 'SRH', 'KKR', 'May 03, 2026', '3:30 PM IST', '2026-05-03T15:30:00+05:30'],
  [46, 'GT', 'PBKS', 'May 03, 2026', '7:30 PM IST', '2026-05-03T19:30:00+05:30'],
  [47, 'MI', 'LSG', 'May 04, 2026', '7:30 PM IST', '2026-05-04T19:30:00+05:30'],
  [48, 'DC', 'CSK', 'May 05, 2026', '7:30 PM IST', '2026-05-05T19:30:00+05:30'],
  [49, 'SRH', 'PBKS', 'May 06, 2026', '7:30 PM IST', '2026-05-06T19:30:00+05:30'],
  [50, 'LSG', 'RCB', 'May 07, 2026', '7:30 PM IST', '2026-05-07T19:30:00+05:30'],
  [51, 'DC', 'KKR', 'May 08, 2026', '7:30 PM IST', '2026-05-08T19:30:00+05:30'],
  [52, 'RR', 'GT', 'May 09, 2026', '7:30 PM IST', '2026-05-09T19:30:00+05:30'],
  [53, 'CSK', 'LSG', 'May 10, 2026', '3:30 PM IST', '2026-05-10T15:30:00+05:30'],
  [54, 'RCB', 'MI', 'May 10, 2026', '7:30 PM IST', '2026-05-10T19:30:00+05:30'],
  [55, 'PBKS', 'DC', 'May 11, 2026', '7:30 PM IST', '2026-05-11T19:30:00+05:30'],
  [56, 'GT', 'SRH', 'May 12, 2026', '7:30 PM IST', '2026-05-12T19:30:00+05:30'],
  [57, 'RCB', 'KKR', 'May 13, 2026', '7:30 PM IST', '2026-05-13T19:30:00+05:30'],
  [58, 'PBKS', 'MI', 'May 14, 2026', '7:30 PM IST', '2026-05-14T19:30:00+05:30'],
  [59, 'LSG', 'CSK', 'May 15, 2026', '7:30 PM IST', '2026-05-15T19:30:00+05:30'],
  [60, 'KKR', 'GT', 'May 16, 2026', '7:30 PM IST', '2026-05-16T19:30:00+05:30'],
  [61, 'PBKS', 'RCB', 'May 17, 2026', '3:30 PM IST', '2026-05-17T15:30:00+05:30'],
  [62, 'DC', 'RR', 'May 17, 2026', '7:30 PM IST', '2026-05-17T19:30:00+05:30'],
  [63, 'CSK', 'SRH', 'May 18, 2026', '7:30 PM IST', '2026-05-18T19:30:00+05:30'],
  [64, 'RR', 'LSG', 'May 19, 2026', '7:30 PM IST', '2026-05-19T19:30:00+05:30'],
  [65, 'KKR', 'MI', 'May 20, 2026', '7:30 PM IST', '2026-05-20T19:30:00+05:30'],
  [66, 'CSK', 'GT', 'May 21, 2026', '7:30 PM IST', '2026-05-21T19:30:00+05:30'],
  [67, 'SRH', 'RCB', 'May 22, 2026', '7:30 PM IST', '2026-05-22T19:30:00+05:30'],
  [68, 'LSG', 'PBKS', 'May 23, 2026', '7:30 PM IST', '2026-05-23T19:30:00+05:30'],
  [69, 'MI', 'RR', 'May 24, 2026', '3:30 PM IST', '2026-05-24T15:30:00+05:30'],
  [70, 'KKR', 'DC', 'May 24, 2026', '7:30 PM IST', '2026-05-24T19:30:00+05:30'],
];

export const seedMatches: SeedMatch[] = seedMatchRows.map(([id, home, away, date, time_label, lock_time]) => ({
  id,
  home,
  away,
  date,
  time_label,
  lock_time,
}));

export const seedResults: any[] = [];

export const seedSelections: any[] = [];

export const seedPlayerScores: any[] = [];

export const seedInsights = [
  {
    match_id: 13,
    generated_at: '2026-04-06T08:00:00.000Z',
    home_probable_xi: JSON.stringify(TEAM_PLAYERS['RR'].slice(0, 11)),
    away_probable_xi: JSON.stringify(TEAM_PLAYERS['MI'].slice(0, 11)),
    home_form_batsmen: 'Yashasvi Jaiswal and Dhruv Jurel remain Rajasthan’s safest batting base in fantasy.',
    away_form_batsmen: 'Rohit Sharma and Suryakumar Yadav offer the most explosive upside for Mumbai.',
    home_form_bowlers: 'Jofra Archer and Sandeep Sharma can attack both with the new ball and at the death.',
    away_form_bowlers: 'Jasprit Bumrah and Trent Boult should dominate wicket-taking projections.',
    pitch_report: 'Expect a balanced Guwahati wicket with value for stroke play early and cutters later on.',
    head_to_head: 'Mumbai have the stronger recent record, but Rajasthan often compete well at home venues.',
    key_matchups: 'Boult vs Jaiswal and Archer vs Rohit are the clearest swing battles.',
    prediction_summary: 'Mumbai carry slightly more bowling depth, but a big RR top-order start can flip the match.',
  },
  {
    match_id: 14,
    generated_at: '2026-04-06T08:00:00.000Z',
    home_probable_xi: JSON.stringify(TEAM_PLAYERS['DC'].slice(0, 11)),
    away_probable_xi: JSON.stringify(TEAM_PLAYERS['GT'].slice(0, 11)),
    home_form_batsmen: 'KL Rahul and Tristan Stubbs provide DC with stability plus acceleration.',
    away_form_batsmen: 'Shubman Gill and Sai Sudharsan remain Gujarat Titans’ best fantasy batting core.',
    home_form_bowlers: 'Kuldeep Yadav and Mitchell Starc are the most likely DC wicket sources.',
    away_form_bowlers: 'Rashid Khan and Mohammed Siraj offer upside across phases.',
    pitch_report: 'Balanced surface with enough carry for seamers in the first innings.',
    head_to_head: 'GT have generally defended totals well against DC in recent meetings.',
    key_matchups: 'Rashid vs Stubbs and Starc vs Gill should decide momentum.',
    prediction_summary: 'GT start marginally ahead, especially if Rashid controls the middle overs.',
  },
];
