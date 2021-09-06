import Link from "next/dist/client/link";
import RedditLogo from "../images/reddit.svg";
import { useAuthState, useAuthDispatch } from "../context/auth";
import { Fragment, useEffect, useState } from "react";
import Axios from "axios";
import { Sub } from "../types";
import Image from "next/image";
import { useRouter } from "next/router";

const Navbar: React.FC = () => {
  const [name, setName] = useState("");
  const [subs, setSubs] = useState<Sub[]>([]);
  const [timer, setTimer] = useState(null);
  const { authenticated, loading } = useAuthState();
  const dispatch = useAuthDispatch();
  const router = useRouter();

  const logout = () => {
    Axios.get("/auth/logout")
      .then(() => {
        dispatch("LOGOUT");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (name.trim() === "") {
      setSubs([]);
      return;
    }
    searchSubs();
  }, [name]);

  const searchSubs = async () => {
    clearTimeout(timer);
    setTimer(
      setTimeout(async () => {
        try {
          const { data } = await Axios.get(`/subs/search/${name}`);
          setSubs(data);
          console.log(data);
        } catch (err) {
          console.log(err);
        }
      }, 250)
    );
  };

  const goToSub = (subName: string) => {
    router.push(`/r/${subName}`);
    setName("");
  };
  return (
    <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-between h-12 bg-white px-5">
      {/*Logo and title */}
      <div className="flex items-center">
        <Link href="/">
          <a>
            <RedditLogo className="w-8 h-8 mr-2" />
          </a>
        </Link>
        <span className="text-2xl font-semibold hidden lg:block">
          <Link href="/">readit</Link>
        </span>
      </div>
      {/*Search Input */}
      <div className="px-4 w-160 max-w-full">
        <div className="relative flex bg-gray-100 items-center border rounded hover:border-blue-500 hover:bg-white">
          <i className="fas fa-search text-gray-500 pl-4 pr-3"></i>
          <input
            type="text"
            className="py-1 pr-3 bg-transparent rounded focus:outline-none"
            placeholder="Search"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div
            className="absolute left-0 right-0 bg-white"
            style={{ top: "100%" }}
          >
            {subs?.map((sub) => (
              <div
                className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-200"
                onClick={() => goToSub(sub.name)}
              >
                <Image
                  src={sub.imageUrl}
                  className="rounded-full"
                  alt="Sub"
                  height={(8 * 16) / 4}
                  width={(8 * 16) / 4}
                />
                <div className="text-sm ml-4">
                  <p className="font-medium">{sub.name}</p>
                  <p className="text-gray-600">{sub.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/*Auth buttons */}
      <div className="flex">
        {!loading &&
          (authenticated ? (
            // Show logout
            <button
              className="hidden sm:block lg:w-32 w-20 py-1 mr-4 hollow blue button leading-5"
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <Fragment>
              <Link href="/login">
                <a className="hidden sm:block lg:w-32 w-20 py-1 mr-4 hollow blue button leading-5">
                  log in
                </a>
              </Link>
              <Link href="/register">
                <a className="hidden sm:block lg:w-32 w-20 py-1 blue button leading-5">Sign up</a>
              </Link>
            </Fragment>
          ))}
      </div>
    </div>
  );
};

export default Navbar;
