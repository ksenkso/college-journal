export interface MenuItem {
  title: string;
  path: string;
  children: Array<MenuItem>|null
}
