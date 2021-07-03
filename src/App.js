import './App.css';
import Nav from './Nav.js'
import { Row, Col, Container, Card } from 'react-bootstrap'
// import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'

import React ,{ useState }from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';










function App() {

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const [report, setreport] = useState(false)

  const [data,setdata]=useState({})

  const onSubmitHandler=()=>{

    axios.post('http://localhost:5000/api/postqa', {qid:0,quer:true, question: data.question,email:data.email ,type:1}).then(
            res => {
                console.log("postqa", res)
                setOpen(true)
                setreport(false)
                
            }
        )



  }


  
  return (

    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                Thank you for Reporting missing question!
              </Alert>
            </Snackbar>
      <Nav></Nav>
      <div className="main-grid">
        <Container>
          <h5>Help Center</h5>
          <br/>
          <Row>
            <Col><Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Academic</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                 <Link  to={{pathname:'/content',state:{category:"Academic",qid:"",question:"",answer:"",answerStyled:""}}}>View all questions</Link>

              </Card.Body>
            </Card></Col>
            <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Finance</Card.Title>
                {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                 <Link  to={{pathname:'/content',state:{category:"Finance",qid:"",question:"",answer:"",answerStyled:""}}}>View all questions</Link>

              </Card.Body>
            </Card>
            </Col>
            <Col><Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Exam</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                 <Link  to={{pathname:'/content',state:{category:"Exam",qid:"",question:"",answer:"",answerStyled:""}}}>View all questions</Link>

              </Card.Body>
            </Card></Col>
          </Row>
          <hr />
          <Row>
            <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Hostel</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                  <Link  to={{pathname:'/content',state:{category:"Hostel",qid:"",question:"",answer:"",answerStyled:""}}}>View all questions</Link>

              </Card.Body>
            </Card>
            </Col>
            <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Placements</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Link  to={{pathname:'/content',state:{category:"Placements",qid:"",question:"",answer:"",answerStyled:""}}}>View all questions</Link>

       
              </Card.Body>
            </Card>
            </Col>
            <Col>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>VITEEE</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Link  to={{pathname:'/content',state:{category:"VITEEE",qid:"",question:"",answer:"",answerStyled:""}}}>View all questions</Link>
              </Card.Body>
            </Card>
            </Col>
          </Row>
          <hr/>
          {

           report?(
            
            <>

                <Form>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>

                    <Form.Control type="text" placeholder="Enter Email"  onChange={(e,value) => {var temp=data;temp.email=e.target.value;setdata(temp)  }} />
                 
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Question</Form.Label>

                    <Form.Control type="text" placeholder="Enter Your Question"  onChange={(e,value) => { var temp=data;temp.question=e.target.value; setdata(temp)}} />
                 
                  </Form.Group>
                </Form>
            
            <Button variant="info" size="sm" color="primary" type="submit" onClick={e => { e.preventDefault(); onSubmitHandler()}}>
            Small
            </Button>
          </> )
          
              
            : <Link onClick={()=>{console.log("calledddddd");setreport(true)}}><h6 >Did not find your question?</h6></Link>
          }
         
        </Container>
        
      </div>


    </div>
  )

}




export default App;
