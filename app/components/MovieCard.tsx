'use client';

import Image from 'next/image';
import fallbackPoster from '@/public/no-image.png';
import { Card, Rate, Tag, Typography, message } from 'antd';
import type { CSSProperties } from 'react';
import { format } from 'date-fns';
import { useState, useTransition } from 'react';
import type { Movie } from '../types';
import { truncateText } from '../../lib/truncateText';
import { useGenres } from '../providers/GenresProvider';
import RatingBadge from './RatingBadge';

const { Paragraph, Text, Title } = Typography;

const bodyStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  padding: 16,
  gap: 16,
};

type Props = { movie: Movie; isFirst?: boolean };

export function MovieCard({ movie, isFirst = false }: Props) {
  const src = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : fallbackPoster;

  const formattedDate = movie.release_date
    ? format(new Date(movie.release_date), 'MMMM d, yyyy')
    : 'Unknown date';

  const tmdbValue10 = movie.vote_average ?? 0;

  const initialUserRating10 = typeof movie.rating === 'number' ? movie.rating : undefined;

  const [userRating10, setUserRating10] = useState<number | undefined>(initialUserRating10);
  const [isPending, startTransition] = useTransition();

  const { genresById } = useGenres();
  const genreNames = (movie.genre_ids ?? [])
    .map((id) => genresById[id])
    .filter(Boolean) as string[];

  const handleRateChange = (value10: number) => {
    setUserRating10(value10);

    startTransition(async () => {
      try {
        const res = await fetch(`/api/rate/${movie.id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ value: value10 }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => null);
          console.error('Rate error', res.status, errData);
          throw new Error('Failed to rate');
        }

        message.success('Rated!');
      } catch (err) {
        console.error('Rate request failed', err);
        message.error('Failed to rate');
        setUserRating10((prev) => prev);
      }
    });
  };

  return (
    <Card
      hoverable
      style={{
        width: '100%',
        borderRadius: 12,
        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        position: 'relative',
      }}
      styles={{ body: bodyStyles }}
    >
      <div style={{ position: 'absolute', top: 16, right: 16 }}>
        <RatingBadge value={tmdbValue10} />
      </div>

      <div
        style={{
          position: 'relative',
          flex: '0 0 96px',
          width: 96,
          height: 144,
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <Image
          src={src}
          alt={movie.title}
          fill
          priority={isFirst}
          loading={isFirst ? 'eager' : undefined}
          sizes="96px"
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minWidth: 0,
        }}
      >
        <Title level={5} style={{ marginBottom: 4 }}>
          {movie.title}
        </Title>

        <Text type="secondary" style={{ display: 'block', marginBottom: 4, fontSize: 12 }}>
          {formattedDate}
        </Text>

        <div
          style={{
            marginBottom: 8,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 6,
          }}
        >
          {genreNames.length ? (
            genreNames.map((g) => (
              <Tag key={g} style={{ fontSize: 11, paddingInline: 8 }}>
                {g}
              </Tag>
            ))
          ) : (
            <Tag style={{ fontSize: 11, paddingInline: 8 }}>Unknown</Tag>
          )}
        </div>

        <Paragraph
          className="movie-desc"
          type="secondary"
          style={{
            flex: 1,
            marginBottom: 10,
            fontSize: 12,
            lineHeight: 1.4,
          }}
        >
          {truncateText(movie.overview, 180)}
        </Paragraph>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Rate
            allowHalf
            count={10}
            value={userRating10 ?? 0}
            onChange={handleRateChange}
            disabled={isPending}
            style={{ fontSize: 12 }}
          />
        </div>
      </div>
    </Card>
  );
}
