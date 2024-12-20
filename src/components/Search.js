//src/components/Search.js

const Search = ({ inputValue, setInputValue, handleSearch }) => (
    <div className="d-flex">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Search for articles..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        className="btn"
        style={{ backgroundColor: 'hotpink', color: 'white', borderColor: 'hotpink' }}
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
  
  export default Search;
  