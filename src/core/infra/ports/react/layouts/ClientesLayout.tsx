import Head from "next/head";
import {
    Box,
    Container,
    Unstable_Grid2 as Grid,
    Typography,
} from "@mui/material";

export const ClientesLayout  = (props: {
    // topCards: JSX.Element[],
    // leftCards: JSX.Element[],
    tabelas: JSX.Element[],
    // graficoLinha: JSX.Element,
}) => {
    return (
        <>
            <Head>
                <title>Raaca | Clinete</title>
            </Head>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 3,
                }}
            >
                <Container maxWidth={false}>
                    <Typography
                        sx={{
                            color: "#707EAE",
                            fontWeight: "500",
                            lineHeight: "24px",
                            fontSize: "15px",
                        }}
                    >
                        Menu / Clientes
                    </Typography>

                    <Grid container spacing={2} marginTop={"12px"}>
                    
                        {props.tabelas}
                    </Grid>
                </Container>
            </Box >
        </>
    );
}