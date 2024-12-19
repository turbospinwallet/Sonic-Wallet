interface listMenuType {
  title: String;
  route: string;
  activeRoute: String[];
}
export const LIST_MENU: listMenuType[] = [
  {
    title: 'BUY CARS',
    route: '/',
    activeRoute: ['/'],
  },
  {
    title: 'SELL MY CAR',
    route: '/sell-car',
    activeRoute: ['/sell-car'],
  },
];
