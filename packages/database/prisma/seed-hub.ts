import 'dotenv/config';
import { prisma } from '../src/client';

// Converts the plain-text copy captured from the live site into basic HTML
// (paragraphs + line breaks) so it renders correctly through the dashboard's
// rich-text editor and the Hub's HTML-rendering — kept as plain text above
// for readability, transformed only at write time.
function toHtml(text: string): string {
  return text
    .split('\n\n')
    .map((paragraph) => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
    .join('');
}

async function seedPrograms() {
  await prisma.program.upsert({
    where: { slug: 'ready-for-tomorrow' },
    update: {},
    create: {
      slug: 'ready-for-tomorrow',
      title: 'Ready For Tomorrow (Digitera) - 2026',
      subtitleEn: 'Ready for Tomorrow — A Youth Inclusion and Employment Project.',
      subtitleAr: 'جاهزون للغد — مشروع دمج وتوظيف الشباب',
      logoUrl: 'http://localhost:3003/programs/digitera-logo.png',
      imageAspect: '16:6',
      aboutBody: toHtml(
        'Ready for Tomorrow is a fully free employment pathway for ambitious young graduates in Greater Cairo. Built in partnership with Plan International and the Danish-Arab Partnership Program, the program is designed to help you secure your first job through:\n\n' +
          'Life skills training to build career awareness and job readiness\n' +
          'Technical upskilling aligned with market demand\n' +
          'Personalized career coaching and interview preparation\n' +
          'Direct access to employers who are actively hiring\n\n' +
          'Every stage of the program is designed around one goal: helping you land your first real job offer.',
      ),
      phases: [
        {
          title: 'Life Skills Bootcamp (2 days)',
          description: toHtml(
            'Build career awareness, understand the job market, and learn how to write a strong CV and perform confidently in interviews',
          ),
        },
        {
          title: 'Technical Training (6 days)',
          description: toHtml('Choose between a technical or business track based on your background and interests'),
        },
        {
          title: 'Personalized Coaching',
          description: toHtml(
            'One-on-one sessions with a career coach to support your job applications and interview preparation',
          ),
        },
        {
          title: 'Career Exposure',
          description: toHtml(
            'Attend career days and mentorship events, with direct access to hiring managers and industry professionals',
          ),
        },
      ],
      benefits: [
        'Valuable knowledge',
        'Required skills in today’s job market',
        'Certification of completion',
        'Duration of 8 days (2 Life Skills and 6 Technical Training)',
        'Attend Career Fairs',
        'Attend Mentor Mingle Events',
        '1-1 Dedicated Coach till employment',
      ],
      criteria: [
        'University graduates aged 18–35',
        'Actively seeking employment',
        'Up to 3 years of professional experience',
        'Based in Greater Cairo',
        'Able to commit to the full program duration',
      ],
      partnerName: 'Plan International Egypt',
      partnerBio: toHtml(
        'Plan International is an independent development and humanitarian organisation that advances children’s rights and equality for girls. Plan International has been working in Egypt since 1981 following an agreement with the Ministry of Foreign Affairs and under the supervision of the Ministry of Social Solidarity.',
      ),
    },
  });

  await prisma.program.upsert({
    where: { slug: 'talentex-academy' },
    update: {},
    create: {
      slug: 'talentex-academy',
      title: 'Talentex Academy: From Talent to Career',
      subtitleEn: 'Talentex Academy — A Youth Skills & Employment Pathway',
      subtitleAr: 'أكاديمية تالانتكس — مسار لمهارات وتوظيف الشباب',
      logoUrl: 'http://localhost:3003/programs/talentex-banner.jpg',
      imageAspect: '16:6',
      aboutBody: toHtml(
        'Talentex Academy is a comprehensive employability and career development program designed to support youth in Egypt in transitioning successfully into the job market. The academy bridges the gap between academic learning and employer expectations by equipping ambitious young people, aged 20–25, with the technical, professional, and career readiness skills needed for sustainable employment.\n\n' +
          'The academy combines employability skills training, field-based career learning, personalized coaching, and direct employer connections to help participants build successful career pathways and access real job opportunities.',
      ),
      phases: [
        {
          title: 'Phase 1: Employability Skills Foundation (1 Day)',
          description: toHtml(
            'An online, on-demand interactive session covering essential career readiness skills, including: Building a strong CV/Resume; Optimizing LinkedIn and Wuzzuf profiles; Career planning and goal setting; Communication and professional presentation skills; Understanding the job market and recruitment process. This phase helps participants build the foundational life and employability skills needed to navigate the modern job market with confidence.',
          ),
        },
        {
          title: 'Phase 2: Field-Specific Training (5 Days)',
          description: toHtml(
            'An online, on-demand intensive training track that participants can complete at their own pace within 5 days. The program currently features the Sales Academy, where participants will: Learn the fundamentals of sales and customer engagement; Explore key professional fields such as Sales, Marketing, and Customer Success; Understand real workplace expectations and performance standards; Gain exposure to essential workplace tools such as CRM systems. Additional field-based learning tracks will be introduced over time to align with evolving labor market needs.',
          ),
        },
        {
          title: 'Phase 3: Coaching & Mentorship',
          description: toHtml(
            'Participants gain access to a dedicated coaching and support ecosystem designed to help them successfully navigate their job search journey. This phase includes: Access to a coaching community where participants can ask questions, receive support from coaches, and engage with peers; Daily live online "Ask Me Anything" sessions where participants can connect with coaches in real time, ask questions, and get support to unblock challenges in their job search journey; Live webinars on career and employability topics; Personalized 1:1 coaching sessions for selected participants where they will receive personalized coaching services: Tailored CV reviews and interview preparation; LinkedIn and professional profile optimization; Career planning and job search guidance. The coaching phase is designed to provide ongoing mentorship, accountability, and practical support throughout the employment journey.',
          ),
        },
        {
          title: 'Phase 4: Employment Placement',
          description: toHtml(
            'The ultimate goal of Talentex Academy is sustainable employment. Through employer partnerships and curated candidate referrals, the program supports participants in connecting with hiring companies and accessing real job opportunities. Our aim is to help participants secure employment within 3 months of completing their training journey.',
          ),
        },
      ],
      benefits: [
        'Field-based learning tracks (e.g., Sales) aligned with real job market needs',
        'Personalized coaching and CV writing, profiles optimization, and interview preparation support',
        'Direct employer exposure through job referrals and hiring opportunities',
      ],
      criteria: [
        'Must be currently unemployed and actively seeking employment',
        'Willing and ready to work full-time or pursue internships after the program',
        'Aged between 20–25 years old',
        'Fresh graduates, undergraduates, and early-career professionals with 0–4 years of experience are eligible',
        'Must be located in Greater Cairo (Cairo, Giza, and Qalyubia) and willing to work in these areas after the program',
        'Commitment to attend all training phases and sessions',
        'Interest in developing employability and career readiness skills',
        'Passionate about starting or growing a career in the selected track',
        'Basic English communication skills preferred',
      ],
      partnerName: 'iCareer',
      partnerBio: toHtml(
        'iCareer is a leading career development and employability platform dedicated to empowering youth through innovative learning experiences, career guidance, and direct employment opportunities. Through strategic partnerships with employers, development organizations, and educational institutions, iCareer bridges the gap between education and the labor market by equipping young talents with the skills, mentorship, and career support needed to succeed in today’s evolving workforce.',
      ),
    },
  });

  await prisma.program.upsert({
    where: { slug: 'next-path' },
    update: {},
    create: {
      slug: 'next-path',
      title: 'Next Path',
      subtitleEn: 'A fully free career launchpad for recent graduates and senior students in Greater Cairo.',
      subtitleAr: null,
      logoUrl: 'http://localhost:3003/programs/nextpath-banner.png',
      imageAspect: '16:6',
      aboutBody: toHtml(
        'You worked hard to get that degree. Now comes the part no one really prepares you for — the job search. Next Path is here for exactly that moment.\n\n' +
          'Next Path is a fully free career launchpad for recent graduates and senior students in Greater Cairo. It gives you the practical skills, the professional coaching, and the direct employer connections you need to land your first real job — fast.\n\n' +
          'This is not another online course. This is a structured journey from "just graduated" to "I got the offer." Built on a proven employment framework and backed by Plan International, Next Path brings together technical training, soft skills development, and a real hiring pipeline — all in one place, at no cost to you.',
      ),
      phases: [],
      benefits: [
        'Life skills bootcamp — two days of professional readiness training covering self-awareness, career mapping, communication, and workplace confidence',
      ],
      criteria: [
        'University graduate or senior student',
        '21 to 30 years old',
        'Based in Greater Cairo',
        '0 to 3 years of experience',
        'Actively looking for work',
        'Open to all faculties and backgrounds',
      ],
      partnerName: 'iCareer',
      partnerBio: toHtml(
        'iCareer is a leading career development and employability solutions provider focused on bridging the gap between education and employment across the MENA region. Founded in 2012, iCareer delivers end-to-end digital services, training programs, and career guidance solutions designed to prepare early talent for the evolving job market.',
      ),
    },
  });
}

async function seedArticles() {
  const articles: {
    slug: string;
    title: string;
    category: 'CAREER_HACKS' | 'JOB_SEARCH' | 'DAY_IN_THE_LIFE' | 'GUIDE';
    publishedAt: string;
    body: string;
  }[] = [
    {
      slug: 'beyond-numbers-transforming-career-platforms-with-ai-powered-insights',
      title: 'Beyond Numbers: Transforming Career Platforms with AI-Powered Insights',
      category: 'GUIDE',
      publishedAt: '2026-06-09',
      body: `Career platforms have always been good at collecting data. Applications, profiles, search histories, click patterns — the numbers pile up fast. The problem is that numbers on their own don't help anyone get hired. A dashboard full of metrics is useless to an early-career candidate if it doesn't translate into a clear next move. The real shift happening in career platforms isn't about collecting more data. It's about turning that data into insight — and that's where AI changes everything.

The limits of raw data
For years, the promise of digital career platforms was access: more jobs, more profiles, more information than anyone could have reached before. That access mattered. But access without direction creates its own problem.
An early-career candidate facing hundreds of listings and dozens of skill suggestions doesn't feel empowered. They feel overwhelmed. The data is all there, but the meaning isn't. Which role actually fits? Which skill is worth learning first? Which path leads somewhere? Raw numbers don't answer those questions.
That gap between having data and understanding it is exactly what AI-powered platforms are built to close.

From data to insight
Machine learning is good at something humans struggle with at scale: finding patterns across enormous amounts of information and turning them into something useful for one specific person.
On a career platform, that looks like:
Reading the market in real time. Instead of static advice, AI can surface which skills are actually in demand for the roles a person is targeting, based on current hiring signals rather than last year's assumptions.
Matching people to the right opportunities. Rather than returning every loosely relevant listing, intelligent matching narrows the field to roles that genuinely fit a candidate's profile and goals.
Spotting gaps early. AI can compare where someone is against where they want to be and flag the specific gaps standing between them — before those gaps cost them an interview.
The shift is subtle but huge: the platform stops being a place to search and becomes a place to understand.

A better experience for the user
Insight only matters if it reaches the person in a way they can act on. That's why AI-powered features don't just sit in the background — they reshape the entire experience.
A candidate doesn't have to dig through endless results to find what's relevant; the relevant things come to them. They don't have to guess which skill to build next; the platform points to it with a reason attached. The experience becomes less about effort and more about momentum.
For early-career talent especially, that difference is decisive. People at the start of their journey have the least context and the most uncertainty. A platform that hands them clarity instead of more options is a platform that actually moves their career forward.

Personalized advice, grounded in data
Generic career advice is everywhere, and most of it is forgettable. "Build your network." "Learn in-demand skills." True, but vague. What does it mean for this person, with this background, aiming at this role?
AI-powered platforms can make advice specific. Because the recommendations are grounded in real data about both the individual and the market, they carry weight. They're not motivational posters; they're data-driven strategies tailored to a person's actual situation. That specificity is what turns advice into action.

Why early-career talent benefits most
It's worth being direct about who gains the most here. Experienced professionals already have networks, instincts, and a track record to lean on. Early-career talent has none of that yet — which is exactly why intelligent insight is so valuable to them.
For someone taking their first steps in tech, AI-powered guidance compresses years of trial and error into a clear path. It helps them avoid the wasted effort, the wrong turns, and the missed opportunities that come from navigating a complex job market without a map. That's not a small convenience. It's a genuine head start.

The human judgment behind the numbers
None of this means handing careers over to algorithms. The best platforms use AI to inform decisions, not to make them. Insight is most powerful when it's paired with human judgment — a person's own goals, values, and instincts about what they want their working life to look like.
AI handles the analysis. People make the choices. That balance is what keeps a career platform genuinely helpful instead of coldly mechanical.

Building what comes next
The job market will keep getting more complex, not less. For early-career talent navigating it, the platforms that win won't be the ones with the most data — they'll be the ones that turn data into something a person can actually use.
That's the future iCareerHub is building toward: career tools that go beyond numbers to deliver real insight, real direction, and real momentum for the next generation of tech talent. Because in the end, the goal was never more data. It was always a better outcome for the people behind it.`,
    },
    {
      slug: 'ai-career-paths-crafting-tailored-experiences',
      title: 'AI & Career Paths: Crafting Tailored Experiences for the Ambitious Tech Talent',
      category: 'GUIDE',
      publishedAt: '2026-06-09',
      body: `No two careers look the same. Two people can start with the same degree, the same ambition, and the same drive — and end up on completely different paths. So why do so many career programs still treat everyone as if they're the same person? At iCareerHub, we think the answer to ambitious tech talent isn't a one-size-fits-all curriculum. It's an experience built around the individual. AI is what makes that possible at scale.

The problem with the standard career path
For a long time, "career development" meant a fixed track. Everyone took the same courses in the same order, regardless of where they were starting from or where they wanted to go. It was efficient to deliver, but it wasn't efficient for the learner.
The result was familiar: people spending time on skills they already had, skipping past the gaps that actually held them back, and finishing a program without a clear sense of what to do next. Talented, motivated people were being slowed down by a system that couldn't see them as individuals.
Ambitious talent deserves better than a track. It deserves a path.

How AI personalizes the journey
This is where AI changes the picture. Instead of pushing everyone through the same sequence, our platform shapes the experience around each person's starting point and goals.
It maps where you are. AI assesses current skills, background, and experience to build an honest picture of your starting line — not where the average learner is, but where you are.
It understands where you want to go. Ambitions differ. Someone aiming for a data role needs a different path than someone heading toward product or engineering, and the experience adapts accordingly.
It recommends the right next step. Rather than overwhelming you with everything at once, the system surfaces the skill or module that will move your career forward most right now.
The effect is a path that feels built for you — because it is.

Nurturing specific skills, not generic ones
Generic skills produce generic candidates. The tech world doesn't reward "knowing a bit of everything"; it rewards depth in the things that matter for a specific role.
Tailored experiences let us focus on the skills that count for each person's goals. A learner targeting a particular role gets a path weighted toward the capabilities that role demands — both the technical ones that get them hired and the durable ones, like problem-solving and communication, that help them grow once they're in.
That focus is what turns potential into employability, and employability into a real, lasting career.

Guidance that adapts as you grow
A career path isn't a single decision; it's a series of them. The right next step at the start looks nothing like the right next step six months in.
AI-driven guidance keeps pace with that. As skills develop and goals sharpen, the recommendations evolve too. The path isn't locked in on day one — it adjusts as you do, which means the support stays relevant instead of going stale the moment your situation changes.
For ambitious talent moving quickly, that responsiveness matters. It's the difference between a program that fits you in January and one that's already outgrown by spring.

Where the human element comes in
Personalization powered by AI is a tool, not the whole story. The technology is brilliant at analysis and adaptation, but careers are still built on human things — mentorship, encouragement, real conversations about hard choices.
That's why we use AI to handle the heavy lifting of customization, which frees up time and attention for the human support that genuinely shapes a career. The combination is what works: intelligent personalization plus real people who care about the outcome.

Guiding the next generation of innovators
The tech world's next wave of innovators is in early-career roles right now, figuring out where they fit and what they're capable of. The faster they find a path that matches their ambition, the faster they start contributing real work and real ideas.
That's the bigger purpose behind tailored career experiences. It's not just about helping one person land one job. It's about making sure ambitious talent doesn't get lost in a generic system — so the people who could be tomorrow's innovators actually get there.

Your path, built for your ambition
If you're serious about a career in tech, you shouldn't have to fit yourself into someone else's template. The path should fit you — your starting point, your goals, your pace.
That's exactly what iCareerHub is built to deliver: a tailored, AI-powered experience that takes your ambition seriously and gives it a clear route forward. The next generation of tech talent won't be shaped by one-size-fits-all programs. It'll be shaped by experiences as individual as the people in them.`,
    },
    {
      slug: 'building-tomorrows-leaders-how-icareerhub-redefines-career-growth-with-ai',
      title: "Building Tomorrow's Leaders: How iCareerHub Redefines Career Growth With AI",
      category: 'GUIDE',
      publishedAt: '2026-06-09',
      body: `The tech landscape doesn't sit still, and neither should the people building careers in it. Skills that felt essential three years ago are already being rewritten, and the gap between what early talent learns and what employers actually need keeps widening. At iCareerHub, we've spent more than a decade closing that gap — and today, artificial intelligence is helping us close it faster and more precisely than ever.

From employability training to intelligent career growth
iCareerHub started in 2012 with a single, focused mission: teach employability to early talent. Over the past ten years we've grown from a training provider into an end-to-end digital platform serving a tech-savvy generation that learns, works, and grows differently than the one before it.
That evolution wasn't cosmetic. The way people enter and move through their careers has changed, so the support around them had to change too. AI is the engine that lets us do this at scale — not by replacing the human side of career growth, but by sharpening it.

What "AI-driven" actually means here
It's easy to slap "AI" on a product. It's harder to make it genuinely useful. For us, AI shows up in the moments that matter to a learner:
Personalized pathways. Instead of pushing everyone through the same curriculum, our programs adapt to where a person actually is — their background, their goals, and the roles they're targeting.
Skills gap insights. We map an individual's current skills against the real demands of the market, so the next step they take is the one most likely to move their career forward.
Smarter feedback. AI helps surface clear, specific feedback faster, so learners spend less time guessing and more time improving.
The goal isn't automation for its own sake. It's giving each person a clearer line of sight from where they are now to where they want to be.

Programs built for tomorrow's challenges
Future leaders aren't defined only by technical ability. They're defined by how they adapt, communicate, and make decisions when the ground keeps shifting. Our programs are designed around that reality.
They blend the practical skills that get someone hired — the tools, the workflows, the hands-on experience — with the durable capabilities that help someone grow once they're in the role. Critical thinking, collaboration, and the confidence to learn continuously aren't afterthoughts; they're built into the structure of what we deliver.
That's what "ready for tomorrow" really means. Not just ready for the first job, but equipped for a career that will look different every few years.

Why this matters for early talent
The early stage of a career is where the most uncertainty lives. People are talented and motivated, but they often don't know which skills to prioritize, which roles fit them, or how to stand out. Left alone, that uncertainty turns into wasted time and missed opportunities.
This is exactly where intelligent guidance earns its keep. By helping early talent focus on the right skills at the right time, we shorten the distance between potential and a real, paying role — and we set people up to keep growing long after that first job.

The human side stays central
It's worth being clear about one thing: AI doesn't replace mentorship, community, or the human judgment that good career development depends on. It amplifies them. The technology handles the heavy lifting of personalization and analysis, which frees up time and attention for the parts of growth that only people can provide.
Tomorrow's leaders won't be built by algorithms alone. They'll be built by the combination of smart tools and genuine support — and that combination is exactly what iCareerHub is designed to deliver.

Looking ahead
The pace of change in tech isn't slowing down, and that's not a problem to fear. For people with the right preparation, it's an opportunity. iCareerHub exists to make sure early talent walks into that opportunity ready — with the skills, the clarity, and the confidence to lead.
The careers of tomorrow are being shaped right now. The question is simple: will you be ready for them? We're here to make sure the answer is yes.`,
    },
    {
      slug: 'how-to-learn-more-about-employers',
      title: 'How to Learn More About Employers?',
      category: 'GUIDE',
      publishedAt: '2023-09-25',
      body: `Setting an intention to learn about employers and their hiring process is super effective to be aware of the market and to discover many companies that you might have never come across before. It gives you an edge and shows how knowledgeable you are in the industry. However, it could be overwhelming, knowing where to start, especially with the abundant markets and industries. This article will break down the steps for you to enable you to organize your thought process.

Start by listing all top employers you know of and classifying them according to their industries. Next, look up the competitors of these companies. This way, you get to know competitor companies and at the same time grow your employers list.
Another smart way to look up companies that are within similar industries, is to go to LinkedIn, look up any of the companies on your list, and check the right-sidebar 'Pages people also viewed'. Or even the simplest method of all and the oldest in the book is googling it. Search keywords like "Startups in Egypt" or "Multinationals in Egypt" to find the results you're looking for.
Now after you've listed the employers you know of, list their products and search for competitor products. If the manufacturers of these products aren't already on your list, make sure to add them as well. For example: 'Pampers' is manufactured by P&G. The competitors of Pampers are Molfix, Babyjoy and Fine Baby. Look up the products' manufacturers; they are: Hayat, Unicharm & Fine Hygienic. There is a big chance you have never heard of these 3 multinational companies.

Next, you need to gather a full picture about each company by searching for this information:
Industry
Company description (about)
Website
Headquarter & other offices or branches
Company Size (number of employees)
Competitors
Values
Vision
Mission
Social media links
Hiring process
Interview questions
Jobs & internships

You can collect this information from LinkedIn, Glassdoor, and the company's website. By knowing the above information, you can now shortlist the companies you have an interest in. Save the links where they post vacancies, follow these companies on LinkedIn, and follow people who work at these companies to stay updated and get a richer, deeper insight.
This exercise will increase your market awareness, which is indeed an eye opener that will first help you make-up your mind regarding the company you want to work at, and will always give you options everytime you are looking for a job so that you are more to get hired faster by understanding their hiring process and know how to prepare yourself for their interview.`,
    },
    {
      slug: 'stand-out-with-your-linkedin-profile',
      title: 'Stand out with your LinkedIn Profile',
      category: 'CAREER_HACKS',
      publishedAt: '2023-09-19',
      body: `There's so much emphasis on creating an appealing LinkedIn profile. This is valid, as it is the first go-to platform for recruiters to post a job or headhunt. However, despite its importance, many people fail to create a complete profile. This article will guide you through the steps and different sections of LinkedIn to create an appealing profile. Before we go on about the sections and tips, it's important to realize the vitality of a LinkedIn profile:

Personal Branding – You can choose how other professionals see you by setting your desired reputation among them. Maintaining a complete profile with the intended reputation will help the right recruiters find you easily.
Endless Opportunities – It opens doors for opportunities, local and global, that you might have not found elsewhere by making it easier to connect with recruiters.
Professional Documentation – You can document all of your professional history, achievements, anniversaries, promotions, etc. Thus, making it easier for you to showcase your experience to countless members all at once.

Now that you've realized the importance of maintaining your LinkedIn profile, let's go through the sections of your profile:

Profile Photo – Adding a profile photo makes it 14 times more likely to get profile views. But there are certain rules to follow for the photo to fit the professional criteria of the platform.
Keeping a neutral background
Using most of the frame
Choosing a familiar picture to how you look at the meantime

Background Photo – This is the second visual element that people notice in your profile. It could be a form of marketing for your current company, or it could showcase what matters to you. Either way, it grabs people's attention, so make sure you pick the right one.
Headline – A headline can be more than just your job title. It's one of the first things people see before scrolling through your profile, so you can say more about your role, career aspirations and why you do what you do.
Summary – Many people would rather not give this section enough thought or would just skip it, when in fact it's where you can market for yourself. You can tell your story whichever way you want. Whether you'll be writing about your career path or the skills that helped you take that path, make sure you highlight how you bring benefit to the people working with you.
Tip #1: Avoid using buzzwords like "motivated", "experienced", "passionate". Instead demonstrate the skills you have with evident tangible results that you have achieved or awards that you received.
Tip #2: Support your summary with media like videos or blog posts, if any.

Experience – After writing the company name and your job title, don't hesitate to mention in detail your responsibilities. It'll help headhunters and your network to build a clearer picture of what you do.
Tip: if you worked on any postable projects or a full portfolio, share them to demonstrate any skills that you have. It will give you more credibility, since employers are most keen to hire based on experience.

Education – Include this section to let employers know what background you come with, to connect with alumni from your school and to make it easier to know which people from your school worked at the companies you look up. However, it's usually more important for entry-level job seekers.
Skills and endorsements – Add skills that contribute to your achievements, highlight your strength points and define your professional role. Ask your colleagues, managers and people from your network to give you endorsements for those skills. Another way to get endorsement is to pass it first. Go through your connections and see who you can give endorsement to. Chances are they will feel tempted to pay it back.
Recommendations – Recommendations are more preferable over endorsements as they give more credibility. Ask your selected connections for recommendations and specify what you want the recommendations to be for. They should be relevant and give proper insight instead of being just generic. For example, instead of "it's a pleasure to work with Mohammed", you should opt for something more specific like "Mohammed has made our work much more efficient by creating a new tracking system".

General Tips
Grow your Network – A rich network is your gateway to many opportunities. While it's recommended to opt for at least 300 connections, quality is more important than quantity. Instead, you should focus on building a network of people in the same industry as yours and business leaders that you'd learn from.
Join a Linkedin Group – Not everyone is familiar with those, but Linkedin groups let you join a common platform with others who share similar interests like you do. Besides, it makes it easier to reach out and connect to these people to exchange knowledge.
Follow Relevant Business Leaders and Influencers – Relevant following list means interesting content on your feed and better opportunities to share useful material with your network that might end up being a conversation starter.
Complete your Profile – Only 51% of people have a complete LinkedIn profile. The remaining percentage of people doesn't realize that incomplete profiles don't appear in most searches, so setting the time of your day to work on your profile and think the sections through, filling in missing information, can go a long way. It doesn't have to be long hours; a few minutes on a couple of days will do the job.`,
    },
    {
      slug: 'ace-the-interview',
      title: 'Ace the Interview',
      category: 'GUIDE',
      publishedAt: '2023-08-03',
      body: `Congratulations! You've passed the initial screening with your CV and got an interview. Now is the time to prove that you really are fit for the job in person, not just on paper.
Interview preparation is divided into 3 phases: before the interview, during the interview and after the interview. You'll typically have more than one interview before you get accepted.

Before the interview:

Know the interview
Before you actually prepare for the interview, you should know what you are preparing for exactly. Ask about the type of the interview, whether it's HR or technical. This will help you focus on what's important. Typically, you would first need to pass an HR interview before moving on to the technical one.
HR interview: it is an interview with an HR professional, through which he makes sure you fit into the organizational culture; you share similar beliefs and values. It's also intended to assess your motivation to join the company, the relevance of your experience to the job role and the potentiality of your addition to the company.
Technical interview: is an interview in which you are interviewed by an experienced personnel in the same field as yours; it might be your direct manager or the department manager, depending on the company size. In which they are trying to make sure that you are technically experienced and fit for the required position.

Research the company
You'll be surprised to find that you know very little about the organization you're applying to once you start doing your research and actually know more about it. There are multiple sources that you could use, starting with the organization's website and social media. You could know more about their recent activities and the direction they're headed towards. Make sure you are well-aware of the products and services they offer. You should be backed up with enough information to be able to answer the questions, "What do you know about our company?" and "Why do you want to work here?"
Aside from the company itself, make sure you are familiar with the job description the position calls for, so you can demonstrate the skills needed.

Research the industry
Knowing more about the industry and the company's competitors will give you an edge when you talk about the trends and challenges.

Know the interviewer
If you already know the name of the interviewer, you can get to become more comfortable by actually knowing a bit about them by checking their LinkedIn. It will also make it easier to build rapport with the person who might hire you and minimize interview anxiety.

Know yourself
Preparing for an interview doesn't require you to know only about the organization, but also about yourself. Identify your skills, strengths and weaknesses, and practice how you'll communicate them during the interview where you showcase how your skills fit the position, and emphasize how your strengths will be a benefit for the people working with you and how you are tackling your weaknesses. There's a big chance you'll be asked on situations where you were able to utilize your strengths, so make sure you prepare some stories for credibility.

Commonly asked interview questions

Introduce yourself
To answer this question you have to prepare yourself. We are not used to talking about ourselves constantly therefore the following model is designed to help you introduce yourself effectively.
PWIS is an abbreviation that stands for: Personal, Work experience, Interests, Skills. By answering this question by stating an information or two in each of previous aspects you are delivering a 360 answer that indicates professionalism, organization and effectiveness.

Where do you see yourself in 5 years?
Although the question seems overrated, it is used to test your understanding of the nature of the job, your awareness of the company. In addition to the fact they need to know you are staying with the company. Therefore expect the interviewer to ask for those pillars either with the same question or by asking other questions. Your answer should be considering the following:
1- The professional career progression of the position you are applying for.
2- The career progression nature of the organization.

Why are you leaving your current job?
This is one of the toughest, it shows your integrity, sense of honesty and social intelligence. In a sense you should never talk negatively about your current/previous employer as it shows low levels of the value of integrity. Try as much as you can to actually talk about what you like and don't like objectively in order to be clear. Your social intelligence is indicated when you use it to maneuver with words and topics to deliver a great answer without falling into social and professional mistakes.

What are your weaknesses?
Realize that the interviewer here is looking to examine your sense of self awareness and how you are willing to develop yourself. As such, describe your weaknesses as areas of development that you have already worked on or your plan to improve them if you're still working on it. For example, if you have poor time management skills, you can mention that you resort to reminders and to-do lists to manage your time better.

What are your strengths?
We have talked about knowing yourself, it is now time to talk about how to present your Strengths in the most suitable way. There are 11 situations that you need to prepare yourself to present during the interview specifically when answering the "what are your strengths question" those situations are:
Leader: a situation in which you showed a leadership potentials
Plan: a plan you have written and followed
Problem: a problem that you have faced and solved
Success: a tough situation that you have encountered and passed
Failure: a situation in which you have faced and failed to resolve, stating what you have learnt.
Conflict: a conflict that you have faced and how have you dealt with.
Tight deadline: a situation in which you have faced a tight deadline and what have you done.
Limited resources: a bottleneck in which you had limited resources and how have you utilized what you have to get to your goal.
Risk: a risk that you have taken and what was your rationale
Change you have made
Challenge you passed through
In order to prepare those situations easily and smoothly use the C.A.R model also known as SAR to mind map your answer. The three lettered model stands for C= Context/situation A= actions R= Results. While preparing, use a mind map to draw out your situation. For example; you are going to prepare a situation in which you have succeeded. What was the context/what was the situation, was it in a student activity? Was it a work experience? Was there any danger or threats? Where was it? When was it? Lay out all the information that would describe the situation or the context. For the actions: What was the action you have taken? What were your steps? How have you encountered the situation? And what were the outcomes of your actions? What results have you got? Preparing this mind map will help you tell your story to your interviewer effectively and in an organized way.

Why should we hire you?
Given the fact that you have reached this part of the article, you must know now that it is important to study the company. This is the part of the interview where you make use of what you have studied. Here you should state all the organization's strengths and advantages that you have gathered, and if you have done your homework perfectly, you should be knowing rare information about the organization, like the least known milestones or accomplishments. Now is the time for you to flex and use these pieces of information and link it to your personality traits and skills to show your culture fitness with the organization.

During the interview:

Dress for Success
You make the first impression based on your appearance and how you dress, so make sure you're not overdressed or underdressed. By now, you are most probably aware of the culture of the company you're applying at. Some companies might require its employees to dress formally, while others might require a semi-formal dress code. Either way, you should dress accordingly. Most importantly, you want to stay away from dressing casually.

Arrive on time/Be punctual
Being late to an interview leaves a bad impression that's not easy to change. It's best to arrive 10-15 minutes before the interview to get familiar with the place and gather your thoughts. If you'll be late because of an emergency, let your interviewer know beforehand.

Be Confident
Express your gladness to meet your interviewer with a firm handshake, eye contact, a smile and asking about their day. Acting with such enthusiasm and confidence will break the ice for you, make you less nervous and give a positive first impression.

Understand the questions
Before you answer the questions, make sure you understand them well. If you don't, don't hesitate to ask for further clarification to avoid giving any irrelevant answers.

Give Examples
Your interviewer is meeting you for the first time and wants to know whether you'll fit in the position and the culture. To give them a clearer idea of your persona, support your statements with previous experiences and situations that highlight your uniqueness and skills.

Ask Questions
Even if you've done your research on the company, you must still be having unanswered questions. At the end of the interview, you'll have the space to ask any questions that you have, so make sure you prepare them ahead of time. The following questions should help you decide whether the job and the company are fit you as well:
What is the work environment and culture like?
What are my day-to-day tasks?
Where does the company stand in the meantime? Is it facing any current challenges?
When should I expect to hear back from you?

After the interview
Finally, a thank you email after the interview means that you're keen to get the job and will keep you on the top of their mind.`,
    },
    {
      slug: 'how-to-step-up-your-cv-and-hack-the-ats',
      title: 'How to step up your CV and hack the ATS',
      category: 'GUIDE',
      publishedAt: '2023-08-03',
      body: `If you have followed the basic steps of writing a CV and you still receive nothing but rejection emails, not even passing to the interview phase, you might still need to step up your CV game because AI is already stepping up the hiring process. It might come to your surprise that when you first apply for a job, your CV isn't being viewed by a human, but rather a robot. The applicant tracking system or the ATS has made it more challenging to get to the interview part. This article will tell you exactly what ATS is and how to hack it.

What is the ATS?
The ATS, or the applicant tracking system, is an automated software that is designed to help recruiters filter through applications with efficiency by screening job applications and cover letters, scanning resumes and picking the potential candidates for an interview. This way, it excludes irrelevant CV's. Your mission is to write a CV with the right format and keywords to pass the robotic screening rather than the human eye.

How does it work?
ATS works by scanning resumes and cover letters while spotting keywords that match the job posting. They also store the resumes in a database for future reference by the recruiters. After filtering the job applications, the applications are ranked and rated according to the relevance and potential.

Why do recruiters use it?
With thousands of applications coming in for multiple roles at a single company, it's not easy or practical for hiring managers to go through all these applications and resumes. The ATS makes it 100 times more effective to go through these applications without having to go through the irrelevant ones.

How do you hack it?
The answer lies in an ATS resume. But what is an ATS resume? The ATS resume is intentionally written and formatted to be optimized with keywords that are already in the job posting. It should also come with a basic format that lacks any tables and icons that would hinder the ATS from scanning the resume.
To successfully hack the ATS, you should:
Use a basic template
Use basic formatting
Use standard section headlines
Utilize keywords relevant to the job posting

Using a basic template
What seems appealing and nice to the human eye doesn't have to necessarily be to the ATS. On most times, it would even be incomprehensible. As smart as it is, the ATS often fails to read through tables, icons and symbols. Headers and footers are also a problem. If you must, remove any listings within tables and include the headers within the body to make them readable. For basic, optimal formatting, it is optimal to use standardized fonts such as Arial or Verdana, with a font size that's not less than 10.
You should also bear in mind that your CV doesn't need to be ATS compliant if you are not applying through an online portal. You can design it as you like if your CV is delivered directly to the hiring manager.

Use standard section headlines
As tempting as it might be for you to get creative with the section headlines, avoid doing so. The ATS utilizes the section headlines to be able to navigate your CV. It can only understand "Education", not "academic achievements". To avoid confusing the ATS, it's best to resort to the standard headlines:
Contact Information
Objectives
Education
Work Experience
Skills
These are the basic sections of a CV. If you intend on adding any extra sections, make sure to give them a basic headline.

Choose the right keywords
If you follow the first two tips and skip on this one, it'll become of no use. The right keywords play a big part for your CV to be highly ranked, so how do you choose the right ones? Start off by reading the job posting carefully; it will have the job description, responsibilities, qualifications and skills needed. Next, tailor your CV to include the same keywords in the job posting. For example, if it's the same role as yours but comes with a different title, make sure you use the same language as that in the job posting. The description of your current tasks and the skills you have can also be adjusted to match the job posting. This doesn't mean that you should lie or add any skills that you don't actually have, but to use the same language as the posting. However, it's not a smart idea to overuse the keywords or to place them where they are irrelevant and don't make sense. The ATS will figure that you're trying to trick it and will reject it instead.

Use full words instead of abbreviations
While there are common business acronyms that are frequently used, the bot doesn't have to necessarily be aware of those abbreviations. There's a greater chance the ATS will be looking for full words rather than acronyms, but to be on the safer side, you can include both (e.g. Business to business (B2B)).

Check your spelling
While a human might be able to get what you mean even if the spelling is not right, the ATS won't be able to translate those words even if they are the right keywords, thus leading to your rejection. A quick proofread will go a long way.

Apply even if you think you aren't qualified
It often feels intimidating to apply after reading a job posting and seeing how much experience and qualifications you lack, but the recruiters know they won't find someone with those exact qualifications. The job posting is usually describing the ideal candidate, but because there's no one size fits all, the potential candidates will only have an experience almost similar to the one mentioned. This is why they are called potential in the first place.

Follow up with an employer
Just because you applied through an online portal doesn't mean you still can't follow up with an employer. Sometimes the ATS will disregard potential candidates for irrelevant reasons, but showing your enthusiasm personally to an employer might make them consider having a look at your resume. Reach out via email or on LinkedIn to express your interest in joining the company.

References:
https://www.forbes.com/sites/andrewfennell/2022/09/27/5-tips-to-beat-the-applicant-tracking-system-ats/
https://www.visualcv.com/blog/how-to-beat-the-applicant-tracking-system/
https://www.indeed.com/career-advice/resumes-cover-letters/how-to-beat-applicant-tracking-system
https://www.ramseysolutions.com/career-advice/how-to-beat-applicant-tracking-systems`,
    },
    {
      slug: 'improve-your-english-proficiency',
      title: 'Improve your English Proficiency',
      category: 'GUIDE',
      publishedAt: '2023-08-03',
      body: `Learning a new language can be a bit challenging sometimes, but not impossible if the right steps are taken. Luckily, in today's world, the English language can be easily learned due to its accessibility. There are many reasons people are keen to improve their English proficiency, among which is to better utilize the language at the workplace and sharpen their business understanding, to be able to communicate with foreigners, to gain a better understanding of subject matters written in English only, etc.
If you are embarking on a journey to self-learn the English language, below are some tips and tricks that can guide you:

Pay a closer attention to the media you consume
There's a big chance you already consume different forms of media, whether it's shows, movies, podcasts, vlogs, etc. This is a bonus point if you're learning English, as it is the most fun part of the learning journey. Watching movies and shows in English and listening to English songs while paying attention to the native pronunciation will make it easier for you to grasp the accent. On top of that, it will enrich your vocabulary, and your ears will get used to proper grammar and sentence structures to subconsciously adopt the language correctly.

Read, read, & read
Reading is the number one key to expanding your vocabulary. You don't have to necessarily read big books if it's not your cup of tea. Small steps, such as reading articles or blog posts, can still be taken and will undoubtedly be beneficial.

Download your e-dictionary
With all the reading you'll be doing and the new words you'll come across, the dictionary will be your new best friend. Don't skip the words you don't know. Instead, look them up and practice using them in your conversations to avoid forgetting them. Duolingo is another widely used application that will help you maintain consistency in ease of use. It will help you learn new words and phrases and know how to use them grammatically correctly.

Practice writing
Mastering a language includes not only speaking but also writing. Practice writing to recall the new words you have learned and get used to words and sentences flowing in your mind.

Youtube is your new best friend
The internet is a great place to be, especially with the abundant, accessible content on YouTube. Some channels that we would recommend are zAmericanEnglish, Droos Online, Omar AbdelReheem and Linguamarina. Yet, we still encourage you to do your own research and follow a couple of mentors to find the ones you feel most comfortable following up with.
If you've already done the previously mentioned steps and want to go the extra mile, you can take affordable courses from English Capsules or 4level1. And if you want to take it a step further with private classes with local or international instructors, OTO is your go-to place.`,
    },
    {
      slug: 'write-a-winning-cv',
      title: 'Write a winning CV',
      category: 'GUIDE',
      publishedAt: '2023-08-03',
      body: `Write a CV that gets you the interview

Does getting an interview seem like an impossible quest? There's a big chance your CV needs some refinement. Preparing a CV is the very first step of getting into a new job, which to some, might be considered a heavy task. This is why we break it down into simple, yet rich, steps as it is the initial contact between you and your potential employer.

Starting with the general appearance of the CV, the overall structure should allow for an easy skim through the sections. In other words, it should be concise, taking into consideration that employers have to go through hundreds of CVs. The sections and their contents should be tailored according to the positions and companies you apply for.

Before we break it down for you, there are some common mistakes that you should avoid for a refined CV:
Don't copy and paste from the internet. You don't want the recruiters to doubt your credibility.
Your CV shouldn't exceed 2 pages.
Don't add a photo unless it is required.
Make sure your CV is pleasant to look at by making it symmetrical and aligned.
Mention your professional and educational experiences in a reverse chronological sequence, starting from the most recent to the oldest.
Avoid redundancy. Remember, you want to make it concise.

Below, we go into more depth about the 12 most important sections to include in a professional CV:

Who are you?
Contact Information
This section should appear first thing on the top of your CV, including your name, phone number, email address and home address. Make sure it doesn't take up much space.

Your Objectives
Your objectives tell the reader more about where you want to be in your career and why you are qualified to fit the position you're applying for. You should summarize your skills and qualifications in a way that translates to the success of your recruiter's company. It should be no longer than 3-4 lines. This section is the most tailorable according to the job you're applying for.
EXAMPLE - Sample entry-level resume objective for a graduate: Performance driven and highly intuitive Business Administration graduate with a 3.9 GPA looking to fill a position as a Management Assistant at *company name*. Wishing to use strong data analysis and management skills to help the *company name* with your upcoming challenges.

Technical Knowledge
Education
Following your career objectives, this is listed in reverse chronological order, with the most recent first. Each item should include: the institution and the date of starting and graduating (e.g., Faculty of Commerce, Cairo University (2014 - 2018)), your major and the degree received (e.g., Bachelor's in Business), and minors degrees, if any.
Start with your bachelor degree and then the advanced degree, exclude highschool from this section.

Work Experience
This is the section where you can show off your previous work experience to employers. Lay out your previous experiences in reverse chronological order while highlighting the most relevant experience to the role you're applying for by mentioning your key responsibilities and achievements.
Make sure to mention tangible results with numbers and targets that you have achieved. Important note: your CV should always be easily skimmed and scanned. Therefore, it is advisable to structure your work experience as follows:
Structure: Position – Company – Period; Responsibilities; Achievements.
The minimum number of bullets per section is 2 bullets, if you can't find enough information for the 2 bullets don't start the section. Internships, volunteer work and charity work are also written in the same approach and each in an independent section.

Courses
Set out the courses and certificates you have taken. Note that the certificates have to be accredited by an international entity. Through this part you state the extracurricular (beyond education you have included yourself in). It is important as it shows the recruiters that you work on developing your skills and take the initiative to sharpen your tools. It is advised to write your courses in full details, mention the course name, training hours, and the international organization that accredit this course. If the course is not accredited internationally, it would not count.

Computer Skills
You should mention the programs you use for the skills you have uptake (e.g., Sales - CRM, Graphic Design - Adobe Photoshop). Computer skills is a section in which highlights your skills with all the software programs that are related to the profession you are applying for; most professions use Microsoft office for planning, presenting, and documenting therefore it is highly advisable to write those. Moreover, it is very much advisable to write about the technical tools used in your desired profession such as CRM for salespeople and Adobe photoshop for graphic designers.

Extracurricular Activities
Any activities that you have partaken shows that you are a person who likes to take initiative and is disciplined and curious. Whether you have volunteered in student activities or charities, follow the sequence below: Position – organization – Period; Responsibilities; Achievements.

Skills and Competencies
Highlight your soft skills that you believe are most relevant to the job you're applying for. To stand out from the crowd and prove that you have the skill rather than listing a set of skills, it is highly advisable to explain the skill or in other words provide an operational definition to the skill you are trying to present. Example: Instead of writing "good communication skills" one would write "the ability to demonstrate, deliver and explain messages and thoughts in a very effective manner". By providing this definition, you're telling the CV reader that you actually understand what communication is and have the ability to apply the skill.

Languages
The Language section is a bit tricky; you need to be cautious! You should be competent enough to conduct a business conversation using any language written here. NOTE, you already wrote your CV in English, therefore they already know you can use the language. Arabic as well, if you are Egyptian applying for a company in Egypt be confident enough that the interviewers know that you can speak Arabic, therefore writing that you can speak Arabic would be counted as redundancy. Only write this section if you have a third language; if you can conduct business conversation using three or more languages write this section. Example: English, Arabic, French.

Familiar With
If you're familiar with a certain subject but never went deep into it, this is where you'll add it.

Interests
Even if it might seem irrelevant, it could still show certain qualities about you. E.g., if you like boxing, it shows you have a high tolerance.

References - Last section
This could be a colleague, a manager or even a professor that you have worked with on a thesis or a project. Make sure it's someone who will get back to calls and/or emails and that they know they are referenced to give a good solid recommendation. It's usually written in the following sequence: Name – Position – Contacts (phone number/email).

Following the mentioned instructions should help you get to the interview. Make sure you follow us to know how to ace the interview and get the job.`,
    },
  ];

  for (const article of articles) {
    await prisma.article.upsert({
      where: { slug: article.slug },
      update: {},
      create: {
        slug: article.slug,
        title: article.title,
        category: article.category,
        body: article.body,
        publishedAt: new Date(article.publishedAt),
      },
    });
  }
}

async function main() {
  await seedPrograms();
  await seedArticles();
  console.log('Hub seed complete: 3 programs, 9 articles, 0 events (matches live site).');
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
