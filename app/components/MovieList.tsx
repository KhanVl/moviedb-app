'use client';

import { Row, Col, Typography, Empty } from 'antd';
import type { Movie } from '../types';
import { MovieCard } from './MovieCard';

const { Title } = Typography;

type Props = { movies: Movie[] };

export function MovieList({ movies }: Props) {
  if (!movies || movies.length === 0) {
    return (
      <div style={{ padding: 24 }}>
        <Title level={3} style={{ marginBottom: 16 }}>
          Movies
        </Title>
        <Empty description="No movies found" />
      </div>
    );
  }

  return (
    <>
      <Title level={3} style={{ marginBottom: 24 }}>
        Movies
      </Title>

      <Row gutter={[24, 24]} align="stretch" wrap>
        {movies.map((movie) => (
          <Col key={movie.id} xs={24} sm={12} md={8} lg={8} xl={8} style={{ display: 'flex' }}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </>
  );
}
