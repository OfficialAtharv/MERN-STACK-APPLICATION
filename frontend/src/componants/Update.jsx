import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const getSingleUser = async () => {
    const response = await fetch(`http://localhost:5000/${id}`);
    const result = await response.json();
    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    } else {
      setError("");
      console.log("update user", result);
      setName(result.name);
      setEmail(result.email);
      setAge(result.age);
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatesUser = { name, age, email };
    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updatesUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorResult = await response.json();
        setError(errorResult.error);
        console.log("Error:", errorResult.error);
      } else {
        const result = await response.json();
        console.log("Success:", result);
        setError("");
        navigate("/all");
      }
    } catch (error) {
      console.error("There has been a problem with your fetch operation:", error);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="container my-2">
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className="text-center">Edit The Data</h2>
      <form onSubmit={handleUpdate} className="mx-auto" style={{ maxWidth: '600px' }}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Update;
