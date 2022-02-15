import "./comicsList.scss";
import { useRef, useState, useEffect } from "react";
import MarvelService from "../../services/MarvelService";
import Error from "../error/Error";
import Spinner from "../spinner/Spinner";

const ComicsList = () => {
  const [comics, setComics] = useState([]);
  const [newItemLoad, setNewItemLoad] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);

  const { loading, error, getAllComics } = MarvelService();

  useEffect(() => {
    onRequest(offset, true); 
  }, []);

  const onUpdateChars = (newComics) => {
    let end = false;
    if (newComics.length < 8) {
      end = true;
    }
    setComics((comics) => [...comics, ...newComics]);
    setNewItemLoad(false);
    setOffset((offset) => offset + 8);
    setCharEnded(end);
  };

  const onRequest = (offset, init) => {
    if (!offset) {
      setComics([]);
      setOffset(210);
    }
    init ? setNewItemLoad(true) : setNewItemLoad(false);
    getAllComics(offset).then(onUpdateChars);
  };

 function onRender(arr) {
    const items = arr.map((item, i) => {
        return (
            <li className="comics__item" key={item.id}>
            <a href="#">
              <img src={item.thumbnail} alt={item.title} className="comics__item-img" />
              <div className="comics__item-name">
                {item.title}
              </div>
              <div className="comics__item-price">{`${item.price}$`}</div>
            </a>
          </li>
        )
    })
    return items;
  }
  const items = onRender(comics); 
  const fail = error ? <Error /> : null;
  const load = loading && !newItemLoad ? <Spinner /> : null;

  return (
      
    <div className="comics__list">
      <ul className="comics__grid">
        {fail}
        {load}
        {items}
      </ul>
      <button  disabled={newItemLoad} 
                style={{'display' : charEnded? 'none' : 'block'}}
                className="button button__main button__long"
                onClick={() => onRequest(offset, true)}>
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
