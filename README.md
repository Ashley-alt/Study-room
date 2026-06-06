# Study Room

Study Room is a cozy Bible study focus app inspired by the feeling of older lo-fi room experiences, but with original artwork, layout, and interaction design. It is built as a frontend-only MVP with scripture prompts, notes, prayer points, reflection questions, a Pomodoro timer, a study checklist, and ambient audio controls.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand
- LocalStorage persistence
- No backend

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Build for production:

```bash
npm run build
```

Run lint:

```bash
npm run lint
```

## Routes

- `/` - landing page for the app
- `/study` - interactive Bible study room

## Project Structure

```text
src/app/page.tsx                 Landing page
src/app/study/page.tsx           Study room route
src/components/study/            Study room UI components
src/lib/study-data.ts            Mock scripture, reflections, prayer points, audio paths
src/store/study-room-store.ts    Zustand store with localStorage persistence
public/audio/README.md           Placeholder audio asset notes
```

## Replacing Assets

The MVP uses CSS and Framer Motion for the room artwork and animations, so there are no copyrighted image or video assets.

Audio paths are placeholders in `src/lib/study-data.ts`:

- `/audio/lofi-placeholder.mp3`
- `/audio/rain-placeholder.mp3`
- `/audio/fireplace-placeholder.mp3`
- `/audio/wind-placeholder.mp3`
- `/audio/coffee-shop-placeholder.mp3`
- `/audio/page-turning-placeholder.mp3`

Add royalty-free audio files to `public/audio/` with those names, or update the paths in `src/lib/study-data.ts`.

## LocalStorage

The app stores user preferences under `study-room-preferences`, including:

- day/night theme
- selected study topic
- notes
- checklist tasks
- completed study sessions
- timer durations
- music and ambience settings

## MVP Notes

The audio mixer currently provides the full UI and saved settings for placeholder paths. Once real royalty-free audio files are added, the mixer can be extended to instantiate and sync HTML audio elements against the existing Zustand state.
