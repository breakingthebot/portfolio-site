/*
 * src/content/posts.js
 * Blog post content. Each post is plain data — title, date, excerpt, and
 * body as an array of paragraphs — so adding a new post never touches
 * component code.
 * Connects to: src/services/blogService.js
 * Created: 2026-07-07
 */

const POSTS = [
  {
    slug: "why-286-builds",
    title: "This Isn't New — It's Just the First Time I'm Logging It",
    date: "2026-07-07",
    excerpt:
      "For 25 years before I touched an AI tool, my job was the same thing over and over: get dropped into a system nobody trained me on, and figure out how to automate the part that was eating everyone's time.",
    body: [
      "For 25 years before I touched an AI tool, my job was the same thing over and over: get dropped into a system nobody fully trained me on, figure out how the pieces actually connect underneath, and build something to automate the part that was eating everyone's time.",
      "No CS degree. No formal training on any of it. I'd get access to a screen, a database, a report tool, and just start mapping — which fields fed which tables, which manual process could become one query instead of an afternoon. Sometimes that meant finding a hidden identifier buried in a report string that turned a multi-day search into a five-minute lookup. Sometimes it meant redesigning an entire inventory workflow around how I actually worked instead of how it was documented. The tools changed — a legacy 90s database, then Oracle and SQL, then Excel, then job-scheduling and ERP systems — but the pattern didn't. Give me a system, and I'll take it apart until I understand it well enough to make it faster.",
      'I didn\'t think of any of that as "development." It was just operations work. Solving the problem in front of me with whatever was available.',
      "In March 2025, I asked an AI to help me build a webpage, mostly out of curiosity. It worked — crude, but it worked, and something clicked. Within a month I'd built around 50 small Python programs: a calculator that turned into a scientific calculator, a chat-log parser, a physics sandbox, little tools built purely because I wanted to see if I could. By mid-2025 I was building autonomous multi-agent systems from scratch — no frameworks, no templates, just a protocol I iterated on until AI agents could hand work to each other on their own. I ran thousands of prompts through that system and logged hundreds of full runs. Then I taught myself deployment and shipped a run of small apps in a month. Since then it's been a mix of AI video work, more backend integration builds, and now this.",
      "None of that is really new behavior for me. It's the same instinct that's driven every job I've had — dig until you understand the system, then automate the boring part. What's different this time is that I'm actually documenting it. Every other version of this — the reverse-engineered reports, the redesigned workflows, the years of quietly automating myself into being able to do more with less — happened inside a company, undocumented, invisible outside the four walls I did it in.",
      "AI-286-Builds is 286 small projects across as many languages, tools, and problem types as I can manage, each one logged: what I built, why, what broke, what I'd do differently. It's not because I need to prove I can build things — I've been doing that for 25 years. It's because I've never had a public trail of it before, and breadth-first is how I've always actually learned: touch enough different systems that the patterns underneath them start showing themselves, then decide what's worth going deep on.",
      "That's the why. The builds themselves are the rest of the story.",
    ],
  },
];

export default POSTS;
