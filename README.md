<div align="center">
  <img src="./public/mmlogo-resized.png" align="center">
  <h1>Momentum Master</h1>
</div>

## Main Functionalities
Momentum Master is an online tool for enhancing professional development, built with **functionality and user experience** in mind. Main functionalities include:
- Secure login/signup powered by Auth0
- Daily reflections with AI chatbot, with summary made in the STAR format
- Track progress with journal history with summaries and full chat log
- Personalised dashboard with statistics in customised time steps and goal tracking

## Compatibility
You will need a laptop/PC (supports all operating systems)

## Future Extension
- Add support for login/signup through different socials (GitHub, LinkedIn, Hotmail, etc.)
- Send users incremental reports to email address
- Integrate with external platforms (LinkedIn, Facebook, Google Calendar, etc.)

## Dependencies
You will need the following to run the code:
- Node package manager (`npm`) minimum v.18.13.0
- Vercel account (since our database is hosted on Vercel)
- [Prisma](https://www.prisma.io/docs) (to run Prisma Studio for database)
- Git (obviously lol)
- OpenAI account for chatbot

## Getting Started
1. Clone this repo to your device
2. Run `npm i` to install all dependencies
3. Run `touch .env` in the root directory to generate an environment file
4. Copy the environment variables in the handover document and paste onto `.env`
5. Run `npx nuxt dev` or `npm run dev` to run on `localhost:3000`
6. **(optional)** Run `npx prisma studio` to open a GUI for database

## Technologies Used
- Front-end: Vue.ts, Vite, Bootstrap
- Back-end: Nuxt3, Auth0 (authentication), OpenAI (LLM chatbot), Vercel Postgres + Prisma (database), Node.js
- Testing: Jest, `@nuxt/test-utils`, Vitest
- CI/CD: Gitlab CI/CD for deployment and automated testing

## Front-end development
### Frameworks
- [Vue.js documentation](https://vuejs.org/guide/introduction)
- HTML/SCSS
- Figma for UI/UX design
### Colors & Styling
- All CSS assets are located in `assets/scss`. For future development, create a new `.scss` file in this directory and import the file in your `component.vue`
### UI Libraries
- [Nuxt UI](https://ui.nuxt.com/)
- [VCalendar](https://vcalendar.io/)
- [Google Icons](https://fonts.google.com/icons)
- [HeroIcons](https://heroicons.com/)

## Back-end development
### Frameworks
- [Auth0 documentation](https://auth0.com/docs) (used for secure login and signup through OAuth)
- Vercel PostgresQL and [Prisma ORM](https://www.prisma.io/docs) (for managing database and implementing REST APIs)
- [Nuxt3 documentation](https://nuxt.com/docs/) (add server-side rendering and back-end integration with Vue.js) and [directory structure](https://nuxt.com/docs/guide/directory-structure/app)
- [OpenAI API documentation](https://platform.openai.com/docs/api-reference/introduction) (for extending functionality of AI chatbot)
### Database
- The database schema is defined in `prisma/schema.prisma`
- Any changes in the schema has to be followed by `npx prisma generate` to reflect those changes in the database (**IMPORTANT**: Running this command will wipe everything in the database, **proceed with caution**)

## Testing
- Testing plan: Run `npm test` to run the full test suite
- Unit tests: currently covers:
    - Back-end APIs:
        - Fetching reflections from database
        - GPT selecting a new question from existing question bank
        - Create a new goal status
        - Rate skill usage on Shu-Ha-Ri scale
    - Login/signup through Auth0
    - External APIs used exclusively on the front-end
- End-to-end tests: currently covers:
    - Complete a new reflection
    - Set a new skill rating
- Integration tests

## Links
- [Deployed Site](https://momentum-master-no-moss-git-de-4810e3-daniels-projects-44b73513.vercel.app/)
- [Confluence](https://no-moss-group-6.atlassian.net/wiki/spaces/SD/overview)
- [Figma](https://www.figma.com/design/L1rIo3iazou9FjrDB5z49U/No-moss-Momentum-Master?node-id=94-732&node-type=FRAME&t=4nPZvqUS2wPeS8Ek-0)
- [GitLab Repo](https://gitlab.com/duongdh5/momentum-master)
- [Swagger API Docs]()