import Header from "components/common/Header";

function Layout({ children, col = 4, offst = 4 }) {
  return (
    <>
      <Header />
      <div className="container">
        <div className={`col-md-${col} offset-md-${offst} mt-5`}>
          {children}
        </div>
      </div>
    </>
  );
}
export { Layout };
