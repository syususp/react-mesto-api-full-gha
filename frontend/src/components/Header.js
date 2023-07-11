import logoMobile from '../images/logo-mobile.png';
import logo from '../images/logo.png';
import { Link } from 'react-router-dom';

function Header(props) {
    const { link, userEmail, onExit } = props;

    return (
        <header className="header">
            <picture>
                <source
                    media="(min-width: 480px)"
                    srcSet={logo}
                />
                <img
                    src={logoMobile}
                    alt="Логотип Место"
                    className="header__logo"
                />
            </picture>
            <div className="header__wrapper">
                <p className="header__email">{userEmail}</p>
                <Link to={link.path} className='header__link' onClick={onExit}>{link.text}</Link>
            </div>
        </header>
    );
}

export default Header;