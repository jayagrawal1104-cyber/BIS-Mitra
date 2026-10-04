import { useState } from 'react';
import { Link } from 'react-router-dom';

interface GraphNode {
  id: string;
  label: string;
  type: 'product' | 'standard' | 'testmethod' | 'certification' | 'laboratory';
  x: number;
  y: number;
  desc: string;
}

interface GraphEdge {
  from: string;
  to: string;
  label: string;
}

const NODES: GraphNode[] = [
  { id: 'product', label: 'Stainless Steel\nWater Bottle', type: 'product', x: 260, y: 30, desc: 'Your product: a stainless steel vessel for drinking water' },
  { id: 'std1', label: 'IS XXXXX\nSS Utensils', type: 'standard', x: 100, y: 140, desc: 'Primary applicable standard for stainless steel utensils and cookware' },
  { id: 'std2', label: 'IS YYYYY\nSS Material', type: 'standard', x: 420, y: 140, desc: 'Material specification for wrought stainless steel products' },
  { id: 'std3', label: 'IS ZZZZZ\nDrinking Water', type: 'standard', x: 260, y: 140, desc: 'Drinking water container requirements' },
  { id: 'test1', label: 'IS TTTTT\nTest Method', type: 'testmethod', x: 80, y: 270, desc: 'Testing method for mechanical properties of stainless steel products' },
  { id: 'test2', label: 'IS UUUUU\nMigration Test', type: 'testmethod', x: 260, y: 270, desc: 'Food contact migration testing for metal articles' },
  { id: 'cert1', label: 'ISI Mark\nScheme I', type: 'certification', x: 160, y: 370, desc: 'Mandatory BIS certification scheme for specified products' },
  { id: 'lab1', label: 'BIS Recognized\nLaboratory', type: 'laboratory', x: 380, y: 370, desc: 'NABL-accredited laboratory for testing and certification' },
];

const EDGES: GraphEdge[] = [
  { from: 'product', to: 'std1', label: 'applies' },
  { from: 'product', to: 'std2', label: 'material' },
  { from: 'product', to: 'std3', label: 'water contact' },
  { from: 'std1', to: 'test1', label: 'test method' },
  { from: 'std1', to: 'test2', label: 'migration test' },
  { from: 'std1', to: 'cert1', label: 'requires' },
  { from: 'cert1', to: 'lab1', label: 'test at' },
];

const NODE_COLORS: Record<GraphNode['type'], { bg: string; border: string; text: string; badge: string }> = {
  product: { bg: '#0D1B2A', border: '#1A56DB', text: 'white', badge: 'Product' },
  standard: { bg: '#1D4ED8', border: '#3B82F6', text: 'white', badge: 'Standard' },
  testmethod: { bg: '#7C3AED', border: '#A78BFA', text: 'white', badge: 'Test Method' },
  certification: { bg: '#16A34A', border: '#4ADE80', text: 'white', badge: 'Certification' },
  laboratory: { bg: '#B45309', border: '#FCD34D', text: 'white', badge: 'Laboratory' },
};

