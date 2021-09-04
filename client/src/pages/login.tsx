import Head from "next/head";
import Link from "next/link";
import { FormEvent, useState } from "react";
import Axios from "axios";
import InputGroup from "../components/InputGroup";
import { useRouter } from "next/dist/client/router";
import { useAuthDispatch, useAuthState } from "../context/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>("");

  const dispatch = useAuthDispatch();
  const { authenticated } = useAuthState()

  const router = useRouter();

  if(authenticated) router.push('/')

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const res = await Axios.post("/auth/login", {
        password,
        username,
      });

      dispatch("LOGIN",res.data );

      router.back();
    } catch (err) {
      setErrors(err.response.data);
    }
  };
  return (
    <div className="flex bg-white">
      <Head>
        <title>Login</title>
      </Head>

      <div
        className="w-36 h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/images/bricks.jpg')" }}
      ></div>
      <div className="flex flex-col justify-center pl-6">
        <div className="w-70">
          <h1 className="text-lg mb-2 font-medium">Login</h1>
          <p className="mb-10 text-xs">
            By continuing, you agree to our User Agreement and Privacy Policy
          </p>

          <form onSubmit={submitForm}>
            <InputGroup
              className="mb-2"
              value={username}
              setValue={setUsername}
              placeholder="Username"
              error={errors.username}
              type="text"
            />
            <InputGroup
              className="mb-4"
              value={password}
              setValue={setPassword}
              placeholder="Password"
              error={errors.password}
              type="password"
            />
            <button className="w-full rounded py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border border-blue-500">
              Login
            </button>
          </form>
          <small>
            New to Readit?
            <Link href="/register">
              <a className="ml-1 text-blue-500 uppercase">Sign up</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
