import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import classNames from "classnames";
import { Link } from "components/common/Link";
import { Layout } from "components/account";
import { signup } from "services/auth";
import { useAppDispatch } from "redux/hooks";
import { addUser } from "redux/userSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { isAlreadyLogin } from "utils/alert";

const Register = () => {
  const router = useRouter();
  const appDispatch = useAppDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAlreadyLogin(user)) {
      router.push("/");
    }
  }, [router, user]);

  const roles = ["seller", "buyer"];
  // form validation rules
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(10, "Password must be at most 10 characters"),
    role: Yup.string().required("Role is required").oneOf(roles),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Password Must Match"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (user) => {
    try {
      const {
        data: { data },
      } = await signup(user);
      appDispatch(addUser(data));
      toast.success("Successfully registered");
      router.push("/");
    } catch (err) {
      console.log("error", err.response.data.errors.full_messages[0]);
      toast.error(err.response.data.errors.full_messages[0]);
    }
  };

  const roleOptions = roles.map((role, key) => (
    <option value={role} key={key}>
      {role}
    </option>
  ));

  const { name, password, confirmPassword, role, email } = errors;

  return (
    <Layout>
      <div className="card">
        <h4 className="card-header">Register</h4>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>Name</label>
              <input
                name="name"
                type="text"
                {...register("name")}
                className={classNames("form-control", { [`is-invalid`]: name })}
              />
              <div className="invalid-feedback">{name?.message}</div>
            </div>
            <div className="form-group mt-2">
              <label>Email</label>
              <input
                name="email"
                type="text"
                {...register("email")}
                className={classNames("form-control", {
                  [`is-invalid`]: email,
                })}
              />
              <div className="invalid-feedback">{email?.message}</div>
            </div>
            <div className="form-group mt-2">
              <label>Password</label>
              <input
                name="password"
                type="password"
                {...register("password")}
                className={classNames("form-control", {
                  [`is-invalid`]: password,
                })}
              />
              <div className="invalid-feedback">{password?.message}</div>
            </div>
            <div className="form-group mt-2">
              <label>Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                className={classNames("form-control", {
                  [`is-invalid`]: confirmPassword,
                })}
              />
              <div className="invalid-feedback">{confirmPassword?.message}</div>
            </div>
            <div className="form-group mt-2">
              <label>Role</label>
              <select
                className="form-select"
                aria-label="Default select example"
                {...register("role")}
              >
                {roleOptions}
              </select>
            </div>
            <div className="invalid-feedback">{role?.message}</div>
            <button
              disabled={formState.isSubmitting}
              className="btn btn-primary mt-2"
            >
              {formState.isSubmitting && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              {formState.isSubmitting ? "Loading ..." : "Register"}
            </button>
            <Link href="/auth/login" className="btn btn-link">
              Login instead?
            </Link>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
