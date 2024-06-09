import Perfil from "@/app/perfil/page";
import "./style.css";
import { Typography } from "@mui/material";

export const Menu = (props: { menuItems: JSX.Element[] }): JSX.Element => {
  return (
    <>
      <div className="menu-container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#a704f8",
            padding: "16px",
            borderRadius: "6px",
          }}
        >
          

          <Perfil />
        </div>
        {props.menuItems}
      </div>
    </>
  );
};
