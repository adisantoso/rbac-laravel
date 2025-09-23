import { useForm } from '@inertiajs/react'
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
      <h2 className="text-xl text-semibold mb-4 text-center">SIGN IN</h2>
      <form onSubmit={submit}>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={(e) => setData('email', e.target.value)}
          placeholder="Email"
          className="border p-2 w-full mb-3"
        />

        <input
          type="password"
          name="password"
          value={data.password}
          onChange={(e) => setData('password', e.target.value)}
          placeholder="Password"
          className="border p-2 w-full mb-3"
        />

        {errors.message && (
          <div className="text-red-500 text-sm text-center py-2">{errors.message}</div>
        )}

        <button
          type="submit"
          className="bg-gray-700 text-white px-4 py-2 w-full cursor-pointer"
          disabled={processing}
        >
          {processing ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

Login.layout = (page) => <AuthLayout>{page}</AuthLayout>
