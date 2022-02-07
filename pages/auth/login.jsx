import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useAppDispatch } from "redux/hooks";
import { Link } from "components/common/Link";
import { Layout } from "components/account";
import { signin } from "services/auth";
import { addUser } from "redux/userSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { isAlreadyLogin } from "utils/alert";

const Login = () => {
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const { user } = useSelector((state) => state.user);
  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async ({ email, password }) => {
    try {
      const { data } = await signin({ email, password });
      appDispatch(addUser(data));
      toast.success("You are succesffuly Log In");
      router.push("/");
    } catch (err) {
      console.log("err", err.response);
      if (err.response?.data?.errors.full_messages) {
        toast.error(err.response?.data?.errors?.full_messages);
      } else {
        toast.error(err.response?.data?.errors[0]);
      }
    }
  };

  useEffect(() => {
    if (isAlreadyLogin(user)) {
      router.push("/");
    }
  }, [router, user]);

  return (
    <Layout>
      <div className="card">
        <h4 className="card-header">Login</h4>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group mt-2">
              <label>Email</label>
              <input
                name="email"
                type="text"
                {...register("email")}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
              />
              <div className="invalid-feedback">{errors.email?.message}</div>
            </div>
            <div className="form-group mt-2">
              <label>Password</label>
              <input
                name="password"
                type="password"
                {...register("password")}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
            <button
              disabled={formState.isSubmitting}
              className="btn btn-primary mt-2"
            >
              {formState.isSubmitting && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
              Login
            </button>
            <Link href="/auth/register" className="btn btn-link">
              Register
            </Link>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
