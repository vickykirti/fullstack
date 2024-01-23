import React, { useState } from "react";
import { useAuth } from "../StateStoreManagement/StateStoreManagement";

export default function Services() {
  const { services } = useAuth();
  const [isService] = useState(true);
  return (
    <section className="section-services">
      <div className="container">
        <h1 className="main-heading">Services</h1>
      </div>

      <div className="container grid grid-four-cols">
        {isService &&
          Array.isArray(services) &&
          services.map((element, i) => {
            const { provider, price, service, description } = element;

            return (
              <div className="card" key={i}>
                <div className="card-img">
                  <img
                    src="../Peripherals.jpg"
                    alt="Peripherals Image"
                    width={200}
                    height={200}
                  />
                </div>
                <div className="card-details">
                  <div className="grid grid-two-cols">
                    <p>{provider}</p>
                    <p>{price}</p>
                  </div>
                  <h2>{service}</h2>
                  <p>{description}</p>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}
