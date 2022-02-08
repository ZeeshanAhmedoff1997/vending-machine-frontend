import React from "react";
import { Link } from "components/common/Link";
import { useSelector } from "react-redux";
import { isSignedIn } from "utils/alert";
import { logout } from "services/auth";
import { useRouter } from "next/router";
import { useAppDispatch } from "redux/hooks";
import { removeUser } from "redux/userSlice";
import { toast } from "react-toastify";

const Header = () => {
  const { user } = useSelector((state) => state.user);
  const router = useRouter();
  const appDispatch = useAppDispatch();

  const Logout = async () => {
    try {
      await logout();
      router.push("/auth/login");
      appDispatch(removeUser());
      toast.success("Successfully log out !");
    } catch (err) {}
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light header">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          Vending Machine
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            {isSignedIn(user) && (
              <>
                <li className="nav-item c-nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    href="/"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item c-nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    href={`/user/${user.id}`}
                  >
                    Account
                  </Link>
                </li>
                <li className="nav-item c-nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    href="/"
                  >
                    Product
                  </Link>
                </li>
                <li className="nav-item c-nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    onClick={Logout}
                    href=""
                  >
                    Logout
                  </Link>
                </li>
              </>
            )}
            {!isSignedIn(user) && (
              <>
                <li className="nav-item c-nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    href="/auth/login"
                  >
                    Sign In
                  </Link>
                </li>
                <li className="nav-item c-nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    href="/auth/register"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
