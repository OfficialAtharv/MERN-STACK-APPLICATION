import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Read = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState();

  async function getData() {
    try {
      const response = await fetch("http://localhost:5000");
      const result = await response.json();
      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
      } else {
        setData(result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    }
  }

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    } else {
      setError("Deleted Successfully!");
      setTimeout(() => {
        setError("");
        getData();
      }, 1000);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container my-2">
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className="text-center">Show all Data</h2>
      <div className="row">
        {data?.map((ele) => (
          <div key={ele._id} className="col-12 col-md-6 col-lg-4 col-xl-3">
            <div className="card mt-4">
              <div className="card-body">
                <h5 className="card-title">Name : {ele.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Email : {ele.email}</h6>
                <h6 className="text-muted">Age : {ele.age}</h6>
                <a href="#" className="card-link" onClick={() => handleDelete(ele._id)}>Delete</a>
              <Link to={`/${ele._id}`} className="card-link">Edit</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Read;
