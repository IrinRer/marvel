import { useState, useEffect } from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

const RandomChar = () => {
    const [char, setChar] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const marverlService = new MarvelService(); 

    useEffect(() => {
        updateChar();
    }, []);


    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }


    const updateChar = () => {
       let id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
       onChangeButton();
       marverlService.getCharacter(id).then(onCharLoaded).catch(onError);
    }
    
    const onChangeButton = () => {
        setLoading(true);
    }

    const errorMessage = error ? <Error/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? <View char={char}/> : null;
    return (
        <div className="randomchar">
          {errorMessage}
          {spinner}
          {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
  }

  
const View = ({char}) => {
   const {name, descr, thumbnail, homepage, wiki} = char;
   let classes = 'randomchar__img'
   if(thumbnail.includes('image_not_available')) {
      classes += ' objectFit';
   }

    return (
        <div className="randomchar__block">
                <img src={thumbnail} alt="Random character" className={classes}/>
                <div className="randomchar__info">
                    <p className="randomchar__name">{name}</p>
                    <p className="randomchar__descr">
                        {descr}
                    </p>
                    <div className="randomchar__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">wiki</div>
                        </a>
                    </div>
                </div>
            </div>
    )
}

export default RandomChar;