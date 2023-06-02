export interface ResponseInterface {
  status: 'success' | 'error';
}

export interface GroupInterface {
  name: string;
  id: string;
  allPosts: unknown[];
  members: string[];
}

export interface GroupData {
  data: {
    id: string;
    allPosts: string[];
    adminId: string;
    members: string[];
    description: string;
    name: string;
  };
}
