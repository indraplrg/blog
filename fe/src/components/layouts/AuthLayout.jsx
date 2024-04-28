import { Link } from "react-router-dom";

const AuthLayout = (props) => {
  return (
    <div className="bg-customColor-primary min-h-dvh flex justify-center items-center">
      <div className="rounded-md shadow-md py-3 px-4">
        <div className="mb-2">
          <h1 className="text-slate-700 font-semibold text-center text-2xl">
            Login
          </h1>
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Username"
            className="py-1 px-2 bg-transparent border-b-2 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="py-1 px-2 bg-transparent border-b-2 outline-none"
          />
        </div>
        <div>
          <p className="text-xs mt-3">
            you don't have an account?{" "}
            <Link to="/register" className="text-customColor-secondary">
              register
            </Link>
          </p>
          <button
            type="submit"
            className="w-full bg-customColor-ternary text-white rounded-sm mt-1 py-1"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
