export type ProjectType = 'fresnel' | 'ocr' | 'colors' | 'gesture' | 'occupancy' | 'depth' | 'benchmark' | 'telemetry';

export type ProjectConfig = {
  slug: string;
  title: string;
  tagline: string;
  type: ProjectType;
  deploy: boolean;
  topics: string[];
  description: string;
  accent: string;
  secondary: string;
};

export const project: ProjectConfig = {
  "slug": "vision-telemetry-fusion",
  "title": "Fusao De Telemetria De Visao E Rede",
  "description": "Dashboard sintetico que cruza metricas de camera, rede e aplicacao para detectar anomalias simples.",
  "topics": [
    "telemetry",
    "anomaly-detection",
    "computer-vision",
    "network-monitoring",
    "ewma",
    "react",
    "typescript",
    "telemetria",
    "anomalias",
    "redes",
    "visao-computacional",
    "github-pages",
    "portugues-brasil",
    "educacao-tecnologica",
    "telecomunicacoes"
  ],
  "deploy": true,
  "tagline": "Fusão local de telemetria visual, rede e aplicação para leitura rápida de anomalias.",
  "type": "telemetry",
  "accent": "#405f73",
  "secondary": "#8d5e63"
};
