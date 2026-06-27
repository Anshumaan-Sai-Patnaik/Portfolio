export const works = [
  {
    id: "recipe-creation-agent",
    year: "June, 2026, In Progress",
    title: "Recipe Creation Agent",
    category: "AI · Full-Stack Backend",
    blurb:
      "An AI recommendation engine for restaurant kitchens — it scores a kitchen's makeable dishes against live inventory, weather, and local events to decide what's most profitable to cook right now, and can draft brand-new recipes from whatever is in stock.",
    stack: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Google Gemini", "sentence-transformers", "scikit-learn", "Next.js"],
    images: ["01.png"],
    body: [
      "The Recipe Creation Agent was my *first paid internship project*—an AI-powered SaaS platform for restaurant kitchens. It was also my first time working on something this large, so I leaned on AI quite a bit to learn unfamiliar concepts, explore approaches, and speed up development, while making sure I *understood, integrated, and tested everything myself*.",
      "The system is built as a *multi-tenant FastAPI and PostgreSQL service* with 23 HTTP endpoints. It recommends the most profitable dishes based on live inventory, weather, local events, and time of day, combining rule-based scoring, embeddings, demand forecasting, learning-to-rank, and LLM-powered recipe generation. A *feedback loop* then uses actual cooking outcomes to continuously improve recommendations for each restaurant.",
    ],
    experience: [
      "This is *the most ambitious project in this collection* and the one that pushed me far beyond building CRUD applications. I developed it in five phases, with each phase expanding on the architecture and features of the previous one, which taught me how to *evolve a large system without constantly rewriting it*.",
      "The biggest challenge—and the part I'm most proud of—was making the system *resilient*. Every external dependency, whether it's weather data, demand trends, the forecasting model, or the LLM, falls back to a neutral value if it's unavailable. Instead of failing, the API still returns a useful recommendation with a warning. More than anything, this project taught me how to *think about a large codebase as a set of well-defined layers* rather than just a collection of features.",
    ],
    report: "/works/recipe-creation-agent/report.pdf",
    repo: "",
    featured: true,
    inProgress: true,
  },
  {
    id: "moneytor",
    year: "June, 2026, In Progress",
    title: "MoneyTor — Stock Trading Platform",
    category: "Full-Stack Web App",
    blurb:
      "My first React-based full-stack project — an in-progress stock trading platform inspired by Zerodha, with the marketing site built and the trading dashboard and backend underway.",
    stack: ["React", "Vite", "React Router", "Tailwind CSS", "DaisyUI"],
    images: [
      "01.png",
      { src: "02.jpeg", caption: "Main page — introduction / landing page" },
      { src: "03.jpeg", caption: "About section" },
      { src: "04.jpeg", caption: "Product section" },
      { src: "05.jpeg", caption: "Pricing section" },
      { src: "06.jpeg", caption: "Support section" },
    ],
    body: [
      "MoneyTor is *my first React-based full-stack learning project*, inspired by the Zerodha stock trading platform. The project is *currently under active development*, with most of the frontend completed while the backend is still being built and integrated.",
    ],
    experience:
      "The frontend was a precious exercise in understanding how to *break down a complex user interface into reusable React components*. I learned to *think in terms of component hierarchy rather than individual pages*, making the application easier to maintain and extend. I also explored Tailwind CSS, which simplified styling through utility classes, and DaisyUI, whose pre-built components helped me build a clean interface — allowing me to focus on functionality and application structure.",
    report: "/works/moneytor/report.pdf",
    repo: "https://github.com/Anshumaan-Sai-Patnaik/MoneyTor.git",
    inProgress: true,
  },
  {
    id: "climate",
    year: "June, 2026",
    title: "cliMATE — Weather App",
    category: "Front-End Web App",
    blurb:
      "My first React + Vite project — search any city, town, or landmark and see its current weather in a clean, responsive Material UI card.",
    stack: ["React", "Vite", "Material UI", "Geoapify API", "OpenWeather API"],
    images: [
      { src: "01.png", caption: "Intro page — no location entered yet" },
      { src: "02.png", caption: "Weather results — location found" },
      { src: "03.png", caption: "Location not found — the 404 error state" },
    ],
    body: [
      "cliMATE is *my first React + Vite project*, built with a very simple objective: allow users to search for a location and view its current weather. The application itself is straightforward — *a simple search, a result component, and a responsive UI*.",
    ],
    experience:
      "I learned the fundamentals of React, worked with Material UI to create the interface, and integrated the Geoapify and OpenWeather APIs. But the biggest takeaway was that, instead of depending entirely on AI, I chose to *work through the official documentation of both APIs*. While reading documentation, interpreting API responses, and troubleshooting integration issues, I discovered I could learn myself and integrate technologies by trusting the documentation written by the people who built them. That mindset has become *one of the most valuable skills I've gained as a developer*.",
    report: "/works/climate/report.pdf",
    repo: "https://github.com/Anshumaan-Sai-Patnaik/cliMATE",
  },
  {
    id: "edustreamix",
    year: "May, 2026",
    title: "EduStreamiX — Class 12 Learning Platform",
    category: "Full-Stack Web App",
    blurb:
      "An educational platform for Class 12 students that organises YouTube lessons by board, subject, unit, and chapter — with timed practice tests and Razorpay-gated access.",
    stack: ["Node.js", "Express", "EJS", "Google Drive API", "Google Gemini", "Razorpay", "JWT"],
    images: [
      { src: "01.png", caption: "Payment required to continue — the initial payment that unlocks access to the site" },
      { src: "02.png", caption: "Hero / landing page" },
      { src: "03.png", caption: "Board selection" },
      { src: "04.png", caption: "Subject selection" },
      { src: "05.png", caption: "Units overview" },
      { src: "06.png", caption: "Chapters within a unit" },
      { src: "07.png", caption: "Chapter video lesson" },
      { src: "08.png", caption: "Test configuration for the selected chapter" },
      { src: "09.png", caption: "Live test interface" },
      { src: "10.png", caption: "Test time expired — continue the test?" },
      { src: "11.png", caption: "Final score and performance report" },
    ],
    body: [
      "This was *my first internship project*. I built an educational platform for Class 12 students that organizes YouTube videos by board (SSC, CBSE, and ISC), subject, unit, and chapter, making it easy to find relevant learning content. Beyond the core requirements, I added timed practice tests with Easy, Medium, and Hard difficulty levels and integrated a ₹20 payment gateway to unlock access. The platform eventually grew to include a library of over 150 educational videos, and is *deployed and running live on Render*.",
    ],
    experience: [
      "This project taught me a lot about *working within real-world constraints*. Since I wasn't allowed to use MongoDB, I *stored the data as JSON on Google Drive* and fetched it using the Google Drive API. The data wasn't very complex, so JavaScript array methods were enough to handle filtering and searching.",
      "I also used AI to build the frontend. Having already spent good time understanding AI-generated code in my previous projects, I was much more confident using it this time and could integrate it into my workflow without much trouble. The most exciting part of the project was learning how the Razorpay payment workflow works and setting it up myself. This was also *the first time I deployed a project* — I put it live on Render, and getting it running in the real world taught me *what it actually takes to ship an app beyond my own machine*. Looking back, this project gave me a nice experience in solving practical problems, integrating APIs, and adapting my approach when project constraints required a different solution.",
    ],
    report: "/works/edustreamix/report.pdf",
    repo: "https://github.com/Anshumaan-Sai-Patnaik/EduStreamiX---Class-12.git",
    live: "https://edustreamix-class-12-dpt8.onrender.com/",
    featured: true,
  },
  {
    id: "strokestudio",
    year: "February, 2026",
    title: "Stroke Studio — Art Gallery & Marketplace",
    category: "Full-Stack Web App",
    blurb:
      "A full-stack art gallery and marketplace — browse paintings, manage a cart, wishlist and profile, on a modular Express/MongoDB backend with Cloudinary image hosting.",
    stack: ["Node.js", "Express", "MongoDB", "Mongoose", "express-session", "Cloudinary", "Multer", "EJS"],
    images: [
      { src: "01.png", caption: "The public home page — what an unsigned visitor first lands on" },
      { src: "02.png", caption: "The home page, continued" },
      { src: "03.png", caption: "The public gallery of paintings" },
      { src: "04.png", caption: "The sign-in modal" },
      { src: "05.png", caption: "A signed-in user's dashboard" },
      { src: "06.png", caption: "Editing profile details and bio" },
      { src: "07.png", caption: "Sign-out confirmation" },
      { src: "08.png", caption: "Delete-account confirmation" },
      { src: "09.png", caption: "The marketplace gallery — every painting available to buy" },
      { src: "10.png", caption: "An individual painting's detail page" },
    ],
    body: [
      "This was *the most ambitious and time-intensive project I had worked on at that time*. It is a full-stack online marketplace for buying and selling paintings, built to *bring together everything I had learned* about Node.js, Express.js, MongoDB with Mongoose, authentication, and Cloudinary for image storage.",
      "Stroke Studio features *a modern marketplace interface* where users can browse paintings and create an account to explore them in detail. After signing in, users can manage their profile and profile picture, add paintings to a wishlist or cart, proceed to a checkout page (UI only), update their account information and password, or permanently delete their account.",
    ],
    experience: [
      "For the frontend, I used AI assistance. Instead of copying large blocks of generated code, I *used it as a reference, understanding each component before integrating it* into my application. My goal was to make sure *there wasn't a single line of code in the project that I couldn't explain*.",
      "The entire backend, however — including the Express routes, Mongoose models and queries, authentication, session management, and Cloudinary integration — *was built by me*. Working with Mongoose queries and integrating Cloudinary were some of the most interesting learning experiences here. Overall, it was *my most challenging and rewarding project of that time*, bringing together everything I had learned into one application.",
    ],
    report: "/works/strokestudio/report.pdf",
    repo: "https://github.com/Anshumaan-Sai-Patnaik/Stroke-Studio",
    featured: true,
  },
  {
    id: "youview",
    year: "November, 2025",
    title: "YouView — User Management Platform",
    category: "Full-Stack Web App",
    blurb:
      "A full-stack community app on a normalised MySQL database — browse profiles, sign up, and manage your account, with safe parameterized SQL behind clean RESTful routes.",
    stack: ["Node.js", "Express", "MySQL", "EJS", "method-override", "uuid", "Faker.js"],
    images: [
      { src: "01.png", caption: "The public users directory — every member, with their ID, username, and email" },
      { src: "02.png", caption: "A public profile — a member's ID, contact, and bio" },
      { src: "03.png", caption: "Another member's profile from the directory" },
      { src: "04.png", caption: "The sign-in page" },
      { src: "05.png", caption: "Signed in — your own profile, the first thing you see" },
      { src: "06.png", caption: "Editing your account details" },
    ],
    body: [
      "YouView is *a simple community application* where users can create an account, build their profile, and share information about themselves, such as their bio and interests. Users can edit their profile, delete their account, and browse other profiles within the community.",
      "I built it as part of my learning journey to better understand *how Express.js works with SQL databases*. It gave me hands-on experience writing SQL queries for CRUD operations, connecting Express to a database, and *implementing user authentication*.",
    ],
    experience: [
      "Through the journey, I learned how to write SQL queries, *connect a database to an Express application*, and handle different client requests and writing the corresponding query logic on the server. It was also *my first time implementing user authentication*, which gave me a basic understanding of how login systems work.",
      "For the frontend, I *tried vibe coding for the first time*. I was surprised by *how quickly AI generated clean CSS*. Since it was simple, I could easily understand, integrate, and learn from the generated code.",
    ],
    report: "/works/youview/report.pdf",
    repo: "https://github.com/Anshumaan-Sai-Patnaik/You-View",
  },
  {
    id: "postspace",
    year: "October, 2025",
    title: "PostSpace — Blog Post Manager",
    category: "Server-Side Web App",
    blurb:
      "A server-rendered blog app with full create, read, update, and delete over posts — built on Express and EJS to put RESTful routing and HTTP semantics into practice.",
    stack: ["Node.js", "Express", "EJS", "method-override", "uuid", "CSS"],
    images: [
      { src: "01.png", caption: "The post list — each post with view, edit, and delete controls" },
      { src: "02.png", caption: "Edit form — pre-filled with the post's content and its UUID" },
      { src: "03.png", caption: "Create-post form — a username and the post body" },
    ],
    body: [
      "PostSpace was built while I was *learning Express.js, routing, and RESTful APIs*. It's a simple blog application where users can create, edit, and delete blog posts. The posts are *stored in an in-memory array* because I hadn't been introduced to databases at that point in my learning journey.",
      "Although it's simple, I built it mainly to test whether I was truly understanding the *Express.js concepts and RESTful architecture* I had been learning. It was my way of *applying those ideas in a real project instead of just reading about them*.",
    ],
    experience:
      "What I enjoyed most was that instead of just writing notes in a notebook, I could *write a few lines of code and instantly see the results*, which made learning much more engaging and rewarding. I also *wrote all the CSS myself*, and that challenge helped me become more comfortable with frontend styling.",
    report: "/works/postspace/report.pdf",
    repo: "https://github.com/Anshumaan-Sai-Patnaik/Post-Space",
  },
  {
    id: "simon-says",
    year: "September, 2025",
    title: "Simon Says — Memory Game",
    category: "Browser Game",
    blurb:
      "A dependency-free browser take on the classic memory game — watch the colour sequence, repeat it back, and see how many levels your memory survives.",
    stack: ["HTML", "CSS", "JavaScript"],
    images: [
      { src: "01.png", caption: "Start screen — press any key to begin" },
    ],
    body: [
      "Simon Says was one of my first full-stack web development projects. At the time, most of my projects were either simple designs or clones. Even though I've since built much larger projects, this one still holds a *special place* because I genuinely enjoyed implementing the *JavaScript logic* behind the game.",
      "The game is based on the popular Simon Says game, so I haven't explained the rules separately. The *most enjoyable part* was figuring out how to store user inputs, compare them with the correct sequence of colors, and handle game-over conditions efficiently. Excuse me for the simple CSS, I tried focusing mainly on the *game logic* rather than the UI.",
    ],
    experience:
      "Simon Says was *genuinely fun to build*. Along the way, I became good at *translating an idea into JavaScript logic*, which is why it still holds a special place for me.",
    report: "/works/simon-says/report.pdf",
    repo: "",
  },
];
