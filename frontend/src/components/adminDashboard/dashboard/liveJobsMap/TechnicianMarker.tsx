'use client';

interface TechnicianMarkerProps {
  type: 'available' | 'busy' | 'emergency';
  top: string;
  left: string;
}

export default function TechnicianMarker({
  type,
  top,
  left,
}: TechnicianMarkerProps) {
  const colors = {
    available: {
      outer: 'bg-emerald-500/30',
      inner: 'bg-emerald-600',
      animation: 'animate-pulse',
    },

    busy: {
      outer: 'bg-blue-500/30',
      inner: 'bg-blue-600',
      animation: 'animate-pulse',
    },

    emergency: {
      outer: 'bg-red-500/30',
      inner: 'bg-red-600',
      animation: 'animate-ping',
    },
  };

  const marker = colors[type];

  return (
    <div
      className={`
        absolute
        flex
        items-center
        justify-center
        rounded-full
        ${marker.outer}
        ${marker.animation}
      `}
      style={{
        top,
        left,
        width: '24px',
        height: '24px',
      }}
    >
      <div
        className={`
          h-3
          w-3
          rounded-full
          ${marker.inner}
        `}
      />
    </div>
  );
}