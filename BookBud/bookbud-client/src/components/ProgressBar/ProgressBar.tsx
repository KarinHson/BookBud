import './ProgressBar.scss';

interface ProgressBarProps {
    percent: number;
    totalPages: number;
    pagesRead: number;
}

export const ProgressBar = ({ percent, totalPages, pagesRead }: ProgressBarProps) => {
  return (
    <div className='progress-container' role='progressbar' aria-label={`${percent}% read`} 
      aria-valuemin={0} 
      aria-valuemax={totalPages} 
      aria-valuenow={pagesRead}>
      <span className='pages-text'>{pagesRead} / {totalPages} pages</span>
      <div className='progress-wrapper'>
        <div
          className='progress-fill'
          style={{ width: `${percent}%` }}
        >
          {percent >= 10 && <span>{Math.floor(percent)}%</span>}
        </div>
      </div>
    </div>
  );
};
