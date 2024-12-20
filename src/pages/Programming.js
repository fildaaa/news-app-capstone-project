// src/pages/Programming.js

import { useReducer, useEffect } from 'react';
import axios from 'axios';
import Article from '../components/Article';

const initialState = { articles: [], loading: false, page: 1 };

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ARTICLES':
      return { ...state, articles: action.reset ? action.payload : [...state.articles, ...action.payload], loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'LOAD_MORE':
      return { ...state, page: state.page + 1 };
    default:
      return state;
  }
}

const Programming = ({ toggleSaveArticle, savedArticles, query, handleSearch }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { articles, loading, page } = state;

  useEffect(() => {
    const fetchProgrammingArticles = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const res = await axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
          params: {
            q: query || 'A.I.',
            'api-key': process.env.REACT_APP_NEWS_API,
            page,
          },
        });
        dispatch({ type: 'SET_ARTICLES', payload: res.data.response.docs, reset: page === 1 });
      } catch (error) {
        console.error('Error fetching programming articles:', error.response ? error.response.data : error.message);
      }
    };
  
    fetchProgrammingArticles();
  }, [query, page]);
  
  const loadMoreArticles = () => {
    dispatch({ type: 'LOAD_MORE' });
  };

  return (
    <div>
      <div className="navbar bg-light">
        <h2 className="my-2 text-center w-100" style={{ fontSize: '22px', fontWeight: 'bold' }}>
          {query ? `${query} News` : 'Programming News'}
        </h2>
      </div>

      <div className="row mx-3 d-flex flex-wrap">
        {articles
          .filter((article) => article.multimedia?.length > 0)
          .map((article) => (
            <Article 
              key={article.web_url} 
              article={article} 
              toggleSaveArticle={toggleSaveArticle} 
              savedArticles={savedArticles} 
            />
          ))}
      </div>

      <div className="text-center my-4">
        <button
          className="btn"
          style={{ backgroundColor: 'hotpink', color: 'white', borderColor: 'hotpink' }}
          onClick={loadMoreArticles}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </div>
  );
};

export default Programming;
