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
