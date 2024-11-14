import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { urlBase3 } from '../utilitarios/definiçoes';

const boxcad_style = {
  padding: '2px',
  borderRadius: '10px',
  border: '2px solid black',
  width: '380px',
}

const boxcadall_style = {
  padding: '5px',
  borderRadius: '10px',
  border: '3px solid black',
  height: '610px'
}

export default function FormPedido(props) {
  const [validated, setValidated] = useState(false);
  const [pedido, setPedido] = useState(props.pedido);

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setPedido({ ...pedido, [id]: valor });

  }


  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
        if(!props.modoEdicao){
          fetch(urlBase3, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(pedido),
          })
            .then((resposta) => {
              return resposta.json();
            })
            .then((dados) => {
                props.setModoEdicao(false);
                fetch(urlBase3, { method: "GET" })
                .then((resposta) => {
                  return resposta.json();
                })
                .then((listaPedidos) => {
                  if (Array.isArray(listaPedidos)) {
                    props.setPedidos(listaPedidos);
                  }
                })
                .catch((erro) => {
                    window.alert("Erro ao obter a lista de pedidos: " + erro.message);
                });
              window.alert(dados.mensagem);
            })
            .catch((erro) => {
              window.alert("Erro ao executar a requisição: " + erro.message);
            });
        }
        else{
          fetch(urlBase3, {
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(pedido)
          }).then((resposta) => {
            return resposta.json();
          });
          window.alert("Atualizado com sucesso!");
          props.setModoEdicao(false);
          props.setPedido(true);
        }
        
      props.exibirTabela(true);
    }
    setValidated(true);
  }
  


  return (
    <Form className='mt-5' id='cadastroPedidos' noValidate validated={validated} onSubmit={handleSubmit} style={boxcadall_style}>
      <hr />
      <div className='d-flex justify-content-center'><Form.Label className="fs-3 justify-content-center d-flex" style={boxcad_style}>Cadastro de Pedidos</Form.Label></div>
      <hr />


      <Row className="mb-3">
        <Form.Group as={Col} md="4">
          <Form.Label>ID</Form.Label>
          <Form.Control
            placeholder="ID gerador descrever o pedido"
              disabled
              value={pedido.codigoPed}
              id="codigoPed" />
        </Form.Group>
      </Row>


      <Row className="mb-3">
        <Form.Group as={Col} md="6">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
           placeholder="EX: Lanche sem batata"
            required
            type="text"
            value={pedido.descricao}
            id="descricao"
            onChange={manipularMudanca}
          />
          <Form.Control.Feedback type="invalid">
            Insira a descrição
          </Form.Control.Feedback>
        </Form.Group>
      </Row>


      
      

      
      <Row className="m-3">
        <Col md="10">
          <Button variant="secondary" type="button" onClick={() => { props.exibirTabela(true)}}>Voltar</Button>
        </Col>
        <Col md="1">
          <Button type="submit" md={{ offset: 5 }}>Cadastrar</Button>
        </Col>
      </Row>
    </Form>
  );      
}
