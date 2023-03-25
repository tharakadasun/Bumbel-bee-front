import React from "react";

function SmallCard(props) {
  return (
    <div>
      <div class="card mb-3" style={{maxWidth: "540px"}}>
        <div class="row g-0">
          <div class="col-md-4">
            <img src={props.imageURL} class="img-fluid rounded-start" alt="..." />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{props.productName}</h5>
              <p class="card-text">
                {props.perUnitPrice}
              </p>
              <p class="card-text">
                <small class="text-body-secondary">
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SmallCard;
