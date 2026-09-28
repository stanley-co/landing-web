import { act, createElement } from 'react';
import { describe, expect, it } from 'vitest';
import { renderApplication } from './renderApplication';

describe('renderApplication', () => {
  it('mounts the app when the server returned an empty root', () => {
    const root = document.createElement('div');

    act(() => renderApplication(root, createElement('main', null, 'Главная страница')));

    expect(root.querySelector('main')?.textContent).toBe('Главная страница');
  });
});
