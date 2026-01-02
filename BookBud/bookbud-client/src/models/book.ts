export interface Book {
  _id: string;
  title: string;
  author: string;
  year: number;
  pageCount: number;
  coverUrl?: string;
  meetingInfo?: string;
  isActive: boolean;
}
