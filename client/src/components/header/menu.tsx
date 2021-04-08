import { Menu, MenuItem } from "@material-ui/core";
const menuItems = [
  //Anbar routes
  [
    {
      menuTitle: "Anbar",
      pageURL: "/",
    },
  ],
  //Medaxil routes
  [
    {
      menuTitle: "Medaxil",
      pageURL: "/warehouseincome",
    },
  ],
  // Mexaric routes
  [
    {
      menuTitle: "Mexaric",
      pageURL: "/",
    },
  ],
  //Diger routes
  [
    {
      menuTitle: "Diger",
      pageURL: "/",
    },
  ],
  //user Routes
  [
    {
      menuTitle: "Login",
      pageURL: "/",
    },
  ],
];

const RenderMenu = ({
  anchorEl,
  anchorType,
  isMenuOpen,
  handleMenuClick,
  handleMenuClose,
}: any) => (
  <Menu
    anchorEl={anchorEl}
    anchorOrigin={{ vertical: "top", horizontal: "right" }}
    keepMounted
    transformOrigin={{ vertical: "top", horizontal: "right" }}
    open={isMenuOpen}
    onClose={handleMenuClose}
  >
    {anchorType &&
      menuItems[anchorType - 1].map((menuItem: any) => {
        const { menuTitle, pageURL } = menuItem;
        return (
          <MenuItem onClick={() => handleMenuClick(pageURL)}>
            {menuTitle}
          </MenuItem>
        );
      })}
    {console.log(menuItems)}
  </Menu>
);

export default RenderMenu;
