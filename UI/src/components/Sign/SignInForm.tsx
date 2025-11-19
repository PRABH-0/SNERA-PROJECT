import React from "react";

type Props = {
  loginData: { email: string; password: string };
  onLoginChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLoginSubmit: (e: React.FormEvent) => Promise<void> | void;
  switchToRegister: () => void;
  error?: string
};

const SignInForm: React.FC<Props> = ({ loginData, onLoginChange, onLoginSubmit, switchToRegister, error }) => {
  return (
    <>
      <h1 className="text-[var(--text-primary)] text-3xl font-bold mb-6 text-center">
        Welcome Back
      </h1>

      <form onSubmit={onLoginSubmit}>
        <h4 className="text-[var(--text-primary)] text-sm mt-6 font-medium">
          Email Address
        </h4>
        <input
          name="email"
          value={loginData.email}
          onChange={onLoginChange}
          className={`border w-full p-2 rounded-lg my-1 mb-4 border-[var(--border-line)] placeholder:text-[var(--text-tertiary)]  bg-[var(--input-bg)]  focus:border-[var(--border-color)] ${error ? "border-red-500" : ""}`}
          placeholder="Email"
          type="email"
          required
        />

        <h4 className="text-[var(--text-primary)] my-1 text-sm font-medium">
          Password
        </h4>
        <input
          name="password"
          value={loginData.password}
          onChange={onLoginChange}
          className={`border w-full p-2 mb-4 rounded-lg border-[var(--border-line)] placeholder:text-[var(--text-tertiary)]  bg-[var(--input-bg)]  focus:border-[var(--border-color)] ${error ? "border-red-500" : ""} `}
          placeholder="Password"
          type="password"
          required
        />
        {error && (
          <p className="text-red-500 text-sm mt-3 bg-red-100 border-l-4 border-red-500 p-2 rounded">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="text-[var(--button-text)] w-full p-3 mt-8 rounded-lg bg-[var(--accent-color)] cursor-pointer transition-all duration-300 ease-in-out hover:bg-[var(--accent-hover)] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_var(--shadow-color)]"
        >
          Sign In
        </button>
      </form>

      <div className="border-t border-[var(--border-color)] mt-10">
        <div className="text-[var(--text-secondary)] text-center">
          Don’t have an account?{" "}
          <button
            onClick={switchToRegister}
            className="mt-6 underline text-[var(--accent-color)] font-bold cursor-pointer"
          >
            Sign up here
          </button>
        </div>
      </div>
    </>
  );
};

export default SignInForm;
