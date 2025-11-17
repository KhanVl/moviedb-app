'use client';

import { Row, Col, Typography } from 'antd';
import type { Movie } from '../types';
import { MovieCard } from './MovieCard';

const { Title } = Typography;

type Props = { movies: Movie[] };

export function MovieList({ movies }: Props) {
  return (
    <>
      <Title level={3} style={{ marginBottom: 24 }}>
        Movies
      </Title>

      <Row gutter={[24, 24]} align="stretch">
        {movies.map((movie) => (
          <Col key={movie.id} xs={24} sm={12} md={8} style={{ display: 'flex' }}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </>
  );
}
