import { useState } from "react";
import { useStateContext } from "@/context/state-context";

const Profile = () => {
  const [name, setName] = useState("");
  const { isSignedIn, setIsSignedIn, username, setUsername } =
    useStateContext();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (name.length > 0) {
      setIsSignedIn(true);
      setUsername(name);
    } else {
      alert("Username cannot be empty");
    }
  };
  return (
    <div className="py-20 flex flex-col items-center mx-auto">
      <h1>{isSignedIn ? `Welcome, ${username}` : "Welcome"}</h1>
      <h3>Register for free</h3>

      <input type={"text"} onChange={(e) => setName(e.currentTarget.value)} />
      <button type={"submit"} onClick={(e) => handleSubmit(e)}>
        REGISTER
      </button>
      <button
        onClick={() => {
          setIsSignedIn(false);
          setUsername("");
        }}
      >
        SIGN OUT
      </button>
    </div>
  );
};

export default Profile;
