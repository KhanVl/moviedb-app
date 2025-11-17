'use client';

import Image from 'next/image';
import { Card, Rate, Tag, Typography } from 'antd';
import { format } from 'date-fns';
import type { Movie } from '../types';
import { truncateText } from '../../lib/truncateText';

const { Paragraph, Text, Title } = Typography;

type Props = { movie: Movie };

export function MovieCard({ movie }: Props) {
  const src = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/no-image.png';

  const formattedDate = movie.release_date
    ? format(new Date(movie.release_date), 'MMMM d, yyyy')
    : 'Unknown date';

  const rating = movie.vote_average ? movie.vote_average / 2 : 0;
  const genres = ['Drama', 'Sport'];

  return (
    <Card
      hoverable
      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      bodyStyle={{ padding: 16, display: 'flex', flexDirection: 'column', flex: 1 }}
      cover={
        <div style={{ position: 'relative', width: '100%', height: 260 }}>
          <Image
            src={src}
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 300px"
            style={{ objectFit: 'cover' }}
            priority={false}
          />
        </div>
      }
    >
      <Title level={5} style={{ marginBottom: 4 }}>
        {movie.title}
      </Title>

      <Text type="secondary" style={{ display: 'block', marginBottom: 4 }}>
        {formattedDate}
      </Text>

      <div style={{ marginBottom: 8 }}>
        {genres.map((g) => (
          <Tag key={g}>{g}</Tag>
        ))}
      </div>

      <Paragraph className="movie-desc" type="secondary" style={{ flex: 1 }}>
        {truncateText(movie.overview, 400)}
      </Paragraph>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 }}>
        <Rate allowHalf disabled defaultValue={rating} />
        <Text type="secondary">{movie.vote_average.toFixed(1)}</Text>
      </div>
    </Card>
  );
}
