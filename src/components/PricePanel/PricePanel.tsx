import styles from './PricePanel.module.css';

export type PriceCurrency = 'RUB' | 'USD' | 'CNY';
export type PriceDisplayMode = 'EXACT' | 'FROM';
export type PricePanelProps = {
  amount?: number | null;
  currency?: PriceCurrency | null;
  mode?: PriceDisplayMode | null;
  promotionText?: string | null;
  className?: string;
};

export function getDisplayablePrice(amount: PricePanelProps['amount'], currency: PricePanelProps['currency'], mode: PricePanelProps['mode']) {
  if (typeof amount === 'number' && Number.isFinite(amount) && amount >= 0 && !Object.is(amount, -0)
    && (currency === 'RUB' || currency === 'USD' || currency === 'CNY')
    && (mode === 'EXACT' || mode === 'FROM')) return { amount, currency, mode };
  return null;
}

export function formatPrice(amount: number, currency: PriceCurrency, mode: PriceDisplayMode) {
  const value = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 }).format(amount);
  const formatted = currency === 'RUB' ? `${value} ₽` : currency === 'USD' ? `$${value}` : `¥${value}`;
  return mode === 'FROM' ? `от ${formatted}` : formatted;
}

export function formatAccessiblePrice(amount: number, currency: PriceCurrency, mode: PriceDisplayMode) {
  const value = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 }).format(amount);
  const currencyName = currency === 'RUB' ? 'рублей' : currency === 'USD' ? 'долларов США' : 'китайских юаней';
  return `${mode === 'FROM' ? 'от ' : ''}${value} ${currencyName}`;
}

const PricePanel = ({ amount, currency, mode, promotionText, className }: PricePanelProps) => {
  const price = getDisplayablePrice(amount, currency, mode);
  if (!price) return null;
  return (
    <dl className={[styles.panel, className].filter(Boolean).join(' ')}>
      <dt className={styles.label}>Цена</dt>
      <dd className={styles.value} aria-label={formatAccessiblePrice(price.amount, price.currency, price.mode)}>
        {formatPrice(price.amount, price.currency, price.mode)}
      </dd>
      {promotionText && <dd className={styles.promotion}>{promotionText}</dd>}
    </dl>
  );
};

export default PricePanel;
