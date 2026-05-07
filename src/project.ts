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
  "title": "Vision Telemetry Fusion",
  "tagline": "Synthetic dashboard that fuses camera, network, and app telemetry with lightweight anomaly scoring.",
  "type": "telemetry",
  "deploy": false,
  "topics": [
    "telemetry",
    "anomaly-detection",
    "computer-vision",
    "network-monitoring",
    "ewma",
    "react",
    "typescript"
  ],
  "description": "Synthetic dashboard that fuses camera, network, and app telemetry with lightweight anomaly scoring.",
  "accent": "#405f73",
  "secondary": "#8d5e63"
};
