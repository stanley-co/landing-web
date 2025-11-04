import styles from "./ProductsSection.module.css";

const products = [
  { name: "Large Batch 2T/3T Lotion & Shampoo Making Machine" },
  { name: "Double Way Emulsifier Mixer for Cosmetics" },
  { name: "Lifting Vacuum Toothpaste Ointment Produce Machine" },
  { name: "1000L Double Jacket Liquid Detergent Mixer" },
];

const ProductsSection = () => (
  <section id="products" className={styles.products}>
    <h2>Product Center</h2>
    <div className={styles.list}>
      {products.map((p) => (
        <div key={p.name} className={styles.card}>
          <h3>{p.name}</h3>
          <button>Подробнее</button>
        </div>
      ))}
    </div>
  </section>
);

export default ProductsSection;
