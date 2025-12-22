import './ActiveBookCard.scss';

export const ActiveBookCard = () => {
  const totalPages = 302;
  const pagesRead = 75;
  const progressPercent = Math.floor((pagesRead / totalPages) * 100);

  return (
    <div className="book-card">
      <div className="column-a">
        <img
          src="https://bilder.akademibokhandeln.se/images_akb/9789100805166_383"
          alt="Example Book"
        />
      </div>

      <div className="column-b">
        <h1>Example Book Title</h1>
        <span>by Author Name</span>
        <span>{totalPages} pages</span>
        <span>2020</span>

        <div className="progress-wrapper">
          <div className="progress-fill">
            {progressPercent >= 10 && <span>{progressPercent}%</span>}
          </div>
        </div>
      </div>
    </div>
  );
};
