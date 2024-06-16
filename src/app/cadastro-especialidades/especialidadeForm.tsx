import React, { useState, useEffect } from "react";
import { Button, Alert, Form, Row, Col } from "react-bootstrap";
import "./style.css";
import { IoCheckmarkCircle } from "react-icons/io5";
import { VscAdd } from "react-icons/vsc";





const SpecialtyForm = ({ onSubmit, initialData, onCancel }: any) => {
  const [id, setId] = useState<number | null>(null);
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (initialData) {
      setId(initialData.id);
      setDescription(initialData.nome);
      setDuration(initialData.duration);
    } else {
      setId(null);
      setDescription("");
      setDuration("");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ id, description, duration });
    setId(null);
    setDescription("");
    setDuration("");
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className="p-4 bg-light rounded">
    
      <Form onSubmit={handleSubmit}>
        <Row className="align-items-center">
          <Col>
   
            <Form.Group controlId="formDescription" className="d-flex align-items-center g-1 formulario">
             
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="me-2 flex-grow-1 input-form"
                placeholder="Digite o nome da especialidade"
              />
              <Button type="submit" variant="primary" className="me-2 btn-salvar">
               
                {initialData ? <> Salvar especialidade  <IoCheckmarkCircle size={18} /> </> : <> <VscAdd size={14} />  Adicionar  especialidade </> } 
              </Button>
              {initialData && (
                <Button type="button" onClick={onCancel} variant="secondary" className="btn-salvar cancelar">
                  Cancelar
                </Button>
              )}
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SpecialtyForm;
