import { Component } from 'react';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import Error from '../error/Error';

class RandomChar extends Component {
    state = {
       char:{},
       loading: true,
       error: false
    }

    marverlService = new MarvelService(); 

    componentDidMount() {
        console.log('mount')
        this.updateChar();
        // this.tim = setInterval(this.updateChar, 3000);
    }

    componentDidUpdate() {
        console.log('update')
    }

    // componentWillUnmount() {
    //     clearInterval(this.tim);
    // }

    onCharLoaded = (char) => {
       this.setState({char, loading: false})
    }

    onError = () => {
        this.setState({loading: false, error: true})
    }


    updateChar = () => {
       let id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
       this.onChangeButton();
       this.marverlService.getCharacter(id).then(this.onCharLoaded).catch(this.onError);
    }
    
    onChangeButton = () => {
        this.setState({loading:true})
    }

    render() {
    const {char, loading, error} = this.state;
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
                <button className="button button__main" onClick={this.updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
  }
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