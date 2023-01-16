interface NewSite {
  name: string;
  url: string;
}

interface User {
  uid: string;
  email: string;
  name: string;
  provider: string;
  photoURL: string;
  displayName?: string;
  providerData?: any;
}

interface Site {
  authorId: string;
  createdAt: number;
  name: string;
  url: string;
}

interface Feedback {
  author: string;
  authorId: string;
  createdAt: string;
  provider: string;
  rating: number;
  siteId: string;
  status: string;
  text: string;
}
