import { Menu } from '../menu/Menu'
import './style.css'

export const Sidebar = (props: {
    onClick: () => void
    title: string
    items: JSX.Element[]
    isOpen: boolean
}) => {
    return (
        <>
            <div>
                <div className={`navigation-root ${props.isOpen ? 'open' : ''}`}>
                    <div className="logo">
                        <img className="img" src="./assets/logo.svg" />
                    </div>
                    <img
                        src='./assets/separator.svg'
                        style={{
                            position: 'absolute',
                            top: '100px',
                            left: '0',
                            width: '100%',
                            height: '1px',
                            backgroundSize: 'cover',
                            backgroundPosition: '50% 50%',
                        }} />
                    <Menu menuItems={props.items} />
                </div>
            </div>
            <button id="menu-btn" onClick={props.onClick}>
                ☰<span className="title">{props.title}</span>
            </button>
        </>
    )
}