export default function GraphPage() {
  const [selected, setSelected] = useState<GraphNode | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">Standards Graph</span>
        </div>
        <h1 className="text-3xl font-extrabold text-[#0D1B2A]" style={{ fontFamily: 'Manrope, sans-serif' }}>
          Standards Intelligence Graph
        </h1>
        <p className="text-slate-500 mt-1">
          Visual map of how your product connects to standards, test methods, certification, and laboratories.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Graph */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-4 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-700">Stainless Steel Water Bottle — Relationships</span>
            <div className="flex items-center gap-3 flex-wrap">
              {Object.entries(NODE_COLORS).map(([type, colors]) => (
                <div key={type} className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ background: colors.bg }} />
                  <span className="text-xs text-slate-500">{colors.badge}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-x-auto">
            <svg
              viewBox="0 0 540 430"
              className="w-full"
              style={{ minHeight: 320 }}
            >
              {/* Edges */}
              {EDGES.map(edge => {
                const from = NODES.find(n => n.id === edge.from)!;
                const to = NODES.find(n => n.id === edge.to)!;
                const mx = (from.x + to.x) / 2;
                const my = (from.y + to.y) / 2;
                return (
                  <g key={`${edge.from}-${edge.to}`}>
                    <line
                      x1={from.x + 60}
                      y1={from.y + 22}
                      x2={to.x + 60}
                      y2={to.y + 22}
                      stroke="#CBD5E1"
                      strokeWidth="1.5"
                      strokeDasharray="4,3"
                    />
                    <text x={mx + 55} y={my + 22} className="text-xs" fill="#94A3B8" fontSize="9" textAnchor="middle">
                      {edge.label}
                    </text>
                  </g>
                );
              })}

              {/* Nodes */}
              {NODES.map(node => {
                const colors = NODE_COLORS[node.type];
                const isSelected = selected?.id === node.id;
                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    onClick={() => setSelected(isSelected ? null : node)}
                    style={{ cursor: 'pointer' }}
                    className="transition-all"
                  >
                    <rect
                      x="0" y="0" width="120" height="44"
                      rx="10"
                      fill={colors.bg}
                      stroke={isSelected ? '#F59E0B' : colors.border}
                      strokeWidth={isSelected ? 2.5 : 1.5}
                      opacity={selected && !isSelected ? 0.6 : 1}
                    />
                    {node.label.split('\n').map((line, i) => (
                      <text
                        key={i}
                        x="60"
                        y={i === 0 ? 17 : 32}
                        fill={colors.text}
                        fontSize="10"
                        fontWeight={i === 0 ? '700' : '400'}
                        textAnchor="middle"
                        fontFamily="JetBrains Mono, monospace"
                      >
                        {line}
                      </text>
                    ))}
                    {isSelected && (
                      <circle cx="110" cy="8" r="5" fill="#F59E0B" />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          <p className="text-xs text-slate-400 text-center mt-3">
            Click any node to see details. Standard numbers are placeholders for demo.
          </p>
        </div>

        {/* Info panel */}
        <div className="space-y-4">
          {selected ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 animate-fade-in-up">
              <div className="flex items-start justify-between mb-3">
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: NODE_COLORS[selected.type].bg, color: 'white' }}>
                  {NODE_COLORS[selected.type].badge}
                </span>
                <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600 p-1">
                  ✕
                </button>
              </div>
              <h3 className="font-bold text-[#0D1B2A] mb-2" style={{ fontFamily: 'Manrope, sans-serif' }}>
                {selected.label.replace('\n', ' — ')}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">{selected.desc}</p>

              <div className="space-y-2">
                {selected.type === 'standard' && (
                  <>
                    <Link to="/standards/std-1" className="w-full flex items-center justify-center gap-2 py-2 bg-[#0D1B2A] text-white rounded-xl text-xs font-semibold hover:bg-[#132338] transition-colors">
                      View Standard Details
                    </Link>
                    <Link to="/ask" className="w-full flex items-center justify-center gap-2 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-medium hover:bg-slate-50 transition-colors">
                      Ask AI about this
                    </Link>
                  </>
                )}
                {selected.type === 'certification' && (
                  <Link to="/certification" className="w-full flex items-center justify-center gap-2 py-2 bg-green-600 text-white rounded-xl text-xs font-semibold hover:bg-green-700 transition-colors">
                    Certification Guide
                  </Link>
                )}
                {selected.type === 'laboratory' && (
                  <Link to="/laboratories" className="w-full flex items-center justify-center gap-2 py-2 bg-[#B45309] text-white rounded-xl text-xs font-semibold hover:opacity-90 transition-colors">
                    Find Laboratories
                  </Link>
                )}
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2">
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">△ Partially Verified</span>
                <button className="text-xs text-blue-600 hover:text-blue-800 font-medium ml-auto">View Evidence →</button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-center">
              <div className="text-3xl mb-3">🗺️</div>
              <p className="text-sm font-medium text-slate-700 mb-1">Click a node to explore</p>
              <p className="text-xs text-slate-500">Each node shows its relationship, evidence, and available actions.</p>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h3 className="font-semibold text-slate-800 text-sm mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
              How the Graph Works
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              BIS Mitra maps relationships between products, applicable standards, test methods, certification schemes, and laboratories — not just keywords.
            </p>
            <p className="text-xs text-slate-500">This demonstrates semantic understanding rather than simple keyword matching.</p>
          </div>

          <Link
            to="/ask"
            className="block w-full text-center py-3 bg-[#0D1B2A] text-white rounded-xl text-sm font-semibold hover:bg-[#132338] transition-colors"
          >
            Ask AI About Your Product
          </Link>
        </div>
      </div>
    </div>
  );
}
