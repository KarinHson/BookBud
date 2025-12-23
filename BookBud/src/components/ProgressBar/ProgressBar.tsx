import './ProgressBar.scss';

interface ProgressBarProps {
    percent: number;
}

export const ProgressBar = ({ percent }: ProgressBarProps) => {
  return (
    <div className='progress-wrapper'
    role='progress bar'
    aria-label={`${percent}% read`}>
      <div
        className='progress-fill'
        style={{ width: `${percent}%` }}
      >
        {percent >= 10 && <span>{Math.floor(percent)}%</span>}
      </div>
    </div>
  );
};
