import { Trophy } from 'lucide-react';
import './TopReaderMembersProgress.scss';

interface TopReaderProps {
  name: string;
  pagesRead: number;
}

export const TopReaderMembersProgress = ({
  name,
  pagesRead,
}: TopReaderProps) => {
  if (pagesRead <= 0) return null;

  return (
    <div className="top-reader-highlight">
      <div className="top-reader-title">
        <Trophy />
        <h3>Top Reader</h3>
      </div>
      <p>
        {name} is leading with {pagesRead} pages read!
      </p>
    </div>
  );
};

export default TopReaderMembersProgress;
