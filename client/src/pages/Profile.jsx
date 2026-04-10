import { useSelector, useDispatch } from "react-redux";
import { useRef, useState } from "react";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/user/userSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);

  const { currentUser, loading, error } = useSelector((state) => state.user || {});

  const [formData, setFormData] = useState({});
  const[updateSuccess, setUpdateSuccess] = useState(false);

  if (!currentUser) {
    return <div className="p-3 text-center">Loading...</div>;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());

      const res = await fetch(
        `/api/user/update/${currentUser._id}`,
        {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", 
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        dispatch(updateUserFailure(data.message));
        return;
      }

   
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);

    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Profile
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">

        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />

        <img
          onClick={() => fileRef.current.click()}
          src={currentUser?.avatar || "/default-avatar.png"}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />

        <input
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          id="username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="email"
          defaultValue={currentUser.email}
          id="email"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />

        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>

      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer hover:underline">
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer hover:underline">
          Sign Out
        </span>
      </div>
      {error && <p className="text-red-500 mt-3">{error}</p>}
      {updateSuccess && <p className="text-green-500 mt-3">Profile updated successfully!</p>}
    </div>
  );
}