import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './charInfo.scss';
import MarvelService from '../../services/MarvelService';
import Error from '../error/Error';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';

const CharInfo = (props) => {
    let [char, setChar] = useState(null);
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState(false);

    const marverlService = new MarvelService();

    useEffect(() => {
        updateChar();
    }, [props.id]);


    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
    }

    const updateChar = () => {
        const {id} = props;
        if(!id) {
            return;
        }
        
        onCharLoadind();
        marverlService.getCharacter(id).then(onCharLoaded).catch(onError);
    }

    const onCharLoadind = () => {
        setLoading(true);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }
    
        const skelet = char || loading || error ? null : <Skeleton/>;
        const errorMessage = error ? <Error/> : null; 
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <div className="char__info">
          {skelet}
          {errorMessage}
          {spinner}
          {content}
        </div>
    )
  }

const View = ({char}) => {
    const {name, descr, thumbnail, homepage, wiki, comics} = char;

    let imgStyle = {'objectFit': 'cover'}
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }
   return (
 <>
     <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {descr}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
            {comics.length > 0 ? null : 'There is no comics with this character'}
                {
                    comics.map((item, i) => {
                        if (i > 9) return;
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })
                }       
            </ul>
     </>
   )
}

CharInfo.propTypes = {
    id: PropTypes.number
}

export default CharInfo;