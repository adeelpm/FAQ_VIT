

import React ,{ useState }from 'react'

import './App.css'
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
// import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import {Link} from 'react-router-dom'
import { useHistory } from "react-router-dom";
import { API_URL } from './env';


export default function Nav() {
  let history = useHistory();      
              

  const [searchdata, setsearchdata] = useState([])
  const [searchtext, setsearchtext] = useState('')
  const styles =makeStyles( 
    {
      nav:{
        textAlign: 'center',
        width: '100%',
        
        backgroundPosition:'50% 50%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100vw 265px',
        height:'35vh',
      },
      searchbox:{
        padding:"8px 25px 8px 20px",
        borderRadius: '25px',
        height: '6.5vh',
        width:'100%',
        boxShadow: 'none',
        border: 'none',
        fontSize:'20px',
    
        '&:focus':{
          outline: 0,
        }
      },


      searchresult:{
        zIndex:'100 !important',
        display:'none',
        height:"30vh",
        background:"#FFFFFF"
        
      }

      
    }
  )()

  

 const handleSearch=(value)=>{

  setsearchtext(value)


    //   var timeoutId;
    //   // no-op if invalid id
    //   if(value!=''){
    //  setTimeout(doExpensiveThing(value), 1000)
    //   } // Adjust as necessary
    //   // clearTimeout(timeoutId); 
    doExpensiveThing(value)
  }

  const doExpensiveThing=async(value)=>{

    // await axios.get()
    console.log("searching ")
    console.log(`${API_URL}/api/search/${value}`);
    await axios.get(`${API_URL}/api/search/${value}`).then(
      
      res=>{
        
        return(
          console.log(res),
        value?setsearchdata(res.data.rows):null
        )
          
      }
  )

    
  }

  const inputstyle={
    padding:"8px 25px 8px 20px",
    borderRadius: '25px',
    height: '6.5vh',
    width:'100%',
    boxShadow: 'none',
    border: 'none',
    fontSize:'20px',

    '&:focus':{
      outline: 0,
    }
  }


  

    return (
      
        <div className={`${styles.nav} nav`} >
        
        <div className={"container"} style={{ padding: '50px',backgroundColor:'' }}>
          <p className="heading">How Can we help you?</p>
          <br/>
          <div  >
            {/* <Autocomplete
              id="custom-input-demo"
              options={[
                { code: 'AD', label: 'Andorra', phone: '376' },
                { code: 'AE', label: 'United Arab Emirates', phone: '971' },
                { code: 'AF', label: 'Afghanistan', phone: '93' },]}
              renderInput={(params) => (
                <div ref={params.InputProps.ref}>
                  <input style={{ width: 200 }} type="text" {...params.inputProps} />
                </div>
              )}
            /> */}
            <Autocomplete

            onChange={(event,value)=>{ 
              console.log(value)

             if(value)history.push({pathname:'/content',state:{question:value.question,answer:"",answerStyled:value.answer_styled}})
              
                     
          }}
            onInputChange={(event, value) => { handleSearch(value) }}

              id="combo-box-demo"
              options={searchdata}
              getOptionLabel={(option,value) => option.question}
              getOptionSelected={(option, value) => option.value === value.value}
              
              renderInput={(params) => (
                <div ref={params.InputProps.ref}>
                  <input value={searchtext} id='inputstylenav' style={inputstyle} type="text" {...params.inputProps} placeholder="Type Keywords to find answers" />
                </div>
              )}
              // renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
            />
            {/* <input onChange={(event, value) => { handleSearch(value) }} type="text" className={styles.searchbox} id='searchbox' placeholder="Type Keywords to find answers" /> */}
            
          </div>
          <p className='footer'>You can also browse the topics below to find what you are looking for.</p>
        </div>
       
      </div>
    )
}


