# IvanAyao — agency site

A plain static site (HTML, CSS, vanilla JS). No build step.

## Run locally
```
python -m http.server 5173
```
Then open http://localhost:5173. You can also open `index.html` directly in a browser.

## Files
| File | What it is |
|---|---|
| `index.html` | Work list (home) |
| `studio.html` | About, numbers, services, awards, team, pricing, FAQ |
| `insights.html` | Blog list with All / Articles / Lab filters |
| `article.html?slug=…` | Article template (rendered from data) |
| `project.html?slug=…` | Project case study template (rendered from data) |
| `contact.html` | Contact form, FAQ, latest insight |
| `privacy.html`, `terms.html`, `404.html` | Legal pages and not-found page |
| `js/data.js` | **All content**: brand name, email, address, projects, articles, FAQs |
| `js/main.js` | Header, menu, footer, page transitions, animations, page renderers |
| `css/style.css` | All styles; colours and fonts are CSS variables at the top |

## Common edits
- **Brand name, email, phone, address:** edit `SITE` in `js/data.js`.
- **Accent colour:** edit `--accent` in `css/style.css`.
- **Project images** live in `assets/projects/<slug>/`: `cover.jpg` (3:4, home page), `full.jpg` (full-page website screenshot) and gallery images. Insight and team images are still `picsum.photos` placeholders.
- **Add a project:** create `assets/projects/<slug>/`, then add an entry to `PROJECTS` in `js/data.js` (the comment above the list explains each field). Add `url: "https://…"` to show a "Visit website" button.
- **Add an article:** add an object to `ARTICLES`.
- **Contact form:** there is no backend yet. Connect the `submit` handler in `js/main.js` (search for `contact()`) to Formspree, Netlify Forms, or your own API.
