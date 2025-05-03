import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <nav>
            <h1><Link to="/">Calorie Tracker</Link></h1>
            <ul>
                <li><Link to="/food">Today's Intake</Link></li>
                <li><Link to="/sport">Sport Tracking</Link></li>
                <li><Link to="/liquid">Liquid Intake</Link></li>
            </ul>
        </nav>
    );
}