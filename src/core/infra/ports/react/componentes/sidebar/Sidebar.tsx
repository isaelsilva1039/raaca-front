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
                        {/* <text className='agend'>Agendamento </text> */}
                        <img className="img" src="https://raccasaude.com.br/wp-content/uploads/2023/11/sem-fundo-inteira-01-1.png" />
                    </div>
                  
                    <Menu menuItems={props.items} />
                </div>
            </div>
            <button id="menu-btn" onClick={props.onClick}>
                ☰<span className="title">{props.title}</span>
            </button>
        </>
    )
}