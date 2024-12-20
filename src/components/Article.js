//src/components/Article.js

const Article = ({ article, toggleSaveArticle, savedArticles }) => {
  const isSaved = savedArticles.some(savedArticle => savedArticle.web_url === article.web_url);

  return (
    <div style={{ width: '25%', padding: '10px' }}>
      <div className="card d-flex flex-column" style={{ height: '100%' }}>
        <img
          src={`https://www.nytimes.com/${article.multimedia[0].url}`}
          alt=""
          style={{ width: '100%', height: 'auto', objectFit: 'cover', aspectRatio: '1/1' }}
        />

        <div className="card-body d-flex flex-column justify-content-between" style={{ flex: 1 }}>
          <div style={{ color: '#666', fontSize: '12px', marginBottom: '5px' }}>
            <span style={{ fontWeight: 'bold' }}>{article.section_name}</span> ·{' '}
            {new Date(article.pub_date).toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </div>

          <h5 className="card-title" style={{ fontSize: '16px', margin: '5px 0' }}>
            {article.headline.main}
          </h5>

          <p style={{ fontSize: '12px', color: '#444', flexGrow: 1 }}>{article.snippet}</p>

          <div className="d-flex justify-content-between">
            <a
              href={article.web_url}
              className="btn btn-primary"
              target="_blank"
              rel="noreferrer"
              style={{
                width: '56%',
                fontSize: '14px',
                backgroundColor: 'hotpink',
                color: 'white',
                borderColor: 'hotpink',
              }}
            >
              Read More
            </a>

            <button
              className={`btn ${isSaved ? 'btn-secondary' : 'border'} ${isSaved ? '' : 'text-secondary'}`}
              style={{
                width: '40%',
                fontSize: '14px',
                backgroundColor: isSaved ? '#6c757d' : 'transparent',
                color: isSaved ? 'white' : '#6c757d',
                borderColor: '#6c757d'
              }}
              onClick={() => toggleSaveArticle(article)}
            >
              {isSaved ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;