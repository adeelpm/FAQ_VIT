

import React, { Component } from 'react'
import { Table } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css'
//  'rsuite/lib/styles/index.less';
import axios from 'axios'
import { API_URL } from '../env';


// data: [
//     {
//       "id": 1,
//       "avartar": "https://s3.amazonaws.com/uifaces/faces/twitter/justinrob/128.jpg",
//       "city": "New Amieshire",
//       "email": "Leora13@yahoo.com",
//       "firstName": "Ernest Schuppe SchuppeSchuppeSchuppeSchuppeSchuppeSchuppe Schuppe",
//       "lastName": "Schuppe",
//       "street": "Ratke Port",
//       "zipCode": "17026-3154",
//       "date": "2016-09-23T07:57:40.195Z",
//       "bs": "global drive functionalities",
//       "catchPhrase": "Intuitive impactful software",
//       "companyName": "Lebsack - Nicolas",
//       "words": "saepe et omnis",
//       "sentence": "Quos aut sunt id nihil qui.",
//       "stars": 820,
//       "followers": 70
//     },
//     {
//       "id": 2,
//       "avartar": "https://s3.amazonaws.com/uifaces/faces/twitter/thaisselenator_/128.jpg",
//       "city": "New Gust",
//       "email": "Mose_Gerhold51@yahoo.com",
//       "firstName": "Janis",
//       "lastName": "Vandervort",
//       "street": "Dickinson Keys",
//       "zipCode": "43767",
//       "date": "2017-03-06T09:59:12.551Z",
//       "bs": "e-business maximize bandwidth",
//       "catchPhrase": "De-engineered discrete secured line",
//       "companyName": "Glover - Hermiston",
//       "words": "deleniti dolor nihil",
//       "sentence": "Illo quidem libero corporis laborum.",
//       "stars": 1200,
//       "followers": 170
//     },]

const { Column, HeaderCell, Cell,} = Table;

export default class RequestTable extends Component {
    constructor(props) {
      super(props);
      this.state = {
         loading:false ,

         data:[]
        
      };

      
  

    }

    componentDidMount=()=>{

        this.getdatafromdb()
        
    }

    getdatafromdb=async()=>{


        
       await axios.get(`${API_URL}/api/all/1`).then(
            res=>{
                console.log(res)
                this.setState({data:res.data})
            }
        )
    }



    getData=()=> {
        const { data, sortColumn, sortType } = this.state;
    
        if (sortColumn && sortType) {
          return data.sort((a, b) => {
            let x = a[sortColumn];
            let y = b[sortColumn];
            if (typeof x === 'string') {
              x = x.charCodeAt();
            }
            if (typeof y === 'string') {
              y = y.charCodeAt();
            }
            if (sortType === 'asc') {
              return x - y;
            } else {
              return y - x;
            }
          });
        }
        return data;
      }

        handleSortColumn=(sortColumn, sortType) =>{
            
            this.setState({
            loading: true
            });
        
            setTimeout(() => {
            this.setState({
                sortColumn,
                sortType,
                loading: false
            });
            }, 500);
        }


        handleAction=()=>{

        }



    render() {
      return (
        <div>
          {/* onRowClick={data => { console.log(data); }} */}
          <Table wordWrap height={600}   data={this.getData()} sortColumn={this.state.sortColumn} sortType={this.state.sortType} onSortColumn={this.handleSortColumn} loading={this.state.loading} >
            <Column width={70} align="center" fixed sortable>
              <HeaderCell>Id</HeaderCell>
              <Cell dataKey="id" />
            </Column>
  
            <Column width={200} fixed >
              <HeaderCell>Question</HeaderCell>
              <Cell dataKey="question" />
            </Column>
  
            <Column width={200} >
              <HeaderCell>Answer</HeaderCell>
              <Cell dataKey="answer" />
            </Column>
  
            <Column width={200} sortable>
              <HeaderCell>Category</HeaderCell>
              <Cell dataKey="category" />
            </Column>
  
            
  
            <Column width={120} fixed="right">
              <HeaderCell>Action</HeaderCell>
  
              <Cell>
                {rowData => {
                  const handleAction=()=> {
                   
                  
                      this.props.valuep(0,rowData)
                      // alert(`id:${rowData.id}`);
                  }
                    
                   
                     
                
                    

                    const handleActiont=()=>{
                      axios.delete(`${API_URL}/api/delete/${rowData.id}`).then(
                        res=>{
                            console.log(res)
                            this.getdatafromdb()
                            // res.data.affectedRows==1?alert("Deleted"):null
                            // this.setState({data:res.data})
                        }
                    )
                    }
                  
                  return (
                    <span>
                      <a onClick={handleAction} href="#"> Edit </a> |{' '}
                      <a onClick={handleActiont} href="#"> Remove </a>
                    </span>
                  );
                }}
              </Cell>
            </Column>
          </Table>
        </div>
      );
    }
  }
