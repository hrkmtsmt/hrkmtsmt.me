import React from 'react';
import { BrandSymbol } from './index';
import { render, screen } from '@testing-library/react';

describe('component BrandSymbol', () => {
  test('widthプロパティが正しく適用される', () => {
    render(<BrandSymbol size={32} color="primary" />);
    expect(screen.getByRole('img')).toHaveAttribute('width', '32');
  });

  test('heightプロパティが正しく適用される', () => {
    render(<BrandSymbol size={32} color="primary" />);
    expect(screen.getByRole('img')).toHaveAttribute('height', '32');
  });

  test('color=primaryの場合はprimaryのクラスが適応される', () => {
    render(<BrandSymbol size={32} color="primary" />);
    expect(screen.getByRole('img').firstChild).toHaveClass('fill-primary');
  });

  test('color=whiteの場合はwhiteのクラスが適応される', () => {
    render(<BrandSymbol size={32} color="white" />);
    expect(screen.getByRole('img').firstChild).toHaveClass('fill-white');
  });

  test('BrandSymbolがレンダリングされる', () => {
    render(<BrandSymbol size={32} color="primary" />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
