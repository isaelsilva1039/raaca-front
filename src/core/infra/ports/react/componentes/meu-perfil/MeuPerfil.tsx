"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaPencilAlt, FaCheck, FaTimes } from "react-icons/fa";
import { Row, Col, Button } from "react-bootstrap";
import "./perfil.css";
import {
  Avatar,
  Checkbox,
  CircularProgress,
  FilledInput,
  FormControlLabel,
  Grid,
  Input,
  InputLabel,
  TextField,
} from "@mui/material";
import { useMediaQuery } from "react-responsive";
import { FaCheckCircle } from "react-icons/fa";
import { useCliente } from "@/core/helpes/UserContext";
import { getVerificarAgendasLiberadas } from "@/app/api/horarios/getVerificarAgendasLiberadas";
import { putMeService } from "@/app/api/me/putMeService";
import AvatarPlaceholder from "../AvatarPlaceholder/AvatarPlaceholder";

interface Profile {
  avatar: string | null | undefined;
  name: string | undefined;
  email: string | undefined;
  cpf: string | undefined;
  tipo: any;
  senha: string | null | undefined;
  novaSenha: string | null | undefined;
}

const Perfil: React.FC = () => {
  const [isEditing, setIsEditing] = useState<Record<string, boolean>>({
    name: false,
    email: false,
    cpf: false,
    tipo: false,
  });
  const { token } = useCliente();

  const [usuarioCliente, setUsuarioCliente] = useState<Profile>();

  const [loading, setLoading] = useState<Boolean>(true);
  const [update, setUpdate] = useState<Boolean>(false);

  const [profile, setProfile] = useState<Profile>({
    avatar: usuarioCliente?.avatar,
    name: usuarioCliente?.name,
    email: usuarioCliente?.email,
    cpf: usuarioCliente?.cpf,
    tipo: usuarioCliente?.tipo,
    senha: null,
    novaSenha: null,
  });

  const [avatar, setAvatar] = useState<any>(usuarioCliente?.avatar);
  const [name, setName] = useState<any>(profile?.name);
  const [email, setEmail] = useState<any>(usuarioCliente?.email);
  const [cpf, setCpf] = useState<any>(usuarioCliente?.cpf);
  const [tipo, settipo] = useState<any>();
  const [senha, setSenha] = useState<any | null>('');
  const [novaSenha, setNovaSenha] = useState<string | null>(null);
  const [senhasIguais, setSenhasIguais] = useState<boolean>(true);

  const [preview, setPreview] = useState<any>();

  const [querTrocarAsenha, setQuerTrocarAsenha] = useState<boolean | any>(true);

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const fileInputRef = useRef<any>(null);
  const handleAvatarClick = () => {
    fileInputRef?.current.click();
  };

  const handlePhotoChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const putMe = () => {
    if (!token) return;

    setLoading(true);
    const onFetchSuccess = (data: any) => {
      setUpdate(true);
    };

    const onFetchError = (error: any) => {
      setUpdate(true);
    };

    if (!preview) {
      setPreview(null);
    }

    if (senha == "undefined") {
      setSenha(null);
    }

    putMeService(
      token,
      name,
      email,
      cpf,
      senha,
      avatar,
      onFetchSuccess,
      onFetchError
    );
  };

  const getMe = () => {
    if (!token) return;

    const onFetchSuccess = (data: any) => {
      setUsuarioCliente(data?.user);

      setProfile({
        avatar: data?.user?.avatar,
        name: data?.user?.name,
        email: data?.user?.email,
        cpf: data?.user?.cpf,
        tipo: data?.user?.tipo,
        senha: null,
        novaSenha: null,
      });

      setAvatar(data?.user?.avatar);
      setName(data?.user?.name);
      setCpf(data?.user?.cpf);
      setEmail(data?.user?.email);
      settipo(data?.user?.tipo);

      setLoading(false);
    };

    const onFetchError = (error: any) => {
      setLoading(false);
    };
    /*** Reaproveitando o mesmo metodo, por isso tem esse nome extranho, porque é usando em varioslocais */
    getVerificarAgendasLiberadas(token, onFetchSuccess, onFetchError);
  };

  useEffect(() => {
    if (update) {
      getMe();

      setUpdate(false);
      setQuerTrocarAsenha(true);
    }
  }, [update]);

  useEffect(() => {
    getMe();
  }, [token]);

  const verificarSenhas = () => {
    if (senha !== novaSenha) {
      setSenhasIguais(false);
    } else {
      setSenhasIguais(true);
    }
  };

  useEffect(() => {
    verificarSenhas();
  }, [senha, novaSenha]);

  let tipoUser = null;
  if (profile.tipo == 1) {
    tipoUser = "Administrador";
  }

  if (profile.tipo == 2) {
    tipoUser = "Profissional";
  }

  if (profile.tipo == 3) {
    tipoUser = "Cliente";
  }

  return (
    <div className="profile-container">
      {loading ? (
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <CircularProgress color="secondary" />
        </Grid>
      ) : (
        <Row
          // xs={12}
          style={{
            flexDirection: isMobile ? "column" : "row",
            display: "flex",
          }}
        >
          <Col xs={4} className="profile-header">
            <Col className="text-center">
              {/* <img src={profile.avatar} alt={profile.name} className="avatar" /> */}

              <AvatarPlaceholder
                avatarUrl={preview || profile.avatar}
                name={profile?.name || "Desconhecido"}
                className="avatar"
                onClick={handleAvatarClick}
              />

              <input
                type="file"
                ref={fileInputRef}
                hidden
                onChange={handlePhotoChange}
                required
              />
            </Col>
          </Col>

          <Col className="form-perfil" xs={8}>
            <Row
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <div>
                <label>Nome</label>

                <TextField
                  className="input-perfil"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputMode="text"
                  margin="dense"
                  placeholder="nome"
                  variant="outlined"
                  type="text"
                  fullWidth
                  defaultValue={profile?.name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={false}
                />
              </div>

              <div>
                <label>Email</label>

                <TextField
                  className="input-perfil"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputMode="text"
                  margin="dense"
                  placeholder="nome"
                  variant="outlined"
                  type="email"
                  fullWidth
                  defaultValue={profile?.email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={false}
                />
              </div>
            </Row>

            <Col style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div>
                <label> C . P . F</label>

                <TextField
                  className="input-perfil"
                  InputLabelProps={{
                    shrink: false,
                  }}
                  inputMode="text"
                  margin="dense"
                  placeholder="cpf"
                  variant="outlined"
                  type="text"
                  fullWidth
                  defaultValue={profile?.cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  disabled={false}
                />
              </div>

              <div>
                <label> Tipo de Usuário</label>

                <TextField
                  className="input-perfil"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputMode="text"
                  margin="dense"
                  placeholder="nome"
                  variant="outlined"
                  type="text"
                  fullWidth
                  defaultValue={tipoUser}
                  // onChange={(e) => settipo(e.target.value)}
                  disabled={true}
                />
              </div>
            </Col>

            <div style={{ padding: "22px 22px 22px 0px" }}>
              Deseja alterar sua senha ?
              <Checkbox
                className="input-perfil"
                onChange={(e) => setQuerTrocarAsenha(!querTrocarAsenha)}
              />
            </div>

            {!querTrocarAsenha && (
              <Col
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div>
                  <label> Nova Senha </label>

                  <TextField
                    className="input-perfil"
                    inputMode="text"
                    margin="dense"
                    placeholder="senha"
                    variant="outlined"
                    type="password"
                    fullWidth
                    defaultValue={profile?.senha}
                    onChange={(e) => setSenha(e.target.value)}
                    disabled={querTrocarAsenha}
                  />
                </div>

                <div>
                  <label>Repita a senha</label>

                  <TextField
                    className="input-perfil"
                    inputMode="text"
                    margin="dense"
                    placeholder="Repita a senha"
                    variant="outlined"
                    type="password"
                    fullWidth
                    defaultValue={profile?.novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                    disabled={querTrocarAsenha}
                  />
                </div>
              </Col>
            )}

            {!senhasIguais && (
              <Col style={{ color: "red", marginTop: "10px" }}>
                As senhas não coincidem
              </Col>
            )}

            <Col className="botoes" xs={12}>
              <Button
                className={`btn-salvar ${!senhasIguais ? "disabled" : ""}`}
                onClick={() => putMe()}
                disabled={!senhasIguais}
              >
                Salvar <FaCheckCircle />{" "}
              </Button>
            </Col>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Perfil;
