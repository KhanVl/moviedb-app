'use client';

export function ratingColor(v: number) {
  if (v > 7) return '#66E900';
  if (v >= 5) return '#E9D100';
  if (v >= 3) return '#E97E00';
  return '#E90000';
}

export default function RatingBadge({ value }: { value: number }) {
  const color = ratingColor(value ?? 0);
  return (
    <div
      style={{
        position: 'absolute',
        top: 8,
        right: 8,
        width: 38,
        height: 38,
        borderRadius: '50%',
        background: color,
        color: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
      }}
      aria-label={`Rating ${value}`}
    >
      {Number.isFinite(value) ? value.toFixed(1) : '—'}
    </div>
  );
}
