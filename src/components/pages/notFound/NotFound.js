import { Link } from "react-router-dom";
import Error from "../../error/Error";
import classes from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <>
      <Error />
      <p className={classes.notFound}>The page does not exist</p>
      <Link to="/" className={classes.notFound}>
        Back to main page
      </Link>
    </>
  );
};

export default NotFound;
