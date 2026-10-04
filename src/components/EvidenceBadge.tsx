type EvidenceLevel = 'verified' | 'partial' | 'insufficient';

interface EvidenceBadgeProps {
  level: EvidenceLevel;
  size?: 'sm' | 'md';
}

const config = {
  verified: {
    icon: '✓',
    label: 'Verified',
    classes: 'bg-green-100 text-green-700 border-green-200',
  },
  partial: {
    icon: '△',
    label: 'Partially Verified',
    classes: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  },
  insufficient: {
    icon: '!',
    label: 'Insufficient Evidence',
    classes: 'bg-red-50 text-red-600 border-red-200',
  },
};

export default function EvidenceBadge({ level, size = 'sm' }: EvidenceBadgeProps) {
  const { icon, label, classes } = config[level];
  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1';
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${classes} ${sizeClasses}`}>
      <span>{icon}</span>
      <span>{label}</span>
    </span>
  );
}

interface EvidenceCoverageBarProps {
  percentage: number;
  verified: number;
  partial: number;
  insufficient: number;
}

export function EvidenceCoverageBar({ percentage, verified, partial, insufficient }: EvidenceCoverageBarProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-slate-700">Evidence Coverage</span>
        <span className="text-2xl font-bold text-[#0D1B2A]">{percentage}%</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-3 flex gap-0.5">
        <div
          className="h-full bg-green-500 rounded-l-full transition-all duration-1000"
          style={{ width: `${(verified / (verified + partial + insufficient)) * 100}%` }}
        />
        <div
          className="h-full bg-yellow-400 transition-all duration-1000"
          style={{ width: `${(partial / (verified + partial + insufficient)) * 100}%` }}
        />
        <div
          className="h-full bg-red-400 rounded-r-full transition-all duration-1000"
          style={{ width: `${(insufficient / (verified + partial + insufficient)) * 100}%` }}
        />
      </div>
      <div className="flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5 text-green-700">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span>{verified} verified</span>
        </div>
        <div className="flex items-center gap-1.5 text-yellow-700">
          <div className="w-2 h-2 rounded-full bg-yellow-400" />
          <span>{partial} partial</span>
        </div>
        <div className="flex items-center gap-1.5 text-red-600">
          <div className="w-2 h-2 rounded-full bg-red-400" />
          <span>{insufficient} unverified</span>
        </div>
      </div>
    </div>
  );
}
