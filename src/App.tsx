import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import TodoApp from "./components/TodoApp";
import Auth from "./components/Auth";

function App() {
    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/">Login</Link>
                    </li>
                </ul>
            </nav>
            <Route path="/home" component={TodoApp} />
            <Route exact path="/" component={Auth} />
        </Router>
    );
}

export default App;
