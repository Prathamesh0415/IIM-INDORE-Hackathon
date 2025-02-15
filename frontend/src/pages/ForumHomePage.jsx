import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import Loading from "../components/Forum/loading";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import Add from "../components/Forum/AddIcon";

export default function ForumHomePage() {
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleConfirm = async (id) => {
      await axios.delete(`http://localhost:3000/krishi/forum/deletepost/${id}`)
      .then(() => {
        console.log('deleted successfully')
        setIsOpen(false)
      })
      .catch(error => {
        console.log(error)
      })
  };

  async function fetchPostData() {
    setLoading(true);
    setPostData([]);
    const response = await fetch(`http://localhost:3000/krishi/forum/`);
    const data = await response.json();

    if (data) {
      setLoading(false);
      setPostData(data);
    }
  }

  useEffect(() => {
    fetchPostData();
  }, [isOpen]);

  return (
    <div className="w-full p-12 flex flex-row flex-wrap  gap-5">
      {loading ? (
        <Loading />
      ) : postData && postData.length ? (
        postData.map((item) => {
          return (
            <div className="flex flex-col w-[31%] border rounded-md border-black p-5">
              <span className="font-bold">{item.title}</span>
              {/*<span className="font-semibold">{item.author}</span>*/}
              <span className="font-normal h-1/3">{item.description}</span>
              <div className="flex flex-col justify-items-end gap-3">
                <Link to={`/forum/${item._id}`}>
                  <Button variant="contained" color="success">
                    Learn More
                  </Button>
                </Link>
                <Link>
                  <Button
                    onClick={openModal}
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                  {isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                        <h2 className="text-lg font-bold text-gray-800">
                          Confirm Deletion
                        </h2>
                        <p className="text-gray-600 mt-2">
                          Are you sure you want to delete this item? This action
                          cannot be undone.
                        </p>
                        <div className="flex justify-end mt-4 space-x-2">
                          <button
                            onClick={closeModal}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleConfirm(item._id)}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </Link>
                <Link to={`/forum/updatepost/${item._id}`}>
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<UpdateIcon />}
                  >
                    Update
                  </Button>
                </Link>
              </div>
            </div>
          );
        })
      ) : null}
      <Link
        to={"/forum/createpost"}
        className="flex-col content-center w-[33%] items-center justify-items-center"
      >
        <Add />
      </Link>
    </div>
  );
}
