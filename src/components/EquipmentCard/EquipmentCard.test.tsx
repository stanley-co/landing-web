import type { ReactNode, ButtonHTMLAttributes, ComponentProps } from 'react';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, it, vi } from 'vitest';
import EquipmentCard from './EquipmentCard';

const navigate = vi.fn();
Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });

vi.mock('@ionic/react', () => ({
  IonCard: ({ children }: { children: ReactNode }) => <article>{children}</article>,
  IonCardContent: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  IonCardHeader: ({ children }: { children: ReactNode }) => <header>{children}</header>,
  IonCardTitle: ({ children }: { children: ReactNode }) => <h2>{children}</h2>,
  IonButton: ({ children, onClick, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => <button onClick={onClick} {...props}>{children}</button>,
  IonImg: () => <img alt="" />,
  IonIcon: () => null,
}));
vi.mock('react-router-dom', () => ({ useNavigate: () => navigate }));

const product = { id: 'mixer-1', name: 'Миксер', category: 'Миксеры', image: '/mixer.jpg', description: 'Описание' };

function renderCard(props: ComponentProps<typeof EquipmentCard>) {
  const host = document.createElement('div');
  document.body.append(host);
  act(() => createRoot(host).render(<EquipmentCard {...props} />));
  return host;
}

describe('EquipmentCard commercial state', () => {
  it.each([
    [1250000, 'RUB', 'EXACT', '1 250 000 ₽'],
    [12000, 'USD', 'EXACT', '$12 000'],
    [90000, 'CNY', 'FROM', 'от ¥90 000'],
  ] as const)('renders %s %s %s as %s and keeps detail navigation', (priceAmount, priceCurrency, priceDisplayMode, price) => {
    navigate.mockReset();
    const host = renderCard({ ...product, priceAmount, priceCurrency, priceDisplayMode, promotionText: 'Монтаж включён' });
    expect(host.textContent).toContain('Цена');
    expect(host.textContent?.replaceAll('\u00a0', ' ')).toContain(price);
    expect(host.textContent).toContain('Монтаж включён');
    const button = host.querySelector('button')!;
    expect(button.getAttribute('aria-label')).toBe('Подробнее о Миксер');
    act(() => button.click());
    expect(navigate).toHaveBeenCalledWith('/equipment/mixer-1');
  });

  it('hides commercial UI for an absent price and keeps detail navigation', () => {
    navigate.mockReset();
    const host = renderCard({ ...product, priceAmount: null, promotionText: 'Не показывать' });
    expect(host.textContent).toContain('Подробнее');
    expect(host.textContent).not.toContain('Цена');
    expect(host.textContent).not.toContain('Не показывать');
    expect(host.textContent).not.toContain('Запросить цену');
    act(() => host.querySelector('button')!.click());
    expect(navigate).toHaveBeenCalledWith('/equipment/mixer-1');
  });

  it.each([
    { priceAmount: 1250000, priceCurrency: undefined },
    { priceAmount: undefined, priceCurrency: 'RUB' as const },
  ])('hides commercial UI for incomplete price data', (price) => {
    navigate.mockReset();
    const host = renderCard({ ...product, ...price, promotionText: 'Не показывать' });
    expect(host.textContent).not.toContain('Цена');
    expect(host.textContent).not.toContain('Не показывать');
    const button = host.querySelector('button')!;
    expect(button.getAttribute('aria-label')).toBe('Подробнее о Миксер');
    act(() => button.click());
    expect(navigate).toHaveBeenCalledWith('/equipment/mixer-1');
  });
});
