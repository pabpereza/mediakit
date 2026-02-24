# AGENTS.md — Guía para Agentes de IA

Este fichero explica la estructura, propósito y automatismos del repositorio para que cualquier agente de IA pueda entender y trabajar sobre él de forma eficiente.

---

## ¿Qué es este proyecto?

**Pabpereza Mediakit** es una SPA (Single Page Application) pública que actúa como herramienta de venta B2B para patrocinadores. Muestra métricas reales del canal de YouTube [@pabpereza](https://youtube.com/@pabpereza) junto con el perfil de audiencia y los formatos de colaboración disponibles.

- **URL en producción:** [mediakit.pabpereza.dev](https://mediakit.pabpereza.dev)
- **Objetivo:** Convencer a empresas tecnológicas de que patrocinen el canal mostrando datos reales de audiencia técnica de alta calidad.

---

## Tech Stack

| Capa | Tecnología |
|------|-----------|
| Framework | React 18 + TypeScript + Vite |
| Estilos | Tailwind CSS (tema oscuro, base `slate-950`) |
| Iconos | Lucide React |
| Build & Dev | `npm run dev` / `npm run build` |
| Linting | ESLint (`npm run lint`) |
| Despliegue | GitHub Pages (rama `main`) |
| Automatismos | GitHub Actions + Python 3.12 + yt-dlp |

---

## Estructura de directorios

```
mediakit/
├── .github/
│   ├── copilot_instructions.md   # Instrucciones de rol para GitHub Copilot
│   ├── gemini.md                 # Instrucciones de rol para Gemini
│   ├── scripts/
│   │   └── update_metrics.py     # Script Python que actualiza métricas automáticamente
│   └── workflows/
│       ├── deploy.yml            # CI/CD: build + deploy a GitHub Pages en push a main
│       └── update_metrics.yml    # Automatismo semanal de actualización de métricas
├── public/
│   ├── CNAME                     # Dominio personalizado: mediakit.pabpereza.dev
│   ├── perfil_tech.png           # Foto de perfil del creador
│   ├── portal_tech.png           # Imagen decorativa
│   └── fondo-dark.{jpg,png}      # Fondo de la web
├── src/
│   ├── App.tsx                   # Raíz de la aplicación, composición de secciones
│   ├── main.tsx                  # Punto de entrada React
│   ├── index.css                 # Estilos globales
│   ├── components/
│   │   ├── Hero.tsx              # Sección hero: propuesta de valor + CTAs
│   │   ├── MetricsDashboard.tsx  # Dashboard con métricas del canal y audiencia
│   │   ├── AboutAuthority.tsx    # Perfil del creador + certificaciones
│   │   ├── Sponsorships.tsx      # Formatos de colaboración y precios
│   │   ├── Footer.tsx            # Pie de página con contacto
│   │   └── LanguageSelector.tsx  # Selector ES/EN
│   ├── hooks/
│   │   ├── useYouTubeMetrics.ts  # Hook que expone métricas del canal (suscriptores, vistas, etc.)
│   │   └── useMetricsConfig.ts   # Hook tipado que da acceso completo a metrics.json
│   ├── i18n/
│   │   ├── LanguageContext.tsx   # Context de React para el idioma activo
│   │   ├── index.ts              # Re-exportaciones del módulo i18n
│   │   └── translations.ts       # Todos los textos de la UI en ES y EN
│   └── data/
│       └── metrics.json          # ⭐ FUENTE ÚNICA DE VERDAD de todas las métricas
├── AGENTS.md                     # Este fichero
├── README.md
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## Flujo de datos

```
YouTube (canal @pabpereza)
        │
        │  yt-dlp (sin API key)
        ▼
.github/scripts/update_metrics.py
        │
        │  escribe/actualiza
        ▼
src/data/metrics.json              ← ÚNICA fuente de verdad
        │
        ├── useMetricsConfig.ts    → acceso tipado a TODOS los campos
        └── useYouTubeMetrics.ts   → expone { subscriberCount, viewCount, videoCount, engagementRate }
                │
                ▼
        Componentes React (MetricsDashboard, Hero, Footer, Sponsorships…)
```

### `src/data/metrics.json` — Schema

```jsonc
{
  "_meta": {
    "lastUpdated": "YYYY-MM-DD",   // actualizado automáticamente por el script
    "version": "1.0.0"
  },
  "channel": {
    "viewCount":          "793K",  // ← actualizado automáticamente (yt-dlp view_count: total de visualizaciones acumuladas del canal)
    "videoCount":         "203+",  // ← actualizado automáticamente (yt-dlp playlist_count)
    "engagementRate":     "5.6%",  // manual
    "subscribersTrend":   "+25%",  // manual
    "monthlyViews":       "40K",   // manual
    "newVideosPerMonth":  "4"      // manual
  },
  "global": {
    "totalProfessionals": "21K",   // ← actualizado automáticamente (yt-dlp channel_follower_count)
    "decisionMakersPercentage": "15%"
  },
  // … audience, hero, authority, sponsorships (todos manuales)
}
```

Los campos marcados con **"actualizado automáticamente"** son gestionados por `update_metrics.py`. **No los edites a mano**; se sobreescribirán en la próxima ejecución del workflow.

---

## Automatismos de GitHub Actions

### 1. `deploy.yml` — Despliegue continuo

**Trigger:** Push a rama `main`

**Pasos:**
1. Checkout del código
2. Setup Node.js 20 con caché de npm
3. `npm ci` — instala dependencias
4. `npm run build` — genera `dist/` con TypeScript + Vite
5. Sube el artefacto `dist/` y lo despliega en GitHub Pages

> **Nota:** Los commits generados por `update_metrics.yml` usan `[skip ci]` en el mensaje para no disparar este workflow innecesariamente.

### 2. `update_metrics.yml` — Actualización semanal de métricas

**Trigger:** Cron cada lunes a las 06:00 UTC + `workflow_dispatch` (ejecución manual)

**Pasos:**
1. Checkout
2. Setup Python 3.12
3. `pip install yt-dlp==<versión-fijada>` — sin API key de YouTube
4. `python .github/scripts/update_metrics.py` — scraping y escritura en `metrics.json`
5. Si `metrics.json` cambió: `git commit` + `git push` con mensaje `chore: update YouTube metrics [skip ci]`

**Permisos requeridos:** `contents: write` (para poder hacer push).

---

## Script de actualización de métricas

**Fichero:** `.github/scripts/update_metrics.py`

### Funciones principales

| Función | Descripción |
|---------|-------------|
| `format_subscriber_count(n)` | Formatea un entero a notación K/M (ej. `21300` → `"21.3K"`) |
| `fetch_channel_stats()` | Usa yt-dlp para obtener `(subscriber_count, video_count, view_count)` del canal |
| `update_metrics(subs, videos, views)` | Lee `metrics.json`, compara, actualiza si hay cambios y escribe el fichero |
| `main()` | Punto de entrada: llama a `fetch_channel_stats()` y `update_metrics()` |

### Campos que actualiza en `metrics.json`

| Campo JSON | Fuente yt-dlp | Formato |
|-----------|---------------|---------|
| `global.totalProfessionals` | `channel_follower_count` | K/M (ej. `"21K"`) |
| `channel.videoCount` | `playlist_count` | `"<n>+"` (ej. `"203+"`) |
| `channel.viewCount` | `view_count` | K/M (ej. `"793K"`) |
| `_meta.lastUpdated` | fecha actual | ISO 8601 (`"YYYY-MM-DD"`) |

### Ejecutar el script manualmente (desarrollo/depuración)

```bash
pip install yt-dlp
python .github/scripts/update_metrics.py
```

---

## Desarrollo local

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo con hot-reload
npm run dev

# Verificar tipos y construir para producción
npm run build

# Linter (0 warnings permitidos)
npm run lint
```

> No hay tests automatizados en el proyecto actualmente.

---

## Internacionalización (i18n)

La web soporta **español** (por defecto) e **inglés**. Todos los textos de la UI están en `src/i18n/translations.ts`. El idioma activo se gestiona a través de `LanguageContext` y se persiste en `localStorage`.

Para añadir o modificar textos: edita **ambas** claves `es` y `en` en `translations.ts`.

---

## Instrucciones adicionales por agente

- **GitHub Copilot:** `.github/copilot_instructions.md`
- **Gemini:** `.github/gemini.md`

Ambos ficheros describen el rol de Senior Frontend Engineer + Growth Marketing y detallan el objetivo de la SPA con más contexto de negocio.

---

## Reglas importantes para agentes

1. **No editar manualmente** los campos de `metrics.json` marcados como automáticos (`viewCount`, `videoCount`, `totalProfessionals`, `lastUpdated`).
2. **Mantener el schema de `metrics.json`** tal cual: todos los componentes y hooks dependen de él tipadamente a través de `useMetricsConfig.ts`.
3. **Idioma:** La UI del proyecto está en **español** (con traducción inglesa). Los mensajes de commit, comentarios de código y documentación se escriben preferiblemente en **español**; el inglés también es aceptable en comentarios técnicos de código.
4. **Commits de la automatización** deben incluir `[skip ci]` para evitar re-despliegues innecesarios.
5. **yt-dlp** se usa sin API key de YouTube. Si en el futuro se activa la YouTube Data API, la lógica ya está preparada (comentada) en `useYouTubeMetrics.ts`.
6. **Tailwind** usa la clase `dark` gestionada a nivel de sistema; el tema base es `slate-950`. No añadir librerías de componentes externas sin justificación.
