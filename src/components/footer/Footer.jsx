import React from "react";

function Footer() {
  return (
    <>
      <section className="">
        <footer
          className="text-center text-white"
          style={{ backgroundColor: "rgb(44 109 168)" }}
        >
          <div className="container p-4 pb-0">
            <section className="">
              <p className="d-flex justify-content-center align-items-center">
                <span className="me-3">Register for free</span>
                <a href="/sign-up" type="button" className="btn btn-outline-light btn-rounded">
                  Sign up!
                </a>
              </p>
            </section>
          </div>
          <div
            className="text-center p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            © 2023 Copyright:
            <a className="text-white" href="#">
              SSR
            </a>
          </div>
        </footer>
      </section>
    </>
  );
}

export default Footer;
