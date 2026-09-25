# CleanUp Experience — cleanupexperience.ca

Static website hosted on **GitHub Pages** (custom domain in `CNAME`). No build step.

## Files
| File | What it is |
|---|---|
| `index.html` | The whole page (content, SEO tags, structured data) |
| `styles.css` | All styles (colours are variables at the top) |
| `script.js` | Mobile menu, quote form → WhatsApp/email, scroll animations |
| `assets/` | Optimized logo, social-share image, icons |
| `404.html`, `robots.txt`, `sitemap.xml`, `favicon.ico` | Extras for SEO/UX |

## Editing
- Phone/WhatsApp number: search for `12369927065` (in `index.html` and `script.js`).
- Email: search for `info@cleanupexperience.ca`.
- Service areas: the `#areas` section **and** `areaServed` in the JSON-LD block in `<head>`.

## Preview locally
```
python -m http.server 8000
```
then open http://localhost:8000
