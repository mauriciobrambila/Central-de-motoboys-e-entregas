import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { urlBase, urlBase2 } from '../utilitarios/definiçoes';
import BarraBusca from '../utilitarios/barraBusca';

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

export default function FormAgendamento(props) {
  const [validated, setValidated] = useState(false);
  const [agendamento, setAgendamento] = useState(props.agendamento);
  const [visitanteSelecionado, setVisitanteSelecionado] = useState({});

  function manipularMudanca(e) {
    const elemForm = e.currentTarget;
    const id = elemForm.id;
    const valor = elemForm.value;
    setAgendamento({...agendamento,[id]: valor,});
  };

  function validarData(){
    const dataInserida = new Date(agendamento.data);
    const dataAtual = new Date();
    if(dataInserida < dataAtual){
      alert('Informe uma data válida!');
      setAgendamento({...agendamento,data: ''});
    }
  };

  function validarHoraSaida(){
      const horaEntrada = agendamento.horaEntrada;
      const horaSaida = agendamento.horaSaida;
          if (horaEntrada && horaSaida && horaSaida <= horaEntrada) {
            alert('A hora de saída deve ser maior do que a hora de entrada.');
            setAgendamento({...agendamento,horaSaida: '',});
          }
  };

  useEffect(() => {
    if (props.agendamento.visitante) {
      setVisitanteSelecionado(props.agendamento.visitante.nome);
    }
  }, [props.agendamento]);


  const handleSubmit = (event) => {
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
        if(!props.modoEdicao){
          const agendamentoComVisitante = {...agendamento, visitante: visitanteSelecionado};
          fetch(urlBase2, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(agendamentoComVisitante),
          })
            .then((resposta) => {
              return resposta.json();
            })
            .then((dados) => {
                props.setModoEdicao(false);
                fetch(urlBase2, { method: "GET" })
                .then((resposta) => {
                  return resposta.json();
                })
                .then((listaAgendamentos) => {
                  if (Array.isArray(listaAgendamentos)) {
                    props.setAgendamentos(listaAgendamentos);
                  }
                })
                .catch((erro) => {
                    window.alert("Erro ao obter a lista de agendamentos: " + erro.message);
                });
              window.alert(dados.mensagem);
            })
            .catch((erro) => {
              window.alert("Erro ao executar a requisição: " + erro.message);
            });
        }
        else{
          fetch(urlBase2, {
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(agendamento)
          }).then((resposta) => {
            return resposta.json();
          });
          window.alert("Atualizado com sucesso!");
          props.setModoEdicao(false);
          props.listaAgendamento(true);
        }
        
      props.exibirTabela(true);
    }
    setValidated(true);
  }
  

  let [listaVisitas, setListaVisitas] = useState([]);

  useEffect(()=>{
    fetch(urlBase, {method: "GET"})
    .then((resposta)=>{
      return resposta.json();
    }).then((dados)=>{
      setListaVisitas(dados);
    })
  },[])

  return (
    <Form className='mt-5' id='cadastroVisitas' noValidate validated={validated} onSubmit={handleSubmit} style={boxcadall_style}>
      <hr />

      <div className='d-flex justify-content-center'><Form.Label className="fs-3 justify-content-center d-flex" style={boxcad_style}>Agendamento de Visitas</Form.Label></div>
      <hr />
      <Row className="mb-3">
      <Form.Group as={Col} md="4">
          <Form.Label>Número de Registro</Form.Label>
          <Form.Control
            placeholder="Será gerado após agendar"
              disabled
              value={agendamento.registro}
              id="registro" />
        </Form.Group>



        <Form.Group as={Col} md="6">
          <Form.Label>Visitante</Form.Label>
          <BarraBusca placeHolder={'Informe o nome do Visitante'}
                  dados={listaVisitas}
                  campoChave={"cpf"}
                  campoBusca={"nome"}
                  funcaoSelecao={(item) => {
                    setVisitanteSelecionado(item.nome);
                  }}
                  valor={setVisitanteSelecionado}/>
        </Form.Group>
        </Row>

        


        <Row>
        <Form.Group as={Col} md="3">
          <Form.Label>Data</Form.Label>
          <Form.Control type="date"
            placeholder="00/00/0000"
            required
            value={agendamento.data}
            id="data"
            onChange={manipularMudanca}
            onBlur={validarData} />
          <Form.Control.Feedback type="invalid">
            Informe uma data válida!
          </Form.Control.Feedback>
        </Form.Group>


        <Form.Group as={Col} md="3">
          <Form.Label>Hora de Entrada</Form.Label>
          <Form.Control
            required
            type="time"
            value={agendamento.horaEntrada}
            id="horaEntrada"
            onChange={manipularMudanca}
          />
          <Form.Control.Feedback type="invalid">
            Insira a hora de entrada
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} md="3">
          <Form.Label>Hora de Saída</Form.Label>
          <Form.Control
            required
            type="time"
            value={agendamento.horaSaida}
            id="horaSaida"
            onChange={manipularMudanca}
            onBlur={validarHoraSaida}
          />
          <Form.Control.Feedback type="invalid">
            Insira a hora de saída
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <br/>
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Aceito os termos e condições"
          feedback="É necessário aceitar os termos para prosseguir"
          feedbackType="invalid"
        />
      </Form.Group>
      <Row className="m-3">
        <Col md="10">
          <Button variant="secondary" type="button" onClick={() => { props.exibirTabela(true)}}>Voltar</Button>
        </Col>
        <Col md="1">
          <Button type="submit" md={{ offset: 5 }}>Agendar</Button>
        </Col>
      </Row>
    </Form>
  );
}
