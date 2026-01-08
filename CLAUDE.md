# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Eksamensarkiv** - A Danish examination archive web application for FP9/FP10 (9th/10th grade) exam materials. Static site hosted on GitHub Pages at https://eksamen.edbpede.net.

## Development Commands

This is a vanilla JavaScript static site with no build process or package manager.

**Local Development:**
```bash
cd docs
python3 -m http.server    # or: npx http-server
```

No build, lint, or test commands exist.

## Architecture

### Data Flow
```
exam-index.json → examScanner.js → examList.js → landing.js → DOM
```

### Key Files
- `docs/index.html` - Landing page (Danish language)
- `docs/js/landing.js` - Main app logic, creates subject cards dynamically
- `docs/js/examList.js` - Subject list and exam data management
- `docs/js/examScanner.js` - Fetches exam-index.json
- `docs/css/landing.css` - Styling with CSS custom properties
- `docs/proever/shared/exam-start.html` - Exam confirmation gateway
- `docs/proever/exam-index.json` - Master exam index (JSON data source)

### Pattern: ES6 Modules
All JavaScript uses ES module syntax (import/export). Files are loaded via `<script type="module">`.

### Exam URL Routing
Exams are accessed via query parameter: `proever/shared/exam-start.html?exam={path}`

## Data Format

**exam-index.json structure:**
```json
{
  "Dansk": [
    {
      "name": "Skriftlig Fremstilling",
      "date": "2023-05-02",
      "path": "FP9_dansk/2023-05-02_Skriftlig_Fremstilling/index.html"
    }
  ]
}
```

**Exam folder naming:** `YYYY-MM-DD_Exam_Name` (underscores for spaces)

## Deployment

GitHub Pages serves the `docs/` directory. Push to `main` to deploy.

## Licensing

- Website code: AGPLv3 (header in each JS file with magnet URI)
- Exam content in `docs/proever/`: Owned by Danish Ministry of Children & Education (separate LICENSE file)

## Commit Style

Uses Conventional Commits: `feat:`, `fix:`, `chore:`, `build:`
