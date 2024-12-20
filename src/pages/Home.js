// src/pages/Home.js

import Article from '../components/Article';

const Home = ({ articles, loading, loadMoreArticles, toggleSaveArticle, savedArticles, query }) => {
  return (
    <div className="container-fluid p-0">
        <div className="navbar bg-light">
            <h2 className="my-2 text-center w-100" style={{ fontSize: '22px', fontWeight: 'bold' }}>
            {query ? `${query} News` : 'News'}
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

        <div className="text-center my-4">
            <button className="btn" style={{ backgroundColor: 'hotpink', color: 'white', borderColor: 'hotpink' }} onClick={loadMoreArticles} disabled={loading}>
            {loading ? 'Loading...' : 'Load More'}
            </button>
        </div>
        </div>

    </div>
  );
};

export default Home;