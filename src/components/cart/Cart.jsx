import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SmallCard from "../card/SmallCard";

function Cart() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  console.log(items);
  return (
    <>
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Cart Items
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          {items ? (
            <>
              {items.map((item, index) => {
                return <div key={index}><SmallCard {...item}/></div>;
              })}
            </>
          ) : (
            <></>
          )}
          <div className="d-flex flex-row">
              <button type="button" className="btn btn-primary flex-fill" data-mdb-ripple-color="dark">
                Place Order
              </button>
            </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
