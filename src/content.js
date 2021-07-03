import React, { Component } from 'react'
// import  {Container} from  'react-bootstrap'
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import Nav from './Nav.js'
import { API_URL } from './env.js';




const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }));

function ControlledAccordions(props) {
    console.log("hjvhc",props)
    const data=props.data
    console.log("Accorid",props.data)
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
  
    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    const deleteNav=()=>{
        // while (i>0) {
            const elem=document.querySelector('div.se-resizing-bar.sun-editor-common.se-resizing-none')
            elem?.parentNode.removeChild(elem)
        // }
    }
  
    return (
      <div className={classes.root}>
            {data.map((element,index) => 
                
                    <Accordion key={index} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${index}bh-content`}
                            id={`panel${index}bh-header`}
                        >
                        <Typography className={classes.heading}>{element.question}</Typography>
                        </AccordionSummary>
                        {/* {console.log(element)} */}
                        <AccordionDetails>
                            <SunEditor disable setDefaultStyle="font-family:  Apple-System, Arial, Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', STXihei, sans-serif; font-size: 10px;" hideToolbar setContents={element.answer_styled||element.answerStyled}></SunEditor>

                        </AccordionDetails>
                    </Accordion>
                

            )}

            {deleteNav()}
       
      </div>
    );
  }
  

// import React from 'react'





export default class content extends Component {

    constructor(props){
        super(props)


        this.state={

            data:[],
            datas:this.props.location.state,

            question:this.props.location.state.question,
            answerStyled:this.props.location.state.answerStyled,

            category:this.props.location.state.category,
            

        }
 

    }

    componentDidMount=()=>{
        this.getdatafromdb()
    }
    

    getdatafromdb=async()=>{

        console.log("cate",this.state.category)

        
        await axios.get(`${API_URL}/api/category/${this.state.category}`,).then(
             res=>{
                //  console.log(res)
                 this.setState({data:res.data.rows},()=>{console.log("statee data",this.state.data)})
             }
         )
     }


    render() {
        return (
            <div style={{background:'#f8f9fa',minHeight:"100vh"}}>
            <Nav></Nav>
            <div style={{display:"flex",justifyContent:"center",}}>
                    <div style={{ margin: "0 25vw", overflow: 'hidden' }}>
                        {console.log("props",this.props)}
                        <ControlledAccordions data={this.props.location.state.qid!==""?[this.props.location.state]:this.state.data}></ControlledAccordions>
                    </div>
            </div>
            </div>
        )
    }
}
