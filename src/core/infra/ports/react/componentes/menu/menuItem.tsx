import { useCliente } from "@/core/helpes/UserContext";
import Link from "next/link"

export const MenuItem = (props: {
    title: string,
    icon: JSX.Element,
    route: string,
    allowedTypes: number[],

    isActive: boolean
}): JSX.Element | null => {



    const { user, token, logout } = useCliente();

    if (!props.allowedTypes.includes(parseInt(user?.tipo))) {
        return null;
    }
    

    return (
        <Link href={props.route}>
            {props.isActive ? (
                <div className="menu-item">
                    <div className="menu-item-details">
                    <div className="menu-icone-ativo">{props.icon}</div>
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
                        {props.icon}
                        <div className="menu-item-title-nao-selecionado">{props.title}</div>
                    </div>
                    <div className="div-3" />
                </div>
            )}
        </Link>
    )
}