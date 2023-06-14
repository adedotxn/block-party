export interface ResponseInterface {
  status: 'success' | 'error';
}

export interface GroupInterface {
  allPosts: any[];
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
