import { useState } from "react";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import decoration from "../../resources/img/vision.png";

const MainPage = () => {
    const [selectChar, changeChar] = useState(null);
    
    function onCharSet(id) {
        changeChar(id)
    }

  return (
    <>
      <RandomChar />
      <div className="char__content">
        <CharList onCharSet={onCharSet} />
        <ErrorBoundary>
          <CharInfo id={selectChar} />
        </ErrorBoundary>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default MainPage;
