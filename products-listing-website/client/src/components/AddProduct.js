import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(true);
  const navigate = useNavigate();

  const saveDetails = async () => {
    //console.log(name, price, category, company)
    if (!name || !price || !category || !company) {
      setError(false);
    }

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    console.log(userId);
    let result = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log(result);
    navigate("/");
  };
  return (
    <div className="product">
      <h1>Add Product</h1>
      <input
        type="text"
        placeholder="Enter Name"
        className="inputbox"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      {error && !name && (
        <span className="input-errormessage">you must enter the name</span>
      )}
      <input
        type="number"
        placeholder="Enter Price"
        className="inputbox"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      {error && !price && (
        <span className="input-errormessage">you must enter the price</span>
      )}
      <input
        type="text"
        placeholder="Enter Category"
        className="inputbox"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />
      {error && !category && (
        <span className="input-errormessage">you must enter the category</span>
      )}
      <input
        type="text"
        placeholder="Enter Company"
        className="inputbox"
        value={company}
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      />
      {error && !company && (
        <span className="input-errormessage">
          you must enter the company name
        </span>
      )}
      <button className="appButton" onClick={saveDetails}>
        Submit
      </button>
    </div>
  );
};

export default AddProduct;
