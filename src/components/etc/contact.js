import '../../css/contact.css';

function Contact() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <a className="navbar-brand" href="/">Violympic Tin học</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/#">
                            <i className="bi bi-telephone"> 1900636111 </i>
                            </a>
                    </li>
                    <li className="nav-item">
                        
                        <a className="nav-link" href="/#">
                        <i className="bi bi-envelope"> viotinhoc@edu.vn </i></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="https://www.facebook.com/">
                        <i className="bi bi-facebook"> viotinhoc </i>
                             
                        </a>
                    </li>
                </ul>                
            </div>
        </nav>
    );
}
export default Contact;