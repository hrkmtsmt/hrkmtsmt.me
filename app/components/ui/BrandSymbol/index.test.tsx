import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrandSymbol } from './index';

describe('component BrandSymbol', () => {
  test('widthプロパティが正しく適用される', () => {
    render(<BrandSymbol size={32} />);
    expect(screen.getByRole('img')).toHaveAttribute('width', '32');
  });

  test('heightプロパティが正しく適用される', () => {
    render(<BrandSymbol size={32} />);
    expect(screen.getByRole('img')).toHaveAttribute('height', '32');
  });

  test('BrandSymbolがレンダリングされる', () => {
    render(<BrandSymbol size={32} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
