import { SelectionRecord, TeamMeta } from './models';

const logoBase = 'https://ipl-fantasy-2026-xi.vercel.app/logos';

export const TEAM_META: Record<string, TeamMeta> = {
  RCB: { name: 'Royal Challengers Bengaluru', color: '#CC0000', accent: '#FFD700', logoUrl: `${logoBase}/RCB.png` },
  MI: { name: 'Mumbai Indians', color: '#004BA0', accent: '#88CFFF', logoUrl: `${logoBase}/MI.png` },
  CSK: { name: 'Chennai Super Kings', color: '#F5A623', accent: '#ffffff', logoUrl: `${logoBase}/CSK.png` },
  KKR: { name: 'Kolkata Knight Riders', color: '#3A225D', accent: '#F5C518', logoUrl: `${logoBase}/KKR.png` },
  SRH: { name: 'Sunrisers Hyderabad', color: '#FF6B00', accent: '#ffffff', logoUrl: `${logoBase}/SRH.png` },
  DC: { name: 'Delhi Capitals', color: '#0A2D6E', accent: '#ffffff', logoUrl: `${logoBase}/DC.png` },
  GT: { name: 'Gujarat Titans', color: '#1C4F8C', accent: '#00D4FF', logoUrl: `${logoBase}/GT.png` },
  RR: { name: 'Rajasthan Royals', color: '#EA1A85', accent: '#ffffff', logoUrl: `${logoBase}/RR.png` },
  PBKS: { name: 'Punjab Kings', color: '#ED1B24', accent: '#DCDDDF', logoUrl: `${logoBase}/PBKS.png` },
  LSG: { name: 'Lucknow Super Giants', color: '#00B4D8', accent: '#FFD700', logoUrl: `${logoBase}/LSG.png` },
};

