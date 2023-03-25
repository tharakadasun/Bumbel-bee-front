import React, { useEffect } from "react";

function Home() {
  useEffect(() => {
    // window.location.reload();
  }, []);
  return (
    <div className="container-md py-4">
      <div className="row row-cols-1 row-cols-md-4 g-4">
        <div className="col">
          <div className="card h-100">
            <img src="https://static-01.daraz.lk/p/31191404dc06cd37d4adbc9871a9f612.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <img src="https://static-01.daraz.lk/p/31191404dc06cd37d4adbc9871a9f612.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">This is a short card.</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <img src="https://static-01.daraz.lk/p/31191404dc06cd37d4adbc9871a9f612.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content.
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <img src="https://static-01.daraz.lk/p/31191404dc06cd37d4adbc9871a9f612.jpg" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
