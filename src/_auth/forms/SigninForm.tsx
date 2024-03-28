import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "react-bootstrap"
import { useForm } from "react-hook-form";
import { SigninValidation, SigninValidationType } from "../../lib/validation";
import { Loader } from "../../components/shared/Loader";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSignInAccount } from "../../lib/react-query/queriesAndMutations";
import { useUserContext } from "../../context/AuthContext";

const SigninForm = () => {
  const history = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();

  const { mutateAsync: signInAccount } = useSignInAccount();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<SigninValidationType>({
    resolver: yupResolver(SigninValidation)
  });

  const onSubmit = async (data: SigninValidationType) => {
    const session = await signInAccount({
      email: data.email,
      password: data.password
    })

    if (!session) {
      return
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      reset()
      history('/')
    } else {
      toast.error('Sign up failed, please try again.')
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center flex-column">
      <h2 className="h3">Log in to your account</h2>
      <p><small>Welcome back! Please enter your details</small></p>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex flex-column w-100 mt-4 gap-2"
      >
        <Form.Group>
          <Form.Label className="h6">Email</Form.Label>
          <Form.Control type="email" { ...register('email') } />
          {errors.email && (
            <Form.Text className="text-danger text-opacity-75">{errors.email.message}</Form.Text>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label className="h6">Password</Form.Label>
          <Form.Control type="password" { ...register('password') } />
          {errors.password && (
            <Form.Text className="text-danger text-opacity-75">{errors.password.message}</Form.Text>
          )}
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-2">
          { isUserLoading ? (
            <Loader variant="white" />
          ) : 'Sign in'}
        </Button>
        <p>
          <small className="text-center d-block mt-2">
            Don't have an account?
            <Link to="/sign-up" className="text-primary text-bold ms-1 text-decoration-none">
              Sign up
            </Link>
          </small>
        </p>
      </Form>
    </div>
  )
}

export default SigninForm
