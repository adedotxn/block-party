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
  name: string;
  id: string;
  organiser: string;
  date: string;
  description?: string;
  time: string;
}
