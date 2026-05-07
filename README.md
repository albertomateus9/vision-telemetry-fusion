# Vision Telemetry Fusion

Synthetic dashboard that fuses camera, network, and app telemetry with lightweight anomaly scoring.

## Overview

Vision Telemetry Fusion is a browser-first MVP for the GitHub portfolio of Alberto Mateus P. da Gama. It is built to demonstrate low-cost computer vision applied to telecommunications, infrastructure operations, and technical education.

The app runs locally in the browser. It does not upload images, video, or telemetry to any backend.

## What It Demonstrates

- Privacy-safe local processing.
- Lightweight browser-side computer vision or telemetry analysis.
- A practical telecom/education scenario with synthetic data.
- Exportable output for documentation, inventory, or engineering review.

## Tech Stack

- React + Vite + TypeScript
- Browser Canvas APIs
- Local heuristics and synthetic data
- Optional browser ML hooks where appropriate

## Getting Started

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

## Privacy Notes

- No backend service is used.
- No image, camera frame, or telemetry sample is uploaded.
- Webcam-oriented ideas use synthetic/demo mode by default.
- The project avoids biometric identification and student/person recognition.

## Roadmap

- Add more realistic sample assets.
- Add automated tests for the main analysis function.
- Improve mobile interaction and export formatting.
- Add optional model-based inference only when it stays local and lightweight.

---

# Vision Telemetry Fusion

Synthetic dashboard that fuses camera, network, and app telemetry with lightweight anomaly scoring.

## Visao Geral

Vision Telemetry Fusion e um MVP browser-first para o portfolio GitHub de Alberto Mateus P. da Gama. O projeto demonstra visao computacional de baixo custo aplicada a telecomunicacoes, operacoes de infraestrutura e educacao tecnica.

O app roda localmente no navegador. Ele nao envia imagens, video ou telemetria para backend.

## O Que Demonstra

- Processamento local com foco em privacidade.
- Visao computacional ou analise de telemetria leve no navegador.
- Cenario pratico de telecom/educacao com dados sinteticos.
- Saida exportavel para documentacao, inventario ou revisao de engenharia.

## Como Rodar

```bash
npm install
npm run dev
```

Build de producao:

```bash
npm run build
```

## Licenca

MIT. Veja [LICENSE](LICENSE).
