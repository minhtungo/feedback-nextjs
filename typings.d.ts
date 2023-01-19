interface NewSite {
  name: string;
  url: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  provider: string;
  photoURL: string;
  displayName?: string;
  providerData?: any;
  token?: string;
}

interface Site {
  authorId: string;
  createdAt: number;
  name: string;
  url: string;
  settings: SiteSettings;
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
