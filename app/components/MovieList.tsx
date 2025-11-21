'use client';

import { Row, Col } from 'antd';
import type { Movie } from '../types';
import { MovieCard } from './MovieCard';

type Props = { movies: Movie[] };

export function MovieList({ movies }: Props) {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <Row gutter={[24, 24]} align="stretch" wrap>
      {movies.map((movie, idx) => (
        <Col key={movie.id} xs={24} sm={24} md={12} lg={12} xl={12} style={{ display: 'flex' }}>
          <MovieCard movie={movie} isFirst={idx === 0} />
        </Col>
      ))}
    </Row>
  );
}
