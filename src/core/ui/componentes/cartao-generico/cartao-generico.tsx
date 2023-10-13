import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from "@mui/material";
import CartaoGenericoProps from "./CartaoGenericoProps";

export const CartaoGenerico = (props: CartaoGenericoProps) => {
  const Icon = props.icone;
  return (
    <Card 
      sx={{
        height: "120px",
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
        backgroundColor: '#ffffff'  
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          padding: '15px'
        }}
      >
        <Stack 
          alignItems="center" 
          direction="row" 
          justifyContent="space-between"
          spacing={2}
        >
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: {
                  xs: "24px", 
                  sm: "22px", 
                  md: "22px", 
                  lg: "22px",
                  xl: "22px"
                },
                lineHeight: "32px",
                letterSpacing: "-2%",
                color: "#2B3674",
              }}
            >
              {props.valor}
            </Typography>
            <Avatar
              sx={{
                backgroundColor: "#F4F7FE",
                height: 56,
                width: 56,
                borderRadius: '50px',
              }}
            >
              <SvgIcon>
                <Icon color="primary" />
              </SvgIcon>
            </Avatar>
        </Stack>
        <Typography
          sx={{
            fontWeight: "500",
            fontSize: "14px",
            lineHeight: "24px",
            letterSpacing: "-2%",
            color: "#A3AED0",
            mb: 1
          }}
        >
          {props.descritivo}
        </Typography>
      </CardContent>
    </Card>
  );
};
