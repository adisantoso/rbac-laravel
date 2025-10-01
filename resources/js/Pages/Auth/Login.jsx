import { Link, useForm } from '@inertiajs/react'
import AuthLayout from '../../Layouts/AuthLayout';

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
    password: '',
  })

  const submit = (e) => {
    e.preventDefault()
    post('/login')
  }

  return (
    <div>
      <h2 className="text-xl text-bold mb-4 text-center">SIGN IN</h2>
      <form onSubmit={submit}>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={(e) => setData('email', e.target.value)}
          placeholder="Email"
          className="border p-2 w-full mb-3 rounded-xl" required
        />

        <input
          type="password"
          name="password"
          value={data.password}
          onChange={(e) => setData('password', e.target.value)}
          placeholder="Password"
          className="border p-2 mb-2 w-full rounded-xl" required
        />



        {errors.message && (
          <div className="text-red-500 text-sm text-center py-2">{errors.message}</div>
        )}

        <button
          type="submit"
          className="bg-yellow-700 text-white px-4 py-2 w-full cursor-pointer rounded-xl hover:bg-gray-800 disabled:opacity-50"
          disabled={processing}
        >
          {processing ? 'Loading...' : 'Login'}
        </button>
          <div className="text-sm p-2 text-center mt-5">
          Forgot Password ? 
          <Link href="/forgot-password" className="text-blue-500 hover:underline">Reset here.</Link>
        </div>
      </form>
    </div>
  )
}

Login.layout = (page) => <AuthLayout>{page}</AuthLayout>
