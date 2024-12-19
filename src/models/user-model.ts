export interface UserProfile {
  status: string;
  points: number;
  trainingTime: number;
  online: boolean;
  unreadMessage: number;
  lastLogin: number;
  introduceUrl: [];
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  type: {
    roles: string[];
    _id: string;
    name: string;
  };
  socialLink: [
    {
      _id: string;
      type: string;
      url: string;
    },
    {
      _id: string;
      type: string;
      url: string;
    },
    {
      _id: string;
      type: string;
      url: string;
    },
    {
      _id: string;
      type: string;
      url: string;
    },
    {
      _id: string;
      type: string;
      url: string;
    }
  ];
  createdAt: string;
  fullName: string;
  username: string;
  bio: string;
  language: {
    _id: string;
    name: string;
    value: string;
  };
  avatar: {
    '100': string;
    '320': string;
    '768': string;
    root: string;
    default: string;
  };
  coverImage: {
    '100': string;
    '320': string;
    '768': string;
    '1366': string;
    root: string;
    default: string;
  };
  roles: string[];
  userType: string;
  membershipExpired: number;
  tenant: {
    _id: string;
    trial: boolean;
    isSubDomain: boolean;
    domain: string;
    email: string;
    saasPackage: {
      _id: string;
      status: string;
      order: number;
      name: string;
      price: {
        '1': number;
        '3': number;
        '6': number;
        '12': number;
      };
      priceUSD: {
        '1': number;
        '3': number;
        '6': number;
        '12': number;
      };
      storage: number;
      maxUser: number;
      maxEmailPerMonth: number;
      customTheme: boolean;
      customHomePage: boolean;
      maxCourse: number;
      preventSharingAccount: boolean;
      report: boolean;
      manageLearnerProgress: boolean;
      independentDomain: boolean;
      supportSystem: boolean;
      affiliate: boolean;
      membership: boolean;
      promotion: boolean;
      payment: boolean;
      blog: boolean;
      discussion: boolean;
      certificate: boolean;
      importExport: boolean;
      chat: boolean;
      supportOnline: boolean;
      copyright: boolean;
    };
    saasData: {
      price: {
        '1': number;
        '3': number;
        '6': number;
        '12': number;
      };
      oldPrice: {
        '1': number;
        '3': number;
        '6': number;
        '12': number;
      };
      priceUSD: {
        '1': number;
        '3': number;
        '6': number;
        '12': number;
      };
      oldPriceUSD: {
        '1': number;
        '3': number;
        '6': number;
        '12': number;
      };
      storage: number;
      maxUser: number;
      maxEmailPerMonth: number;
      customTheme: boolean;
      customHomePage: boolean;
      maxCourse: number;
      preventSharingAccount: boolean;
      report: boolean;
      manageLearnerProgress: boolean;
      independentDomain: boolean;
      supportSystem: boolean;
      affiliate: boolean;
      membership: boolean;
      promotion: boolean;
      payment: boolean;
      blog: boolean;
      discussion: boolean;
      certificate: boolean;
      importExport: boolean;
      chat: boolean;
      supportOnline: boolean;
      copyright: boolean;
      gamification: boolean;
    };
    expiredDate: number;
  };
  custom: [];
}

export interface ICUserLogin {
  address: string;
  code?: string;
  authenticate: any;
}

export interface iLeaderboardItem {
  first_name: string;
  last_name: string;
  points: number;
}
