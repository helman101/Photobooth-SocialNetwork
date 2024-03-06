import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Form } from "react-bootstrap"
import { useForm } from "react-hook-form";
import { SignupValidation, SignupValidationType } from "../../lib/validation";
import { Loader } from "../../components/shared/Loader";
import { Link } from "react-router-dom";

const SignupForm = () => {
  const isLoading = false

  const { register, handleSubmit, formState: { errors } } = useForm<SignupValidationType>({
    resolver: yupResolver(SignupValidation)
  });

  const onSubmit = async (data: SignupValidationType) => {
    console.log(data)
  };

  return (
    <div className="d-flex align-items-center justify-content-center flex-column">
      <h2 className="h3">Create a new account</h2>
      <p><small>To use Photoboot, please enter your details</small></p>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="d-flex flex-column w-100 mt-4 gap-2"
      >
        <Form.Group>
          <Form.Label className="h6">Name</Form.Label>
          <Form.Control type="text" { ...register('name') } />
          {errors.name && (
            <Form.Text className="text-danger text-opacity-75">{errors.name.message}</Form.Text>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label className="h6">Username</Form.Label>
          <Form.Control type="text" { ...register('username') } />
          {errors.username && (
            <Form.Text className="text-danger text-opacity-75">{errors.username.message}</Form.Text>
          )}
        </Form.Group>
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
          { isLoading ? (
            <Loader variant="white" />
          ) : 'Sign up'}
        </Button>
        <p>
          <small className="text-center d-block mt-2">
            Already have an account?
            <Link to="/sign-in" className="text-primary text-bold ms-1 text-decoration-none">
              Log in
            </Link>
          </small>
        </p>
      </Form>
    </div>
  )
}

export default SignupForm
