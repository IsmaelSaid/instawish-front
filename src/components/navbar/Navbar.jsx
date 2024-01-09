import { Outlet, Link } from "react-router-dom";

function Navbar() {
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to={`register`}>register</Link></li>
                </ul>
                <ul>
                    <li><Link to={`login`}>login</Link></li>
                </ul>
            </nav>
            <div><Outlet /></div>
        </div>
    )
}
export default Navbar