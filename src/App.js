//src/App.js

import 'bootstrap/dist/css/bootstrap.min.css';
import { useReducer, useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Programming from './pages/Programming';
import Saved from './pages/Saved';


const initialState = { articles: [], page: 1, loading: false, query: '' };

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ARTICLES':
      return { ...state, articles: action.reset ? action.payload : [...state.articles, ...action.payload], loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_QUERY':
      return { ...state, query: action.payload, page: 1, articles: [] };
    case 'LOAD_MORE':
      return { ...state, page: state.page + 1 };
    case 'TOGGLE_SAVE':
      const isSaved = state.savedArticles.some(savedArticle => savedArticle.web_url === action.payload.web_url);
      return {
        ...state,
        savedArticles: isSaved
          ? state.savedArticles.filter(article => article.web_url !== action.payload.web_url)
          : [...state.savedArticles, action.payload]
      };
    default:
      return state;
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, { ...initialState, savedArticles: [] });
  const [inputValue, setInputValue] = useState('');
  const { articles, page, loading, query, savedArticles } = state;


  useEffect(() => {
    const fetchArticles = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const res = await axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
          params: { q: query || 'Indonesia', "api-key": process.env.REACT_APP_NEWS_API, page }
        });
        dispatch({ type: 'SET_ARTICLES', payload: res.data.response.docs || [], reset: page === 1 });
      } catch (error) {
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
      }
    };

    fetchArticles();
  }, [query, page]);

  
  const handleSearch = () => {
    dispatch({ type: 'SET_QUERY', payload: inputValue.trim() || '' });
  };

  const loadMoreArticles = () => {
    dispatch({ type: 'LOAD_MORE' });
  };

  const toggleSaveArticle = (article) => {
    dispatch({ type: 'TOGGLE_SAVE', payload: article });
  };

  return (
    <Router>
      <div className="container-fluid p-0">
        <Navbar
          title="Newzz"
          onSearch={handleSearch}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                articles={articles} 
                loading={loading} 
                loadMoreArticles={loadMoreArticles} 
                toggleSaveArticle={toggleSaveArticle} 
                savedArticles={savedArticles} 
                query={query}
              />
            } 
          />
          
          <Route 
            path="/programming" 
            element={
              <Programming 
                toggleSaveArticle={toggleSaveArticle} 
                savedArticles={savedArticles}
                query={query}
                handleSearch={handleSearch}
              />
            } 
          />

          <Route 
            path="/saved" 
            element={
              <Saved 
                savedArticles={savedArticles}
                toggleSaveArticle={toggleSaveArticle}
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
