import Link from "next/dist/client/link";
import RedditLogo from "../images/reddit.svg";
import { useAuthState, useAuthDispatch } from "../context/auth";
import { Fragment } from "react";
import Axios from "axios";

const Navbar: React.FC = () => {
  const { authenticated, loading } = useAuthState();
  const dispatch = useAuthDispatch();

  const logout = () => {
    Axios.get("/auth/logout")
      .then(() => {
        dispatch("LOGOUT");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-center h-12 bg-white px-5">
      {/*Logo and title */}
      <div className="flex items-center">
        <Link href="/">
          <a>
            <RedditLogo className="w-8 h-8 mr-2" />
          </a>
        </Link>
        <span className="text-2xl font-semibold">
          <Link href="/">readit</Link>
        </span>
      </div>
      {/*Search Input */}
      <div className="flex bg-gray-100 items-center mx-auto border rounded hover:border-blue-500 hover:bg-white">
        <i className="fas fa-search text-gray-500 pl-4 pr-3"></i>
        <input
          type="text"
          className="w-160 py-1 pr-3 bg-transparent rounded focus:outline-none"
          placeholder="Search"
        />
      </div>
      {/*Auth buttons */}
      <div className="flex">
        {!loading && (authenticated ? (
          // Show logout
          <button
            className="w-32 py-1 mr-4 hollow blue button leading-5"
            onClick={logout}
          >
            Logout
          </button>
        ) : (
          <Fragment>
            <Link href="/login">
              <a className="w-32 py-1 mr-4 hollow blue button leading-5">
                log in
              </a>
            </Link>
            <Link href="/register">
              <a className="w-32 py-1 blue button leading-5">Sign up</a>
            </Link>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
