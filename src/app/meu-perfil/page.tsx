import {
    buscarInformacoesDashboardUserCase,
    uiPort
} from "@/core"
import { AuthGuard } from "@/core/helpes/withAuth";
import Perfil from "@/core/infra/ports/react/componentes/meu-perfil/MeuPerfil";
import { Typography } from "@mui/material";


export default function MeuPerfil() {



    return (
        <AuthGuard load={true}>
            <div style={{ width: '100%', height: '100%' }}>
                <div style={{ paddingTop: '22px' }}>

                    <Typography
                        className="list-top"
                        sx={{
                            color: "#707EAE",
                            fontWeight: "500",
                            lineHeight: "24px",
                            fontSize: "15px",
                        }}
                    >
                        Menu / Meu perfil
                    </Typography>
                </div>
                <div style={{ paddingTop: '22px' }}>
                    <Perfil />
                </div>

            </div>

        </AuthGuard>
    );
}