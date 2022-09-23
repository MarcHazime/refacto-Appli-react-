import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div className="container">
        <h1>Wilders Book</h1>
      </div>
      <div>
        <ul>
          <li>
            <Link to="/"> Home</Link>
          </li>
          <li>
            <Link to="/addskill"> Skills</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
