import { Users, Trophy, Award } from 'lucide-react';
import { TopReaderMembersProgress } from '../../components/TopReaderMembersProgress/TopReaderMembersProgress';
import './MembersProgress.scss';
import { progressService } from '../../services/progressService';
import { useState, useEffect } from 'react';
import { Book } from '../../models/book';

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

  if (isLoading) return <p>Loading members' progress...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!activeBook) return <p>No active book found</p>;

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
        <h1>Club Members' Progress</h1>
        <p>See how everyone is doing with "{activeBook.title}"</p>
      </div>

      {topReader && topReader.pagesRead > 0 && (
        <TopReaderMembersProgress
          name={topReader.name}
          pagesRead={topReader.pagesRead}
        />
      )}

      {sortedMembers.length === 0 ? (
        <div className="no-members">
          <Users className="users-icon" />
          <p>No members found</p>
        </div>
      ) : (
        <div className="members-list">
          {sortedMembers.map((member, index) => {
            const progressPercentage = Math.min(
              (member.pagesRead / activeBook.pageCount) * 100,
              100
            );
            const isTopThree = index < 3;

            return (
              <div key={member.userId} className="member-card">
                <div className="member-info">
                  <div className="member-icon">
                    <span>{member.name.charAt(0)}</span>
                  </div>
                  <div className="member-name">
                    <h3>{member.name}</h3>
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
                      {Math.round(progressPercentage)}%
                    </span>
                  </div>

                  {isTopThree && (
                    <div className="medal-container">{medals[index]}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MembersProgress;
