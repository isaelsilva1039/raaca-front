import Link from "next/link"

export const MenuItem = (props: {
    title: string,
    icone: string,
    route: string,
    isActive: boolean
}): JSX.Element => {
    return (
        <Link href={props.route}>
            {props.isActive ? (
                <div className="menu-item">
                    <div className="menu-item-details">
                        <img className="img" src={props.icone} />
                        <div className="menu-item-title">{props.title}</div>
                    </div>
                    <div className="dashboard-wrapper">
                        <div className="dashboard">
                            <div className="active" />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="menu-item">
                    <div className="menu-item-details">
                        <img className="img" src={props.icone} />
                        <div className="menu-item-title-nao-selecionado">{props.title}</div>
                    </div>
                    <div className="div-3" />
                </div>
            )}
        </Link>
    )
}