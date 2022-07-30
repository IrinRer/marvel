import "./singleComic.scss";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import MarvelService from "../../../services/MarvelService";
import Error from "../../error/Error";
import Spinner from "../../spinner/Spinner";

const SingleComicPage = () => {
  const { id } = useParams();
  const [comic, setComic] = useState(null);

  const { loading, error, getComic } = MarvelService();

  useEffect(() => {
    updateComic();
  }, [id]);

  const onComicLoaded = (comic) => {
    setComic(comic);
  };

  const updateComic = () => {
    getComic(id).then(onComicLoaded);
  };

  const errorMessage = error ? <Error /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

const View = ({ comic }) => {
  const { title, prices, thumbnail, desc, pageCount, language } = comic;
  return (
    <div className="single-comic">
      <img src={thumbnail} alt={`title`} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{desc}</p>
        <p className="single-comic__descr">{`${pageCount} pages`}</p>
        <p className="single-comic__descr">{`Language: ${language}`}</p>
        <div className="single-comic__price">{prices}</div>
      </div>
      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleComicPage;
