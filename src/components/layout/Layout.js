import Headers from "./Headers";
import Navbar from "./Navbar";

const Layout = ({children, ...rest }) => {
    return (
        <div>
            <Headers {...rest}/>
            <Navbar {...rest}/>
            <main>
                {children}
            </main>
            <hr></hr>
            <footer>Javier Girón López @ 2023 - React Module</footer>
        </div>
    )
};

export default Layout