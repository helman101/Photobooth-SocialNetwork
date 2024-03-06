import { Outlet, Navigate } from "react-router-dom"

const AuthLayout = () => {
  const isAuthenticated = false

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <section className="container d-flex align-items-center justify-content-center">
          <Outlet />
        </section>
      )}
    </>
  )
}

export default AuthLayout
