import './ProductCard.css';

export const ProductCard = ({ product }) => {
  const discountedPrice = product.discount
    ? Math.round(product.price * (1 - product.discount))
    : null;

  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.title} />
      <h3>{product.title}</h3>
      <div className="price-container">
        {discountedPrice ? (
          <>
            <span className="discounted-price">{discountedPrice} ₽</span>
            <span className="original-price">{product.price} ₽</span>
          </>
        ) : (
          <span className="price">{product.price} ₽</span>
        )}
      </div>
    </div>
  );
};