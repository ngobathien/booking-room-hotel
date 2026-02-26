import { Link, useLocation } from "react-router-dom";
import { routes } from "../../common/routes/routes";

const Breadcrumb = ({ dynamicLabel }: { dynamicLabel?: string }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  let currentPath = "";

  const crumbs = pathnames.map((segment, index) => {
    currentPath += `/${segment}`;

    const route = routes.find(
      (r) => r.path === currentPath || r.path.includes(`:${segment}`),
    );

    let label = route?.label || segment;

    // Override label cho route động
    if (route?.path.includes(":") && dynamicLabel) {
      label = dynamicLabel;
    }

    return {
      label,
      to: currentPath,
      isLast: index === pathnames.length - 1,
    };
  });

  return (
    <nav className="breadcrumb">
      <Link to="/">Home</Link>

      {crumbs.map((c, i) => (
        <span key={i}>
          {" / "}
          {c.isLast ? <span>{c.label}</span> : <Link to={c.to}>{c.label}</Link>}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
