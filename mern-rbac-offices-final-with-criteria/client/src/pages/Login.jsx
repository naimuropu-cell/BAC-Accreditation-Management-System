// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext.jsx'

// export default function Login() {
//   const [username, setUsername] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState(null)
//   const navigate = useNavigate()
//   const { api, login } = useAuth()

//   const demo = [
//     { label: 'Admin', u: 'Admin', p: 'Admin' },
//     { label: 'Register office', u: 'Register office', p: 'Register office' },
//     { label: 'POE', u: 'POE', p: 'POE' },
//     { label: 'Logistic office', u: 'Logistic office', p: 'Logistic office' },
//     { label: 'Sexuall HC committe', u: 'Sexuall HC committe', p: 'Sexuall HC committe' },
//     { label: 'Exam controler office', u: 'Exam controler office', p: 'Exam controler office' },
//     { label: 'IT office', u: 'IT office', p: 'IT office' },
//     { label: 'Admission office', u: 'Admission office', p: 'Admission office' },
//     { label: 'Finance office', u: 'Finance office', p: 'Finance office' },
//     { label: 'CR IT', u: 'CR IT', p: 'CR IT' },
//     { label: 'Proctorial office', u: 'Proctorial office', p: 'Proctorial office' },
//     { label: 'IQAC', u: 'IQAC', p: 'IQAC' },
//     { label: 'GCiA', u: 'GCiA', p: 'GCiA' },
//     { label: 'CCD', u: 'CCD', p: 'CCD' },
//     { label: 'CLCS', u: 'CLCS', p: 'CLCS' },
//     { label: 'Students affairs', u: 'Students affairs', p: 'Students affairs' },
//   ]

//   async function onSubmit(e) {
//     e.preventDefault()
//     setError(null)
//     try {
//       const { data } = await api.post('/api/auth/login', { username, password })
//       login(data)
//       navigate('/standards')
//     } catch (err) {
//       setError(err?.response?.data?.error || 'Login failed')
//     }
//   }

//   return (
//     <div className="max-w-md mx-auto">
//       <div className="card bg-base-100 shadow-xl">
//         <div className="card-body">
//           <h2 className="card-title">Login</h2>

//           <form onSubmit={onSubmit} className="space-y-3">
//             <input className="input input-bordered w-full" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
//             <input className="input input-bordered w-full" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
//             {error && <div className="text-red-600">{error}</div>}
//             <div className="flex gap-2">
//               <button className="btn btn-primary" type="submit">Login</button>
//               <button type="button" className="btn" onClick={() => { setUsername(''); setPassword('') }}>Clear</button>
//             </div>
//           </form>

//           <div className="mt-4 grid grid-cols-2 gap-2">
//             {demo.map(d => (
//               <button key={d.label} className="btn btn-sm w-full" onClick={() => { setUsername(d.u); setPassword(d.p); }}>{d.label}</button>
//             ))}
//           </div>

//         </div>
//       </div>
//     </div>
//   )
// }


import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const { api, login } = useAuth()

  const demo = [
    { label: 'Admin', u: 'Admin', p: 'Admin' },
    { label: 'Register office', u: 'Register office', p: 'Register office' },
    { label: 'POE', u: 'POE', p: 'POE' },
    { label: 'Logistic office', u: 'Logistic office', p: 'Logistic office' },
    { label: 'Sexuall HC committe', u: 'Sexuall HC committe', p: 'Sexuall HC committe' },
    { label: 'Exam controler office', u: 'Exam controler office', p: 'Exam controler office' },
    { label: 'IT office', u: 'IT office', p: 'IT office' },
    { label: 'Admission office', u: 'Admission office', p: 'Admission office' },
    { label: 'Finance office', u: 'Finance office', p: 'Finance office' },
    { label: 'CR IT', u: 'CR IT', p: 'CR IT' },
    { label: 'Proctorial office', u: 'Proctorial office', p: 'Proctorial office' },
    { label: 'IQAC', u: 'IQAC', p: 'IQAC' },
    { label: 'GCiA', u: 'GCiA', p: 'GCiA' },
    { label: 'CCD', u: 'CCD', p: 'CCD' },
    { label: 'CLCS', u: 'CLCS', p: 'CLCS' },
    { label: 'Students affairs', u: 'Students affairs', p: 'Students affairs' },
  ]

  async function onSubmit(e) {
    e.preventDefault()
    setError(null)
    try {
      const { data } = await api.post('/api/auth/login', { username, password })
      login(data)
      navigate('/standards') // or redirect based on role if needed
    } catch (err) {
      setError(err?.response?.data?.error || 'Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Login</h2>

          <form onSubmit={onSubmit} className="space-y-3">
            <input
              className="input input-bordered w-full"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <input
              className="input input-bordered w-full"
              placeholder="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {error && <div className="alert alert-error">{error}</div>}

            <div className="flex gap-2">
              <button className="bg-green-600 text-white p-2 rounded-md w-full">Login</button>
              <button
                type="button"
                className="bg-gray-300 text-black p-2 rounded-md w-full"
                onClick={() => { setUsername(''); setPassword('') }}
              >
                Clear
              </button>
            </div>
          </form>

          <div className="divider">Demo Users</div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {demo.map(d => (
              <button
                key={d.label}
                className="btn btn-sm w-full hover:bg-green-600 hover:text-white"
                onClick={() => { setUsername(d.u); setPassword(d.p); }}
              >
                {d.label}: {d.u} / {d.p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

