import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from "@mui/material";
import CartaoGenericoProps from "./CartaoGenericoProps";

export const CartaoGenerico = (props: CartaoGenericoProps) => {
  const Icon = props.icone;
  return (
    <Card sx={{
      height: "120px",
      borderRadius: '8px'
    }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center"
        }}
      >
        <Stack alignItems="center" direction="row" justifyContent="space-between" spacing={3}>
          <Stack spacing={1}>
            <Typography
              sx={{
                fontFamily: "DM Sans",
                fontWeight: "700",
                fontSize: "24px",
                lineHeight: "32px",
                letterSpacing: "-2%",
                color: "#2B3674",
              }}
            >
              {props.valor}
            </Typography>
            <Typography
              sx={{
                fontFamily: "DM Sans",
                fontWeight: "500",
                fontSize: "14px",
                lineHeight: "24px",
                letterSpacing: "-2%",
                color: "#A3AED0",
              }}
            >
              {props.descritivo}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "#F4F7FE",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <Icon color="primary" />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};