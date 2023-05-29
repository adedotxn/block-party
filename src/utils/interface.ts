export interface ResponseInterface {
  status: 'success' | 'error';
}

export interface GroupInterface {
  name: string;
  id: string;
  allPosts: unknown[];
  members: string[];
}
