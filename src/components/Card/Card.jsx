export const Card = ({ title, body, footer, loading = false
 }) => (
  <div className="card my-2" style={{ width: "18rem" }}>
    <div className="card-body">
      {loading ? (
        <p className="card-text placeholder-glow">
        <span className="placeholder col-7"></span>
        <span className="placeholder col-4"></span>
        <span className="placeholder col-4"></span>
        <span className="placeholder col-6"></span>
        <span className="placeholder col-8"></span>
      </p>
      ): (
        <>
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{body}</p>
        </>
      )}
    </div>
    <div className="card-footer d-flex justify-content-between">
      {footer}
    </div>
  </div>
);
