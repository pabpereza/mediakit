# Role Definition
Actúa como un **Senior Frontend Engineer** con experiencia en integración de APIs y **Growth Marketing**.
Tu objetivo es desarrollar un **Media Kit Dinámico** (SPA) para "Pabpereza" que sirva como herramienta de venta directa para conseguir patrocinadores.

# Core Objective & Philosophy
* **Primary Goal:** Convencer a empresas tecnológicas para que patrocinen el canal.
* **Key Value:** "Audiencia técnica de alta calidad, validada por un experto de la industria (CISO & Kubeastronaut)".
* **Data Strategy:** Las métricas NO deben ser estáticas. Debes implementar la lógica para consumirlas desde la **YouTube Data API**.

# Architecture & Tech Stack
* **Framework:** React + Vite.
* **Styling:** Tailwind CSS (Dark Mode: `slate-950` base).
* **Icons:** Lucide React.
* **Data Fetching:** Implementa un custom hook `useYouTubeMetrics`.
    * *Nota:* Como no tenemos una API Key activa en este momento, el hook debe tener un `mockData` de fallback, pero la estructura del `fetch` (endpoints como `channels?part=statistics`) debe estar escrita y comentada lista para producción.

# Content Structure & Layout

## 1. Hero: The Value Proposition
Diseño limpio y corporativo.
* **Headline:** "Pabpereza Media Kit"
* **Subheadline:** "Conectando marcas con la próxima generación de ingenieros DevSecOps y Cloud Native."
* **CTA Principal:** "Solicitar Tarifas / Colaborar" (Destacado).
* **CTA Secundario:** "Descargar Reporte PDF".

## 2. REAL-TIME AUDIENCE INSIGHTS (The "Money" Section)
Esta es la sección crítica. Debe parecer un dashboard financiero/técnico.
* **Logic:** Usa el hook `useYouTubeMetrics` para poblar estos datos.
* **Cards (Grid Layout):**
    * **Subscribers:** Muestra el contador con animación de conteo. (Target: +20.3K).
    * **Lifetime Views:** (Target: +759K).
    * **Engagement Rate:** Calcula un % estimado basado en likes/views (puedes mockearlo en 4-5% para mostrar el potencial).
    * **Video Library:** 196+ Vídeos técnicos especializados.
* **Visuals:** Usa gráficos de línea minimalistas (sparklines) decorativos detrás de los números para sugerir crecimiento constante.

## 3. Host Authority & Audience Profile (Merged Section)
*Instrucción Crítica:* No crees una sección de "Premios". Integra la autoridad en la narrativa de la audiencia.
* **Layout:** Una tarjeta amplia estilo "About the Creator".
* **Narrativa:**
    "Detrás del canal está **Pablo Pérez-Aradros**, CISO en Santander Group. El contenido no es generalista; es formación técnica de nicho impartida por un **CNCF Kubeastronaut** (KCNA, CKA, CKS, etc.)."
    * *Visual:* Coloca los logos de las certificaciones (KCNA, CKS, etc.) en pequeño, en escala de grises/monocromo debajo del texto para dar autoridad sutil pero firme.
* **Audience Insight:** "Mi audiencia está compuesta por profesionales que buscan dominar **Docker, Kubernetes, Terraform y DevSecOps**." (Usa las badges de tecnología aquí).

## 4. Sponsorship Opportunities / Services
Diseña 3 tarjetas simples que expliquen qué se vende (sin precios, solo conceptos):
1.  **Video Dedicado:** "Deep dive técnico en tu producto/herramienta."
2.  **Integración/Mención:** "Shout-out de 60-90 segundos en tutoriales evergreen."
3.  **Social Blast:** "Amplificación en LinkedIn (+Red profesional) y Twitter."

## 5. Footer
* Enlaces limpios a YouTube, LinkedIn, Web y Email de contacto.

# Implementation Details (Code Requirements)
1.  **`useYouTubeMetrics.ts`**: Crea este hook. Debe simular una llamada asíncrona.
    ```typescript
    // Ejemplo de lógica esperada
    // const fetchMetrics = async () => {
    //   try {
    //      const response = await fetch('[https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UC_ID&key=API_KEY](https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UC_ID&key=API_KEY)');
    //      // ... handle data
    //   } catch (error) {
    //      setMetrics(FALLBACK_DATA); // Usa los datos estáticos proporcionados si falla la API
    //   }
    // }
    ```
2.  **Responsive:** Crítico para que los directores de marketing lo vean en el móvil.
3.  **Print Styles:** Asegura que al imprimir, el fondo oscuro se elimine o se adapte para ahorrar tinta, pero manteniendo la estructura de datos legible.

# Execution
Genera el código completo de la aplicación, priorizando la estructura del Dashboard de Métricas y la integración simulada de la API.