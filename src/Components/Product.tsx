import { Link } from "react-router-dom";
import { useCart } from "../Context/Cart/CartProvider";
import { ProductComponentProps } from "../Interfaces";
import { checkInCart } from "../Util/checkInCart";

const Product: React.FC<ProductComponentProps> = ({ product, addProductHandler }) => {
  const [{ cart }] = useCart();
  const discount = Math.round(
    (100 * (product.price - product.offPrice)) / product.price
  );

  return (
    <div className="product">
      {checkInCart(cart, product) ? (
        <Link className="continueBtn" to="/cart">
          Continue ordering
        </Link>
      ) : (
        <span onClick={() => addProductHandler(product)} className="addToCard">
          Add To Cart
        </span>
      )}

      <div className="imgBox">
        <img alt="product" src={product.image} />
      </div>
      {discount > 0 && <span className="discount">{discount}% off</span>}
      <div className="details">
        <h3>{product.name}</h3>
        <div className="price">
          <div>
            <span className={discount > 0 ? "notThisPrice" : ""}>
              ${product.price}
            </span>
            {discount > 0 && (
              <span className="offPrice">${product.offPrice}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
