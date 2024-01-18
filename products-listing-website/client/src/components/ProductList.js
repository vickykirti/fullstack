import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (e, id) => {
    if (window.confirm("Are you sure you want to delete the record?")) {
      let result = await fetch(`http://localhost:5000/product/${id}`, {
        method: "delete",
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        getProducts();
        alert("Record Deleted!");
      }
      console.log("Thing was saved to the database.");
    }
  };

  const searchHandle = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };
  return (
    <div className="product-list">
      <input
        type="text"
        className="productsearch"
        placeholder="search product ..."
        onChange={searchHandle}
      />
      <ul className="product-list-th">
        <li>#</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Remove</li>
      </ul>
      {products.map((item, index) => (
        <ul key={item._id}>
          <li>{index + 1}</li>
          <li>{item.name}</li>
          <li>{item.price}</li>
          <li>{item.category}</li>
          <li>
            <button onClick={(e) => deleteProduct(e, item._id)}>Delete</button>
            <Link to={`/update/${item._id}`}>Update</Link>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default ProductList;
