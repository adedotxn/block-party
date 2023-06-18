export interface ResponseInterface {
  status: 'success' | 'error';
}

export interface GroupInterface {
  display: string;
  description: string;
  members: any[];
  events: Event[];
  id: string;
  name: string;
  adminId: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  startTime: string;
  endTime?: string;
  venue: string;
  organiser: {
    name: string;
    id: string;
  };
  createdAt?: Date;
}

export interface User {
  username: string;
  groups: any[];
  allPosts: any[];
  createdAt: string;
  boards: {
    id: string;
    name: string;
  };
  interests: string[];
  userId: string;
  fullName: string;
  role: string;
}
