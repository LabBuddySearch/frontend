export interface CardData {
  id: string;
  title: string;
  subject: string;
  type: string;
  description: string;
  university: string;
  сity: string;
  course: string;
  date: string;
  author: string;
  contact: string;
  files: string[];
  color?: string;
  shadow?: string;
}

export interface CreateCardRequest {
  authorId: string;
  type: string;
  subject: string;
  title: string;
  course: number;
  description: string;
  study: string;
  city: string;
}

export interface CardResponse {
  id: string;
  authorId: string;
  type: string;
  subject: string;
  title: string;
  course: number;
  description: string;
  study: string;
  city: string;
  createdAt: string;
}