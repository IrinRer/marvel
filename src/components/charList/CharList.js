import React, { Component } from "react";
import PropTypes from "prop-types";
import "./charList.scss";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";

class CharList extends Component {
  state = {
    char: [],
    loading: true,
    error: false,
    newItemLoad: false,
    offset: 210,
    charEnded: false,
  };

  marverlService = new MarvelService();

  myRef = React.createRef();

  componentDidMount() {
    this.onRequest();
  }

  onUpdateChars = (newChar) => {
    let end = false;
    if (newChar.length < 9) {
      end = true;
    }

    this.setState(({ offset, char }) => ({
      char: [...char, ...newChar],
      loading: false,
      newItemLoad: false,
      offset: offset + 9,
      charEnded: end,
    }));
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  onCharsLoaddAll = () => {
    this.setState({
      newItemLoad: true,
    });
  };

  onRequest = (offset) => {
    this.onCharsLoaddAll();
    this.marverlService
      .getAllCharacters(offset)
      .then(this.onUpdateChars)
      .catch(this.onError);
  };

  myRef = [];

  onСolored = (elem) => {
    this.myRef.push(elem);
  };

  onFocused = (id) => {
    this.myRef.forEach((item) => {
      if (+item.id === id) {
        item.className += " char__item_selected";
      } else {
        item.className = "char__item";
      }
    });
  };

  onRender = (arr) => {
    let img = "";
    const items = arr.map((i) => {
      if (i.thumbnail.includes("image_not_available")) {
        img = (
          <img
            src={i.thumbnail}
            alt="abyss"
            style={{
              objectFit: "contain",
              transform: "translate(-15px, -30px)",
            }}
          />
        );
      } else {
        img = <img src={i.thumbnail} alt="abyss" />;
      }

      return (
        <li
          className={
            this.state.color ? "char__item char__item_selected" : "char__item"
          }
          key={i.id}
          onClick={() => {
            this.props.onCharSet(i.id);
            this.onFocused(i.id);
          }}
          ref={this.onСolored}
          id={i.id}

          onKeyPress={(e) => {
            if (e.key === ' ' || e.key === "Enter") {
                this.props.onCharSet(i.id);
                this.onFocused(i.id);
            }
        }}
        >
          {img}
          <div className="char__name">{i.name}</div>
        </li>
      );
    });
    return items;
  };

  render() {
    const { char, loading, error, offset, newItemLoad, charEnded } = this.state;
    const fail = error ? <Error /> : null;
    const load = loading ? <Spinner /> : null;
    const content = !(loading || error) ? this.onRender(char) : null;

    return (
      <div className="char__list">
        <ul className="char__grid">
          {fail}
          {load}
          {content}
        </ul>
        <button
          className="button button__main button__long"
          disabled={newItemLoad}
          onClick={() => this.onRequest(offset)}
          style={{ display: charEnded ? "none" : "block" }}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

CharList.propTypes = {
  onCharSet: PropTypes.func.isRequired,
};

export default CharList;
