import React, { useState, useEffect } from 'react';

export default function Read() {

  const [data, setData] = useState([]);  
  const [error, setError] = useState("");  
  const [loading, setLoading] = useState(true);  // Loading state
  const [success, setSuccess] = useState("");  // Success state

  // Fetch data from the backend
  async function getdata() {
    try {
      const response = await fetch("https://mern-app-gedp.onrender.com");

      const result = await response.json();  

      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
        setLoading(false);  // Set loading to false after the fetch attempt
      }

      if (response.ok) {
        setData(result);
        setLoading(false);  // Set loading to false after data is fetched
      }
    } catch (error) {
      // Handle any fetch errors (network errors, etc.)
      console.error('Fetch error:', error);
      setError("Failed to fetch data");
      setLoading(false);  // Set loading to false after error
    }
  }

  // Handle delete operation
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
      }

      if (response.ok) {
        setSuccess("Deleted successfully");

        // Refresh data after successful delete
        setTimeout(() => {
          setSuccess("");
          getdata();
        }, 1000);
      }
    } catch (error) {
      console.error('Error during deletion:', error);
      setError("Failed to delete the data");
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className="container my-2">
      <h2 className="text-center">All Data</h2>

      {loading ? (
        <div>Loading...</div>  // Display loading message while data is being fetched
      ) : (
        <div className="row">
          {data?.map((ele) => (
            <div key={ele._id} className="col-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{ele.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                  <p className="text-muted">{ele.age}</p>
                  <a href="#" className="card-link" onClick={() => handleDelete(ele._id)}>Delete</a>
                  <a href="#" className="card-link">Edit</a>  {/* Edit functionality to be added */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Display success or error message */}
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
    </div>
  );
}
