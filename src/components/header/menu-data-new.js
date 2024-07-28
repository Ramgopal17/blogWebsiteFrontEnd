import MainSiteUrl from "../../api/MainSiteUrl";

const menu_data = [
  {
    id: 1,
    mega_menu: false,
    has_dropdown: false,
    title: "Home",
    link: "/",
  },
  {
    id: 2,
    mega_menu: false,
    has_dropdown: false,
    title: "services",
    link: `${MainSiteUrl.url}/services`,
  },
  {
    id: 3,
    mega_menu: false,
    has_dropdown: false,
    title: "solutions",
    link: `${MainSiteUrl.url}/solutions`,
  },
  {
    id: 4,
    mega_menu: false,
    has_dropdown: false,
    title: "About Us",
    link: `${MainSiteUrl.url}/aboutus`,
  },
  {
    id: 5,
    mega_menu: false,
    has_dropdown: false,
    title: "Contact Us",
    link: `${MainSiteUrl.url}/contact`,
  }
];
export default menu_data;
