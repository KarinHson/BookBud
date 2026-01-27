import { Users, Trophy, Award, BookOpen } from 'lucide-react';
import { TopReaderMembersProgress } from '../../components/TopReaderMembersProgress/TopReaderMembersProgress';
import './MembersProgress.scss';
import { progressService } from '../../services/progressService';
import { useState, useEffect } from 'react';
import { Book } from '../../models/book';
import { calcProgressPercent } from '../../helpers/calcProgressPercent';

interface Member {
  userId: string;
  name: string;
  pagesRead: number;
  isFinished: boolean;
}

export const MembersProgress = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [activeBook, setActiveBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    progressService
      .getProgressForActiveBook()
      .then((data) => {
        setActiveBook(data.book);
        setMembers(data.members);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <p>Loading members' progress...</p>
  };

  if (error) {
  return <p style={{ color: 'red' }}>{error}</p>;
  };

  if (!activeBook) {
  return (
    <div className="empty-state">
      <BookOpen className="book-icon" />
      <p>There's no current book right now</p>
    </div>
  );
}

  const sortedMembers = [...members].sort((a, b) => b.pagesRead - a.pagesRead);
  const topReader = sortedMembers[0] ?? null;

  const medals = [
    <Trophy className="medal gold" key="gold" />,
    <Award className="medal silver" key="silver" />,
    <Award className="medal bronze" key="bronze" />,
  ];

  return (
    <div className="members-progress-container">
      <div className="members-progress-header">
        <h1 id="members-progress-heading">Club Members' Progress</h1>
        <p>See how everyone is doing with "{activeBook.title}"</p>
      </div>

      {topReader && topReader.pagesRead > 0 && (
        <TopReaderMembersProgress
          name={topReader.name}
          pagesRead={topReader.pagesRead}
        />
      )}

      {sortedMembers.length === 0 ? (
        <div className="empty-state">
          <Users className="users-icon" aria-hidden="true" />
          <p>No one has logged any reading progress yet</p>
        </div>
      ) : (
        <ul aria-labelledby={'members-progress-heading'} className="members-list">
          {sortedMembers.map((member, index) => {
            const progressPercentage = calcProgressPercent(
              member.pagesRead,
              activeBook.pageCount
            );
            const isTopThree = index < 3;

            return (
              <li key={member.userId} className="member-card">
                <div className="member-info">
                  <div className="member-icon" aria-hidden="true">
                    <span>{member.name.charAt(0)}</span>
                  </div>
                  <div className="member-name">
                    <h3 aria-label={`Number ${index+1} reader, ${member.name}`}>{member.name}</h3>
                    <p>
                      {member.pagesRead} / {activeBook.pageCount} pages
                    </p>
                  </div>
                </div>

                <div className="progress-section">
                  <div className="progress-bar-wrapper">
                    <div
                      className="progress-bar"
                      style={{ width: `${progressPercentage}%` }}
                    />
                    <span className="progress-percentage">
                      {progressPercentage}%
                    </span>
                  </div>
                  <div className="medal-container">{isTopThree && medals[index]}</div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MembersProgress;
