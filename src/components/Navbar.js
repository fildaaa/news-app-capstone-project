//src/components/Navbar.js

import Search from './Search';
import { Link } from 'react-router-dom';

const Navbar = ({ title, inputValue, setInputValue, onSearch, setQuery }) => {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: 'pink', position: 'sticky', top: 0, left: 0, right: 0, zIndex: 1000 }}
    >
      <div className="container-fluid ms-5 me-5 d-flex align-items-center">
        <h1 className="mb-0 me-3" style={{ color: '#DA1884', fontSize: '24px', fontWeight: 'bold' }}>
          {title}
        </h1>
        <div className="d-flex">
          <Link to="/" className="btn btn-link" style={{ color: '#DA1884' }}>
            Indonesia
          </Link>
          <Link to="/programming" className="btn btn-link" style={{ color: '#DA1884' }}>
            Programming
          </Link>
          <Link to="/saved" className="btn btn-link" style={{ color: '#DA1884' }}>
            Saved
          </Link>
        </div>
        <div className="ms-auto">
          <Search inputValue={inputValue} setInputValue={setInputValue} handleSearch={onSearch} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;