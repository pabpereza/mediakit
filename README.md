# @Pabpereza Mediakit
Public dashboard of social media analytics

## 🌐 Live Site
[mediakit.pabpereza.dev](https://mediakit.pabpereza.dev)

## 📬 Contact

| Channel | Link |
|---------|------|
| 📧 Email | [contact@pabpereza.dev](mailto:contact@pabpereza.dev) |
| 🎬 YouTube | [@pabpereza](https://youtube.com/@pabpereza) |
| 💼 LinkedIn | [pabpereza](https://linkedin.com/in/pabpereza) |
| 🌐 Website | [pabpereza.dev](https://pabpereza.dev) |
| 🐦 Twitter/X | [@pabpereza](https://x.com/pabpereza) |

## Optional X/Twitter Metrics

X/Twitter campaign signals can be reviewed in [Xquik](https://xquik.com) and copied into `src/data/metrics.json` under the optional `xquik` block. The dashboard renders that block only when it exists, so private media kits can include X/Twitter context without changing the YouTube metrics workflow.

Recommended fields:

- `source`: short label for the export source, such as `Xquik X/Twitter export`
- `lastReviewed`: ISO date for the last manual review
- `workflow`: note explaining how the values are checked before publishing
- `metrics`: sponsor-facing labels such as weekly impressions, engagement rate, or top campaign posts

## 🛠️ Tech Stack
- React + TypeScript + Vite
- Tailwind CSS
- html2canvas + jsPDF (PDF export)

## 📦 Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```
