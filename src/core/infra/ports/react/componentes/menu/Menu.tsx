import './style.css'

export const Menu = (props: { menuItems: JSX.Element[] }): JSX.Element => {
    return (
        <div className="menu-container">
            {props.menuItems}
        </div>
    );
};