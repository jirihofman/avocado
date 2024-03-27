[![avocado](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/detailed/rv7kws/main&style=plastic&logo=cypress)](https://dashboard.cypress.io/projects/rv7kws/runs)

# 🥑 Avokádo lekce lehce
Webová aplikace, která nabízí příklady k procvičování pro žáky základních škol i předškolní děti.
# Next.js
This is a starter template for [Learn Next.js](https://nextjs.org/learn).

Starded by: `npx create-next-app avocado --use-npm --example "https://github.com/vercel/next-learn-starter/tree/master/demo"`

Dev:
- `npm run dev`
- `http://localhost:3000`

Stack:
- Next.js, bootstrap 5, vercel
- jest, cypress

TODO / Roadmap:
- [ ] i18n: english
- [ ] jest + code coverage
- Třída
- [ ] Správa uživatelů (žáků)
- [ ] Testy pro celou třídu

# How to add a new question
1. Add a new question to the `questions` array in `lib/questions.js`.
2. Add a new key to the `demoIds` enum in `lib/questions.js`.
3. Add a new button to `components/demo.js`
4. Add a new `case` to the `switch` in `app/board/demo/[id]/page.jsx`