export const TEAM_PLAYERS: Record<string, string[]> = {
  CSK: ['Ruturaj Gaikwad', 'MS Dhoni', 'Sanju Samson', 'Kartik Sharma', 'Urvil Patel', 'Dewald Brevis', 'Ayush Mhatre', 'Sarfaraz Khan', 'Shivam Dube', 'Matthew Short', 'Jamie Overton', 'Ramakrishna Ghosh', 'Anshul Kamboj', 'Prashant Veer', 'Aman Khan', 'Zak Foulkes', 'Khaleel Ahmed', 'Mukesh Choudhary', 'Gurjapneet Singh', 'Matt Henry', 'Spencer Johnson', 'Shreyas Gopal', 'Rahul Chahar', 'Noor Ahmad', 'Akeal Hosein'],
  DC: ['Axar Patel', 'KL Rahul', 'Prithvi Shaw', 'David Miller', 'Tristan Stubbs', 'Abhishek Porel', 'Karun Nair', 'Sameer Rizvi', 'Ashutosh Sharma', 'Mitchell Starc', 'T. Natarajan', 'Mukesh Kumar', 'Dushmantha Chameera', 'Lungi Ngidi', 'Kyle Jamieson', 'Nitish Rana', 'Kuldeep Yadav', 'Ajay Mandal', 'Tripurana Vijay', 'Madhav Tiwari', 'Auqib Dar', 'Pathum Nissanka', 'Sahil Parakh', 'Vipraj Nigam'],
  GT: ['Shubman Gill', 'Jos Buttler', 'Sai Sudharsan', 'Shahrukh Khan', 'Anuj Rawat', 'Kumar Kushagra', 'Nishant Sindhu', 'Rahul Tewatia', 'Washington Sundar', 'Rashid Khan', 'Jason Holder', 'Kagiso Rabada', 'Mohammed Siraj', 'Prasidh Krishna', 'Ishant Sharma', 'Sai Kishore', 'Jayant Yadav', 'Manav Suthar', 'Arshad Khan', 'Gurnoor Singh Brar', 'Kulwant Khejroliya', 'Glenn Phillips', 'Tom Banton', 'Luke Wood', 'Ashok Sharma'],
  KKR: ['Ajinkya Rahane', 'Cameron Green', 'Rinku Singh', 'Shreyas Iyer', 'Venkatesh Iyer', 'Nitish Rana', 'Sunil Narine', 'Andre Russell', 'Varun Chakravarthy', 'Navdeep Saini', 'Saurabh Dubey', 'Blessing Muzarabani', 'Angkrish Raghuvanshi', 'KS Bharat', 'Vaibhav Arora', 'Matheesha Pathirana', 'Umran Malik', 'Manish Pandey', 'Rovman Powell', 'Finn Allen', 'Rachin Ravindra', 'Daksh Kamra', 'Tim Seifert', 'Kartik Tyagi', 'Prashant Solanki'],
  LSG: ['Rishabh Pant', 'Nicholas Pooran', 'Ayush Badoni', 'Mohammed Shami', 'Avesh Khan', 'Mohsin Khan', 'Arshin Kulkarni', 'Shahbaz Ahmed', 'Aiden Markram', 'Abdul Samad', 'Wanindu Hasaranga', 'Himmat Singh', 'Akshat Raghuwanshi', 'Mitchell Marsh', 'Arjun Tendulkar', 'Matthew Breetzke', 'Josh Inglis', 'Mukul Choudhary', 'Akash Maharaj Singh', 'Anrich Nortje', 'Prince Yadav', 'Digvesh Singh Rathi', 'Mayank Yadav', 'Naman Tiwari', 'Manimaran Siddharth'],
  MI: ['Hardik Pandya', 'Rohit Sharma', 'Suryakumar Yadav', 'Tilak Varma', 'Quinton de Kock', 'Ryan Rickelton', 'Naman Dhir', 'Danish Malewar', 'Sherfane Rutherford', 'Will Jacks', 'Mitchell Santner', 'Shardul Thakur', 'Raj Bawa', 'Corbin Bosch', 'Jasprit Bumrah', 'Trent Boult', 'Deepak Chahar', 'Mayank Markande', 'Atharva Ankolekar', 'AM Ghazanfar', 'Mayank Rawat', 'Mohammad Izhar', 'Raghu Sharma', 'Robin Minz', 'Ashwani Kumar'],
  PBKS: ['Marcus Stoinis', 'Shreyas Iyer', 'Prabhsimran Singh', 'Arshdeep Singh', 'Harpreet Brar', 'Shashank Singh', 'Yuzvendra Chahal', 'Marco Jansen', 'Priyansh Arya', 'Pyla Avinash', 'Nehal Wadhera', 'Harnoor Singh', 'Mitchell Owen', 'Musheer Khan', 'Suryansh Shedge', 'Cooper Connolly', 'Azmatullah Omarzai', 'Praveen Dubey', 'Vishnu Vinod', 'Lockie Ferguson', 'Xavier Bartlett', 'Ben Dwarshuis', 'Vishal Nishad', 'Vijaykumar Vyshak', 'Yash Thakur'],
  RCB: ['Rajat Patidar', 'Virat Kohli', 'Devdutt Padikkal', 'Tim David', 'Phil Salt', 'Jitesh Sharma', 'Jordan Cox', 'Jacob Bethell', 'Venkatesh Iyer', 'Krunal Pandya', 'Romario Shepherd', 'Swapnil Singh', 'Bhuvneshwar Kumar', 'Rasikh Salam', 'Suyash Sharma', 'Vicky Ostwal', 'Jacob Duffy', 'Nuwan Thushara', 'Abhinandan Singh', 'Mangesh Yadav', 'Kanishk Chouhan', 'Vihaan Malhotra', 'Satvik Deswal', 'Josh Hazlewood'],
  RR: ['Riyan Parag', 'Yashasvi Jaiswal', 'Dhruv Jurel', 'Shimron Hetmyer', 'Shubham Dubey', 'Ravindra Jadeja', 'Dasun Shanaka', 'Kuldeep Sen', 'Prasidh Krishna', 'Navdeep Saini', 'Nandre Burger', 'Donovan Ferreira', 'Aman Rao Perala', 'Vaibhav Suryavanshi', 'Ravi Singh', 'Lhuan-dre Pretorius', 'Jofra Archer', 'Tushar Deshpande', 'Kwena Maphaka', 'Sandeep Sharma', 'Vignesh Puthur', 'Brijesh Sharma', 'Sushant Mishra', 'Yash Raj Punja', 'Adam Milne'],
  SRH: ['Liam Livingstone', 'Harshal Patel', 'Pat Cummins', 'Ishan Kishan', 'Travis Head', 'Heinrich Klaasen', 'Abhishek Sharma', 'Nitish Kumar Reddy', 'Jaydev Unadkat', 'David Payne', 'Aniket Verma', 'Smaran Ravichandran', 'Kamindu Mendis', 'Harsh Dubey', 'Shivang Kumar', 'Salil Arora', 'Brydon Carse', 'Eshan Malinga', 'Zeeshan Ansari', 'Sakib Hussain', 'Onkar Tarmale', 'Amit Kumar', 'Praful Hinge', 'Shivam Mavi'],
};

export const WICKET_RANGES = ['<5', '5-8', '9-11', '12-14', '15-17', '18-20'];
export const DOUBLE_CATEGORIES = ['Winning Team', 'Best Batsman', 'Best Bowler', 'Powerplay Winner', 'Dot-Ball Bowler', 'Total Wickets'];
export const FANTASY_PLAYERS = ['Siddu', 'Venky', 'Sampath', 'Pa1', 'Navdeep'];

export const EMPTY_SELECTION: SelectionRecord = {
  winningTeam: '',
  bestBatsman: '',
  bestBowler: '',
  powerplayWinner: '',
  dotBallBowler: '',
  totalWickets: '',
  duckBatsman: '',
  doubleCategory: '',
  winningHorse: '',
  losingHorse: '',
};

export function normalizeFantasyUsername(name: string): string {
  return name.toLowerCase().replace(/\s/g, '_');
}

export function scoreKeyFromDoubleCategory(label: string): string {
  return ({
    'Winning Team': 'winningTeam',
    'Best Batsman': 'bestBatsman',
    'Best Bowler': 'bestBowler',
    'Powerplay Winner': 'powerplayWinner',
    'Dot-Ball Bowler': 'dotBallBowler',
    'Total Wickets': 'totalWickets',
  } as Record<string, string>)[label] ?? label;
}
