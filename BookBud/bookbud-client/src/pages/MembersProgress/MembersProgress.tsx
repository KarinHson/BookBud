import { Users, Trophy, Award } from 'lucide-react';
import './MembersProgress.scss';

// mocked data for now
interface Member {
  id: number;
  name: string;
  pagesRead: number;
}

//mocked data for now
interface Book {
  id: number;
  title: string;
  pages: number;
}

interface MembersProgressProps {
  members?: Member[];
  activeBook?: Book | null;
}

export const MembersProgress = ({
  members,
  activeBook,
}: MembersProgressProps) => {
  // mocked data for now
  const mockBook: Book = {
    id: 1,
    title: 'The Great Adventure',
    pages: 300,
  };
  //mocked data for now
  const mockMembers: Member[] = [
    { id: 1, name: 'Alice', pagesRead: 250 },
    { id: 2, name: 'Bob', pagesRead: 200 },
    { id: 3, name: 'Charlie', pagesRead: 180 },
    { id: 4, name: 'Diana', pagesRead: 120 },
    { id: 5, name: 'Eve', pagesRead: 90 },
  ];

  const book = activeBook ?? mockBook;
  const membersList = members ?? mockMembers;

  // sort after pagesRead, most first
  const sortedMembers = [...membersList].sort((a, b) => b.pagesRead - a.pagesRead);

  // Top 3 medals
  const medals = [
    <Trophy className="medal gold" />,
    <Award className="medal silver" />,
    <Award className="medal bronze" />,
  ];

  return (
    <div className="members-progress-container">
      {/* Header */}
      <div className="members-progress-header">
        <h1>Club Members' Progress</h1>
        <p>See how everyone is doing with "{book.title}"</p>
      </div>

      {sortedMembers.length === 0 ? (
        <div className="no-members">
          <Users className="users-icon" />
          <p>No members found</p>
        </div>
      ) : (
        <div className="members-list">
          {sortedMembers.map((member, index) => {
            const progressPercentage = Math.min((member.pagesRead / book.pages) * 100, 100);
            const isTopThree = index < 3;

            return (
              <div key={member.id} className="member-card">
                <div className="member-info">
                  <div className="member-icon">
                    <span>{member.name.charAt(0)}</span>
                  </div>
                  <div className="member-name">
                    <h3>
                      {member.name}
                    </h3>
                    <p>{member.pagesRead} / {book.pages} pages</p>
                  </div>
                </div>

                {/* Progress + Medal */}
                <div className="progress-section">
                  <div className="progress-bar-wrapper">
                    <div className="progress-bar" style={{ width: `${progressPercentage}%` }} />
                    <span className="progress-percentage">{Math.round(progressPercentage)}%</span>
                  </div>

                  {isTopThree && (
                    <div className="medal-container">
                      {medals[index]}
                    </div>
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
