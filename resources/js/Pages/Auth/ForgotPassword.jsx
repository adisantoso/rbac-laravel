import { Link, useForm } from "@inertiajs/react";
import AuthLayout from "../../Layouts/AuthLayout";

export default function ForgotPassword() {
  const { post } = useForm({
    email: '',
  });
  return (
    <div>
      <h2 className="text-xl text-bold mb-4 text-center">RESET PASSWORD</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        // TODO: implement forgot password logic
        post('/forgot-password');
      }}>
        <p className="mb-4 text-gray-600 text-sm">Enter your email and we will send you a link to reset your password.</p>
        <input
          type="email"
          name="email"
          placeholder="type your email"
          className="border p-2 w-full mb-3 rounded-xl" required
        />

        <button
          type="submit"
          className="bg-red-900 text-white px-4 py-2 w-full cursor-pointer rounded-xl hover:bg-gray-800"
        >
          Reset Password
        </button>
      </form>
      <div className="text-sm p-2 text-center mt-5">
        <Link href="/" className="text-blue-500 hover:underline">Back to Login</Link>
      </div>
    </div>
  );
}

ForgotPassword.layout = (page) => <AuthLayout>{page}</AuthLayout>;
