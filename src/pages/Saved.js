// src/pages/Saved.js

const Saved = ({ savedArticles, toggleSaveArticle }) => {
  return (
    <div className="container">
      <div className="navbar bg-light">
        <h2 className="my-2 text-center w-100" style={{ fontSize: '22px', fontWeight: 'bold' }}>Saved Articles</h2>
      </div>

      {savedArticles.length === 0 ? (
        <p>No saved articles found.</p>
      ) : (
        <div className="container my-3">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Section</th>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {savedArticles.map((article) => (
                <tr key={article.web_url}>
                  <td>{article.section_name || 'N/A'}</td>
                  <td>{article.headline.main}</td>
                  <td>{article.snippet}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <a
                        href={article.web_url}
                        className="btn btn-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          // width: '56%',
                          fontSize: '14px',
                          backgroundColor: 'hotpink',
                          color: 'white',
                          borderColor: 'hotpink',
                        }}
                      >
                        Read More
                      </a>
                      <button
                        onClick={() => toggleSaveArticle(article)}
                        className="btn btn-secondary"
                        style={{
                          fontSize: '14px',
                          backgroundColor:'#6c757d'
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Saved;