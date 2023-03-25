import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addItem } from "../../redux/cart/cartSlice";

function ItemCard(props) {
  const dispatch = useDispatch();
  const handleAddToCart = () =>{
    toast.success("Add to cart"+" "+ props.productName+" successfully")
    dispatch(addItem({...props}))
  }
  return (
    <>
      <div className="card">
          <img src={props.imageURL}
            className="card-img-top" alt="Laptop" />
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <p className="small"><a href="#!" className="text-muted">{props.category.categoryName}</a></p>
              <p className="small text-danger">{props.brand.brandName}</p>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <h5 className="mb-0">{props.productName}</h5>
              <h5 className="text-dark mb-0">$999</h5>
            </div>
            <div className="d-flex flex-row">
              <button onClick={handleAddToCart} type="button" className="btn btn-primary flex-fill" data-mdb-ripple-color="dark">
                Add To Cart
              </button>
            </div>
          </div>
        </div>
    </>
  );
}

export default ItemCard;
