import { NavLink } from 'react-router-dom';
import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <a href="#">
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><a href="/charList">Characters</a></li>
                    /
                    <li><a href="/comicsList">Comics</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;