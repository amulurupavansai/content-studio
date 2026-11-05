export interface Niche {
  name: string;
  summary: string;
  pros: string[];
  cons: string[];
}

export const NICHES: Niche[] = [
  { name: "Animated history stories", summary: "Short, dramatic retellings of forgotten events and figures.", pros: ["Evergreen topics", "Public-domain sources", "Strong watch time"], cons: ["Fact-checking is mandatory", "Crowded niche"] },
  { name: "Personal finance explainers", summary: "Budgeting, investing and money habits in simple whiteboard style.", pros: ["High CPM / ad rates", "Loyal audience", "Affiliate potential"], cons: ["Must avoid giving regulated advice", "Competitive"] },
  { name: "Psychology facts", summary: "Quick animated breakdowns of biases, habits and behaviour.", pros: ["Highly shareable", "Easy to script", "Works as Shorts/Reels"], cons: ["Risk of pop-psych inaccuracies", "Needs fresh angles"] },
  { name: "Space & astronomy", summary: "Planets, black holes and cosmic scale comparisons.", pros: ["Stunning visuals from NASA public domain", "Evergreen curiosity"], cons: ["Heavy competition", "Complex animation for scale"] },
  { name: "Scary stories / horror narration", summary: "Animated creepypasta and true-crime-style tales.", pros: ["Huge binge-watching audience", "Simple art style works"], cons: ["Demonetisation risk", "Need permission for stories"] },
  { name: "Life hacks & productivity", summary: "Study tips, routines, focus techniques.", pros: ["Broad audience", "Cheap to produce"], cons: ["Generic content saturates", "Low differentiation"] },
  { name: "Science experiments explained", summary: "Why things fizz, float or explode — illustrated.", pros: ["Family friendly", "Great for Shorts"], cons: ["Accuracy needed", "Lower CPM for kids content"] },
  { name: "Mythology & folklore", summary: "Greek, Norse, Indian and world myths retold.", pros: ["Public-domain material", "Passionate fans"], cons: ["Cultural sensitivity", "Needs consistent character art"] },
  { name: "Motivational / stoic quotes", summary: "Voiceover over looping animated scenes.", pros: ["Very fast to produce", "Daily posting feasible"], cons: ["Extremely saturated", "Low retention"] },
  { name: "Tech & AI news explainers", summary: "Weekly rundown of gadgets, apps and AI.", pros: ["Constant topic supply", "Affiliate/sponsor friendly"], cons: ["Topics age quickly", "Competes with big outlets"] },
  { name: "Language learning snippets", summary: "Phrase-of-the-day with animated scenes.", pros: ["Repeat viewers", "Series format"], cons: ["Needs fluent review", "Slow monetisation"] },
  { name: "Health & body facts", summary: "How sleep, food and exercise affect the body.", pros: ["Evergreen demand", "Easy visual metaphors"], cons: ["Medical-claim policy risk", "Needs reliable sources"] },
  { name: "True crime (animated)", summary: "Case retellings with stylised, non-graphic visuals.", pros: ["Very strong audience", "Long watch time"], cons: ["Legal/ethical care", "Demonetisation risk"] },
  { name: "Geography & maps", summary: "Country comparisons, borders, hidden facts.", pros: ["Map assets are easy to animate", "Shareable"], cons: ["Political sensitivities", "Accuracy upkeep"] },
  { name: "Gaming lore explainers", summary: "Story breakdowns of popular game universes.", pros: ["Built-in fanbases", "Cheap with fair-use clips or own art"], cons: ["Copyright/IP risk", "Tied to game popularity"] },
  { name: "Kids' bedtime stories", summary: "Calm narrated stories with soft animation.", pros: ["Evergreen", "Series potential"], cons: ["Strict kids-content rules (no personalised ads)", "Lower CPM"] },
  { name: "Business case studies", summary: "How companies won, failed or pivoted.", pros: ["High-value audience", "Good CPM"], cons: ["Research heavy", "Needs strong storytelling"] },
  { name: "Philosophy in 60 seconds", summary: "Big ideas distilled with metaphors.", pros: ["Shareable on Reels", "Public-domain texts"], cons: ["Niche audience", "Abstract to visualise"] },
  { name: "Dark facts / unsolved mysteries", summary: "Strange events and unexplained phenomena.", pros: ["High curiosity click-through", "Binge friendly"], cons: ["Clickbait fatigue", "Fact-check burden"] },
  { name: "Cooking science & food facts", summary: "Why recipes work, food origins and myths.", pros: ["Broad appeal", "Visual metaphors easy"], cons: ["Weaker than real food footage", "Sponsor mismatch"] },
  { name: "Animal facts", summary: "Strange abilities and behaviours of animals.", pros: ["Family friendly", "Great Shorts performer"], cons: ["Needs licensed or drawn art", "Competitive"] },
  { name: "Career & side-hustle advice", summary: "Skills, jobs and freelance income paths.", pros: ["Commercial intent", "Lead-gen potential"], cons: ["Scam-adjacent perception", "Claims need honesty"] },
  { name: "Book summaries", summary: "Key lessons from popular books.", pros: ["Built-in topic list", "Affiliate links"], cons: ["Copyright care", "Many existing channels"] },
  { name: "Sleep & relaxation stories", summary: "Slow narration with calm looping visuals.", pros: ["Very long watch time", "Low editing effort"], cons: ["Slow growth", "Low engagement signals"] },
  { name: "Conspiracy-myth debunking", summary: "Animated fact-checks of viral myths.", pros: ["Trending hooks", "Educational value"], cons: ["Comment-section toxicity", "Needs strong sourcing"] },
  { name: "Architecture & engineering marvels", summary: "How bridges, towers and machines work.", pros: ["Visual and satisfying", "Evergreen"], cons: ["Technical animation effort", "Research time"] },
  { name: "Relationship & dating psychology", summary: "Communication tips and attachment styles.", pros: ["Very high engagement", "Great for Reels"], cons: ["Advice sensitivity", "Cliché content risk"] },
  { name: "Would-you-rather / quiz shorts", summary: "Interactive polls and trivia clips.", pros: ["Comments boost reach", "Cheap templates"], cons: ["Low loyalty", "Hard to monetise long-term"] },
  { name: "Crypto & web3 explainers", summary: "Simple takes on blockchain and markets.", pros: ["Eager audience", "High CPM in bull markets"], cons: ["Volatile interest", "Scam/regulatory concerns"] },
  { name: "Environment & climate explainers", summary: "Clear visuals of data, causes and solutions.", pros: ["Growing interest", "Data-viz friendly"], cons: ["Polarising comments", "Needs rigorous sources"] },
];
