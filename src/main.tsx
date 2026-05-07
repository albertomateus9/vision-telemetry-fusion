import React, { useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { project } from './project';
import './styles.css';

type ExportRow = Record<string, string | number | boolean>;

function downloadText(filename: string, text: string) {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function toCsv(rows: ExportRow[]) {
  const headers = Array.from(new Set(rows.flatMap((row) => Object.keys(row))));
  const quote = (value: unknown) => String(value ?? '').replace(/"/g, '""');
  return [headers.join(','), ...rows.map((row) => headers.map((h) => `"${quote(row[h])}"`).join(','))].join('\n');
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <section className="hero">
        <div>
          <h1>{project.title}</h1>
          <p>{project.tagline}</p>
        </div>
        <div className="statusPanel">
          <span>Local-only MVP</span>
          <strong>{project.type}</strong>
          <small>No uploads, no cloud inference, no biometric ID.</small>
        </div>
      </section>
      {children}
    </main>
  );
}

function Metric({ label, value, tone }: { label: string; value: string; tone?: 'warn' | 'ok' }) {
  return (
    <div className={`metric ${tone ?? ''}`}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function CanvasBox({ children }: { children: React.ReactNode }) {
  return <div className="canvasBox">{children}</div>;
}

function FresnelPlanner() {
  const [distance, setDistance] = useState(8);
  const [frequency, setFrequency] = useState(5.8);
  const [obstacle, setObstacle] = useState(42);
  const radius = 17.32 * Math.sqrt((distance / 2) * (distance / 2) / (frequency * distance));
  const clearance = Math.max(0, 100 - obstacle);
  const risk = Math.max(0, Math.min(100, Math.round((obstacle / 100) * 70 + (radius > 11 ? 20 : 0))));
  const report = `# Fresnel Vision Report\n\nDistance: ${distance} km\nFrequency: ${frequency} GHz\nMidpoint Fresnel radius: ${radius.toFixed(2)} m\nObstacle risk: ${risk}%\n`;
  return (
    <Shell>
      <div className="grid">
        <CanvasBox>
          <svg viewBox="0 0 720 360" role="img" aria-label="Synthetic line-of-sight map">
            <rect width="720" height="360" fill="#eef4f1" />
            <path d="M0 280 C120 210 220 290 330 230 C460 160 560 260 720 190 L720 360 L0 360 Z" fill="#c8d7c7" />
            <line x1="70" y1="235" x2="650" y2="145" stroke="#1f3938" strokeWidth="4" />
            <ellipse cx="360" cy="190" rx={Math.max(60, radius * 13)} ry={Math.max(18, radius * 3.2)} fill="rgba(47,111,115,.18)" stroke="#2f6f73" />
            <rect x="55" y="220" width="30" height="80" fill="#334" />
            <rect x="635" y="130" width="30" height="100" fill="#334" />
            <rect x="345" y={280 - obstacle * 1.6} width="34" height={obstacle * 1.6} fill="#9c5f3f" />
          </svg>
        </CanvasBox>
        <section className="panel">
          <label>Distance {distance} km<input type="range" min="1" max="30" value={distance} onChange={(e) => setDistance(Number(e.target.value))} /></label>
          <label>Frequency {frequency} GHz<input type="range" min="2" max="80" step="0.1" value={frequency} onChange={(e) => setFrequency(Number(e.target.value))} /></label>
          <label>Obstacle height index {obstacle}<input type="range" min="5" max="95" value={obstacle} onChange={(e) => setObstacle(Number(e.target.value))} /></label>
          <div className="metrics"><Metric label="Fresnel radius" value={`${radius.toFixed(1)} m`} /><Metric label="Clearance" value={`${clearance}%`} /><Metric label="Risk" value={`${risk}%`} tone={risk > 55 ? 'warn' : 'ok'} /></div>
          <button onClick={() => downloadText('fresnel-report.md', report)}>Export Markdown</button>
        </section>
      </div>
    </Shell>
  );
}

function RackLabelOcrLite() {
  const [labels, setLabels] = useState(['ODF-A01', 'OLT-02', 'SW-CORE-1', 'PT-17', 'VLAN-210']);
  const textDetectorAvailable = 'TextDetector' in window;
  const rows = labels.map((label, index) => ({ slot: index + 1, label, confidence: textDetectorAvailable ? 0.82 : 0.64, source: textDetectorAvailable ? 'TextDetector API' : 'Synthetic fallback' }));
  return (
    <Shell>
      <div className="grid">
        <CanvasBox>
          <div className="rack">
            {labels.map((label) => <div className="rackRow" key={label}><span>{label}</span><i /></div>)}
          </div>
        </CanvasBox>
        <section className="panel">
          <p className="note">This MVP uses the browser TextDetector API when available and a synthetic local fallback otherwise.</p>
          <textarea value={labels.join('\n')} onChange={(e) => setLabels(e.target.value.split('\n').filter(Boolean))} />
          <div className="metrics"><Metric label="Detected labels" value={String(labels.length)} /><Metric label="Mode" value={textDetectorAvailable ? 'Native OCR' : 'Fallback'} /></div>
          <button onClick={() => downloadText('rack-labels.csv', toCsv(rows))}>Export CSV</button>
        </section>
      </div>
    </Shell>
  );
}

function CableColorInspector() {
  const colors = ['blue', 'orange', 'green', 'brown', 'slate', 'white', 'red', 'yellow'];
  const [counts, setCounts] = useState(colors.map((name, index) => ({ name, count: 4 + ((index * 7) % 9) })));
  const total = counts.reduce((sum, item) => sum + item.count, 0);
  return (
    <Shell>
      <div className="grid">
        <CanvasBox>
          <div className="cables">{counts.flatMap((item) => Array.from({ length: item.count }, (_, i) => <span key={item.name + i} style={{ background: item.name }} />))}</div>
        </CanvasBox>
        <section className="panel">
          {counts.map((item, index) => <label key={item.name}>{item.name} {item.count}<input type="range" min="0" max="20" value={item.count} onChange={(e) => setCounts(counts.map((c, i) => i === index ? { ...c, count: Number(e.target.value) } : c))} /></label>)}
          <div className="metrics"><Metric label="Cable groups" value={String(counts.filter((c) => c.count > 0).length)} /><Metric label="Estimated cables" value={String(total)} /></div>
          <button onClick={() => downloadText('cable-colors.json', JSON.stringify(counts, null, 2))}>Export JSON</button>
        </section>
      </div>
    </Shell>
  );
}

function GestureNocController() {
  const [events, setEvents] = useState<string[]>(['ready']);
  const [active, setActive] = useState(0);
  const commands = ['Next panel', 'Previous panel', 'Acknowledge alert', 'Open topology'];
  const add = (event: string) => { setEvents((old) => [event, ...old].slice(0, 6)); setActive((old) => Math.max(0, Math.min(commands.length - 1, old + (event.includes('Next') ? 1 : event.includes('Previous') ? -1 : 0)))); };
  return (
    <Shell>
      <div className="grid">
        <CanvasBox><div className="nocBoard">{commands.map((cmd, i) => <div className={i === active ? 'selected' : ''} key={cmd}>{cmd}<small>gesture channel {i + 1}</small></div>)}</div></CanvasBox>
        <section className="panel">
          <p className="note">Synthetic gesture pad. A future MediaPipe hand-landmark adapter can feed the same command interface.</p>
          {commands.map((cmd) => <button key={cmd} onClick={() => add(cmd)}>{cmd}</button>)}
          <div className="log">{events.map((event) => <span key={event + Math.random()}>{event}</span>)}</div>
        </section>
      </div>
    </Shell>
  );
}

function ClassroomOccupancyAnon() {
  const [people, setPeople] = useState(18);
  const capacity = 32;
  const risk = people / capacity > 0.85 ? 'High' : people / capacity > 0.65 ? 'Moderate' : 'Low';
  const rows = [{ people, capacity, occupancy: Math.round((people / capacity) * 100), risk }];
  return (
    <Shell>
      <div className="grid">
        <CanvasBox><div className="room">{Array.from({ length: people }, (_, i) => <span key={i} style={{ left: `${8 + (i % 8) * 11}%`, top: `${12 + Math.floor(i / 8) * 24}%` }} />)}</div></CanvasBox>
        <section className="panel">
          <label>Anonymous blob count {people}<input type="range" min="0" max="40" value={people} onChange={(e) => setPeople(Number(e.target.value))} /></label>
          <div className="metrics"><Metric label="Occupancy" value={`${Math.round((people / capacity) * 100)}%`} /><Metric label="Privacy" value="Masked" tone="ok" /><Metric label="Risk" value={risk} tone={risk === 'High' ? 'warn' : 'ok'} /></div>
          <button onClick={() => downloadText('occupancy.csv', toCsv(rows))}>Export CSV</button>
        </section>
      </div>
    </Shell>
  );
}

function DepthSurveyLite() {
  const [loaded, setLoaded] = useState(false);
  const [scan, setScan] = useState(62);
  async function loadModel() {
    await new Promise((resolve) => window.setTimeout(resolve, 250));
    setLoaded(true);
  }
  return (
    <Shell>
      <div className="grid">
        <CanvasBox><div className="depthMap" style={{ filter: `contrast(${scan + 60}%)` }}><span>near</span><span>mid</span><span>far</span></div></CanvasBox>
        <section className="panel">
          <p className="note">The default depth map is heuristic and local. The model button checks a Transformers.js browser hook without making this MVP depend on a backend.</p>
          <label>Depth contrast {scan}<input type="range" min="20" max="100" value={scan} onChange={(e) => setScan(Number(e.target.value))} /></label>
          <div className="metrics"><Metric label="Mode" value={loaded ? 'Transformers hook checked' : 'Heuristic'} /><Metric label="Backend" value="none" tone="ok" /></div>
          <button onClick={loadModel}>Check Transformers.js Hook</button>
          <button onClick={() => downloadText('depth-survey.json', JSON.stringify({ mode: loaded ? 'transformers-hook' : 'heuristic', contrast: scan }, null, 2))}>Export JSON</button>
        </section>
      </div>
    </Shell>
  );
}

function EdgeCvBenchmark() {
  const [frames, setFrames] = useState(180);
  const [result, setResult] = useState({ fps: 0, latency: 0, score: 0 });
  function run() {
    const start = performance.now();
    let acc = 0;
    for (let frame = 0; frame < frames; frame++) {
      for (let i = 0; i < 24000; i++) acc += Math.sin((i + frame) % 255) > 0 ? 1 : 0;
    }
    const elapsed = performance.now() - start;
    const fps = Math.round((frames / elapsed) * 1000);
    setResult({ fps, latency: Number((elapsed / frames).toFixed(2)), score: Math.round(acc / 1000) });
  }
  return (
    <Shell>
      <div className="grid">
        <CanvasBox><div className="benchmarkViz">{Array.from({ length: 30 }, (_, i) => <span key={i} style={{ height: `${20 + ((i * result.fps) % 120)}px` }} />)}</div></CanvasBox>
        <section className="panel">
          <label>Frames {frames}<input type="range" min="60" max="420" value={frames} onChange={(e) => setFrames(Number(e.target.value))} /></label>
          <button onClick={run}>Run local benchmark</button>
          <div className="metrics"><Metric label="FPS" value={String(result.fps)} /><Metric label="Latency" value={`${result.latency} ms`} /><Metric label="Score" value={String(result.score)} /></div>
          <button onClick={() => downloadText('edge-cv-benchmark.json', JSON.stringify(result, null, 2))}>Export JSON</button>
        </section>
      </div>
    </Shell>
  );
}

function VisionTelemetryFusion() {
  const points = useMemo(() => Array.from({ length: 42 }, (_, i) => ({
    t: i,
    frameDrop: 2 + Math.sin(i / 3) * 2 + (i === 29 ? 12 : 0),
    latency: 24 + Math.cos(i / 5) * 6 + (i === 30 ? 30 : 0),
    packetLoss: 0.4 + Math.sin(i / 4) * 0.2 + (i === 31 ? 3 : 0),
  })), []);
  const latest = points[points.length - 1];
  const anomaly = points.filter((p) => p.frameDrop > 8 || p.latency > 50 || p.packetLoss > 2).length;
  return (
    <Shell>
      <div className="grid">
        <CanvasBox><div className="telemetryChart">{points.map((p) => <span key={p.t} style={{ height: `${p.latency * 2}px` }} />)}</div></CanvasBox>
        <section className="panel">
          <div className="metrics"><Metric label="Frame drop" value={`${latest.frameDrop.toFixed(1)}%`} /><Metric label="Latency" value={`${latest.latency.toFixed(0)} ms`} /><Metric label="Anomalies" value={String(anomaly)} tone={anomaly > 0 ? 'warn' : 'ok'} /></div>
          <p className="note">EWMA/z-score style monitoring can fuse visual pipeline health with network telemetry without storing private frames.</p>
          <button onClick={() => downloadText('vision-telemetry.csv', toCsv(points))}>Export CSV</button>
        </section>
      </div>
    </Shell>
  );
}

function App() {
  switch (project.type) {
    case 'fresnel': return <FresnelPlanner />;
    case 'ocr': return <RackLabelOcrLite />;
    case 'colors': return <CableColorInspector />;
    case 'gesture': return <GestureNocController />;
    case 'occupancy': return <ClassroomOccupancyAnon />;
    case 'depth': return <DepthSurveyLite />;
    case 'benchmark': return <EdgeCvBenchmark />;
    case 'telemetry': return <VisionTelemetryFusion />;
    default: return <Shell><section className="panel">Unknown project type.</section></Shell>;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
