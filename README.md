# Jamyang Jewels — Website

Official website for **Jamyang Jewels Pte Ltd** — fine handcrafted jewelry for the wisdom path. Singapore.

🌐 [jamyangjewel.com](https://jamyangjewel.com)

---

## Stack

- Pure HTML5 / CSS3 / Vanilla JS (no framework, no build step)
- Google Fonts: Cinzel · Cormorant Garamond · Jost
- Deployed to DreamHost shared hosting via GitHub Actions (FTP)

## Pages

| File | Page |
|------|------|
| `index.html` | Home |
| `about.html` | About / Our Story |
| `collections.html` | Collections |
| `events.html` | Events & Workshops |
| `contact.html` | Contact |

## Local Development

No build step needed. Open any `.html` file in a browser, or use a local server:

```bash
# Python (built-in)
python3 -m http.server 8080

# Node (if npx available)
npx serve .
```

## Deployment (GitHub → DreamHost)

Every push to `main` automatically deploys via FTP using the GitHub Actions workflow at `.github/workflows/deploy.yml`.

### Required GitHub Secrets

Set these in your repo → **Settings → Secrets and variables → Actions → New repository secret**:

| Secret | Value |
|--------|-------|
| `FTP_SERVER` | Your DreamHost FTP server (e.g. `ftp.jamyangjewel.com`) |
| `FTP_USERNAME` | Your DreamHost FTP username |
| `FTP_PASSWORD` | Your DreamHost FTP password |
| `FTP_SERVER_DIR` | Target directory on server (e.g. `/home/yourusername/jamyangjewel.com/`) |

> **DreamHost FTP credentials**: Log in to panel.dreamhost.com → Hosting → FTP Users, or create a new FTP user under your domain.

## Updating Content

| Task | What to edit |
|------|-------------|
| Update WhatsApp number | Search & replace `6500000000` across all `.html` files |
| Update email | Search & replace `hello@jamyangjewel.com` |
| Update Instagram/Facebook links | Edit `href="#"` in footer across all pages |
| Add a new event | Edit `events.html`, duplicate an `<li class="event-full">` block |
| Add a new jewelry piece | Edit `collections.html`, duplicate a `.collection-item` block |
| Add real photos | Replace `gem-bg` divs with `<img>` tags in the relevant cards |

## Adding Real Photography

Each jewelry card currently uses CSS-generated gemstone visuals. When you have photography:

1. Place images in an `images/` folder
2. Replace the `gem-bg` container with:
```html
<img src="images/your-photo.jpg" alt="Description of piece" loading="lazy" />
```

## Brand

- **Colors**: Obsidian `#070503` · Gold `#C9A96E` · Cream `#FAF6EE`
- **Fonts**: Cinzel (display) · Cormorant Garamond (serif/quotes) · Jost (body)
- **Aesthetic**: Sacred Atelier — contemplative luxury

---

*Handcrafted with care. © Jamyang Jewels Pte Ltd*
