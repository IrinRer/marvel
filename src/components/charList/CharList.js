import { CSSTransition } from "react-transition-group";
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./charList.scss";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";

const CharList = (props) => {
  const [char, setCharList] = useState([]);
  const [newItemLoad, setNewItemLoad] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);
  const [animation, setAnimation] = useState(false);

  const { loading, error, getAllCharacters } = MarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onUpdateChars = (newChar) => {
    let end = false;
    if (newChar.length < 9) {
      end = true;
    }
    setCharList((char) => [...char, ...newChar]);
    setNewItemLoad(false);
    setOffset((offset) => offset + 9);
    setCharEnded(end);
    setAnimation(false);

    if (document.documentElement.scrollTop > 300) {
      window.scrollBy(0, 1000);
    }
  };

  const onRequest = (offset, init) => {
    if (!offset) {
      setCharList([]);
      setOffset(210);
    }
    init ? setNewItemLoad(true) : setNewItemLoad(false);
    getAllCharacters(offset).then(onUpdateChars);
    setAnimation(true);
  };

  const itemRefs = useRef([]);

  const onFocused = (id) => {
    itemRefs.current.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    itemRefs.current[id].classList.add("char__item_selected");
    itemRefs.current[id].focus();
  };

  function onRender(arr) {
    let img = "";
    const items = arr.map((item, i) => {
      if (item.thumbnail.includes("image_not_available")) {
        img = (
          <img
            src={item.thumbnail}
            alt="abyss"
            style={{
              objectFit: "contain",
              transform: "translate(-15px, -30px)",
            }}
          />
        );
      } else {
        img = <img src={item.thumbnail} alt="abyss" />;
      }

      return (
        <CSSTransition timeout={1000} classNames="animation" in={animation}>
          <li
            className="char__item"
            key={item.id}
            ref={(el) => (itemRefs.current[i] = el)}
            onClick={() => {
              props.onCharSet(item.id);
              onFocused(i);
            }}
            id={item.id}
            onKeyPress={(e) => {
              if (e.key === " " || e.key === "Enter") {
                props.onCharSet(item.id);
                onFocused(i);
              }
            }}
          >
            {img}
            <div className="char__name">{item.name}</div>
          </li>
        </CSSTransition>
      );
    });

    return items;
  }
  const items = onRender(char);
  const fail = error ? <Error /> : null;
  const load = loading && !newItemLoad ? <Spinner /> : null;
  return (
    <div className="char__list">
      <ul className="char__grid">
        {fail}
        {load}
        {items}
      </ul>
      <button
        className="button button__main button__long"
        disabled={newItemLoad}
        onClick={() => {
          onRequest(offset, true);
          setAnimation(true);
        }}
        style={{ display: charEnded ? "none" : "block" }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onCharSet: PropTypes.func.isRequired,
};

export default CharList;
