import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import axios from 'axios'
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
// import {complex,formatting,basic} from 'suneditor-react/dist/misc/buttonList'
// import PropTypes from 'prop-types';
// import { FlexboxGrid } from 'rsuite';
// import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';


import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Box from '@material-ui/core/Box';

import FixedColumnTable from './tablecomponent'
import RequestTable from './rtablecomponent'
import { API_URL } from '../env';









function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other} >
            {
            value === index && (
                <Box p={3}>
                    {/* {console.log(children)} */}
                    {children}
                </Box>
            )
            }
        </div>
    );
}




  


export default class index extends Component {


     style={
        mainCon:{
          marginTop: "3vh",
          display: 'flex',
          justifyContent: 'center',
        }
        
      }

    

    constructor(props) {

        super(props)

        this.state = {
            qid:0,
            question: "",
            answer: "",
            answerStyled:"",
            category: "",

            value: 0,



        }
       

       
    }


    removeTags(str) {
        if ((str===null) || (str===''))
            return false;
        else
            str = str.toString();
              
        // Regular expression to identify HTML tags in 
        // the input string. Replacing the identified 
        // HTML tag with a null string.
        return str.replace( /(<([^>]+)>)/ig, '');
    }


    onChangeEditor=(newcontent)=>{
        console.log(newcontent)

        

       

        this.setState({answerStyled:newcontent})
        

        

    }
 

    onSubmitHandler = () => {
        console.log("submit handler called")

        const answer=this.removeTags(this.state.answerStyled)


       

        axios.post(`${API_URL}/api/postqa`, {qid:this.state.qid, question: this.state.question, answerStyled:this.state.answerStyled,answer: answer, category: this.state.category }).then(
            res => {
                console.log("postqa", res)
            }
        )


    }

    handleChange = (event, newValue) => {

        this.setState({ value: newValue },
            ()=>{console.log("Adadfa");console.log( this.state.value)}
            );
    };

    deleteNav=()=>{
        // var i=10;
        // while (i>0) {

            const elem=document.querySelector('div.se-resizing-bar.sun-editor-common.se-resizing-none')
        
            // console.log(elem)
            
            elem?.parentNode.removeChild(elem)

            // i--
            
        // }
       
    }

    render() {
        return (
            <div >
                <Tabs value={this.state.value} onChange={this.handleChange} centered>
                    <Tab label="Add / Update" />
                    <Tab label="All FAQs" />
                    <Tab label="Request" />
                </Tabs>
                <TabPanel value={this.state.value} index={0}>
                    <div style={this.style.mainCon}>
                        <div style={{ width: '75vw' }}>
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Question</Form.Label>
                                   
                                    <Form.Control type="text" placeholder="Enter Question" defaultValue={this.state.question} onChange={(e) => { this.setState({ question: e.target.value }) }} />
                                    {/* <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text> */}
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Answer</Form.Label>


                                    <SunEditor defaultValue={this.state.answerStyled} onChange={this.onChangeEditor} height="30vh" setDefaultStyle="font-family:  Apple-System, Arial, Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', STXihei, sans-serif;"
                                        setOptions={{
                                            
                                            buttonList: [
                                                // ["undo", "redo"],
                                                ["fontSize", "formatBlock"],
                                                ["bold", "underline", "italic", "strike", "subscript", "superscript"],
                                                ["removeFormat"],
                                                // "/",
                                                ["fontColor", "hiliteColor"],
                                                ["outdent", "indent"],
                                                ["align", "horizontalRule", "list", "table"],
                                                ["link", "image", "video"],
                                                // ["fullScreen", "showBlocks", "codeView"],
                                                // ["preview", "print"],
                                               
                                            ] // Or Array of button list, eg. [['font', 'align'], ['image']]
                                            // Other option
                                        }}
                                    ></SunEditor>
                                    {
                                        this.deleteNav()
                                    }


                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control defaultValue={this.state.category} as="select" onChange={event => { this.setState({ category: event.target.value }); console.log(event.target.value) }}>
                                        <option value='-1' >Select Category</option>
                                        <option>Academic</option>
                                        <option>Exam</option>
                                        <option>Finance</option>
                                        <option>Hostel</option>
                                        <option>Placements</option>
                                        <option>VITEEE</option>
                                    </Form.Control>
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={e => { e.preventDefault(); this.onSubmitHandler(); console.log("called") }}>
                                    Submit
                            </Button>
                            </Form>
                        </div>



                    </div>
                </TabPanel>
                <TabPanel value={this.state.value} index={1} children={"Item two"}>
                  { <FixedColumnTable valuep={(val,rowData)=>{this.setState({value:val,question:rowData.question,answerStyled:rowData.answer_styled,qid:rowData.id,category:rowData.category},()=>{console.log(this.state)})}} ></FixedColumnTable>}
                </TabPanel>
                <TabPanel value={this.state.value} index={2}>
                    <RequestTable valuep={(val,rowData)=>{this.setState({value:val,question:rowData.question,answerStyled:rowData.answer_styled,qid:rowData.id,category:rowData.category},()=>{console.log(this.state)})}}></RequestTable>
                    
                </TabPanel>

            </div>
        )
    }
}



