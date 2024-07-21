import { ChangeEvent, useState } from "react";
import styles from "./StayEditPrice.module.scss";
import { CurrencyType } from "@/model/currency.type";
import { ScrollBySVG } from "@/components/svgs/svgs";

interface Props {
  price: number;
  handleChange: (ev: ChangeEvent) => void;
  serviceFee: number;
  currency: CurrencyType;
}
export default function StayEditPrice({
  price,
  handleChange,
  serviceFee,
  currency,
}: Props) {
  const [extendPrice, setExtendPrice] = useState(false);
  const totalPrice = (price + price * serviceFee).toFixed(0);
  return (
    <section className={styles.editPrice}>
      <div className={styles.editPriceHeader}>
        <h1>Now, set your price</h1>
        <p>You can change it anytime.</p>
      </div>
      <div className={styles.editPriceDetails}>
        <div className={styles.editPriceInput}>
          <span>{currency}</span>
          <input
            style={{ width: price.toString().length * 44 + "px" }}
            type="number"
            placeholder="162"
            name="price"
            value={price}
            onChange={handleChange}
          />
        </div>
        {extendPrice && (
          <div className={styles.extendPrice}>
            <div className={styles.extendPriceDetails}>
              <span>
                <h4>Base price</h4>
                <h4>
                  {currency}
                  {price}
                </h4>
              </span>
              <span>
                <h4>Guest service fee</h4>
                <h4>
                  {currency}
                  {(price * serviceFee).toFixed(0)}
                </h4>
              </span>
              <span>
                <h3>Guest price</h3>
                <h3>
                  {currency}
                  {totalPrice}
                </h3>
              </span>
            </div>
            <div className={styles.stayEarn}>
              <h4>You earn</h4>
              <h4>
                {currency}
                {(price - price * 0.03).toFixed(0)}
              </h4>
            </div>
          </div>
        )}
        <button
          className={`${styles.extendPriceBtn} ${extendPrice && styles.active}`}
          onClick={() => setExtendPrice(!extendPrice)}
        >
          <h2>
            {extendPrice ? "Show less" : `Guest price ${currency}${totalPrice}`}
          </h2>
          <ScrollBySVG />
        </button>
      </div>
    </section>
  );
}
