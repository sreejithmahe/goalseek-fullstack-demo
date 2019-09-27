import React, {Component} from 'react'  
import axios from 'axios'
 export default class PostForm extends Component {
    constructor(props) {
    super(props)
    this.state ={
    openingBalance : '',
    expectedClosingBalance : '',
    totalNoPeriod : '',
    interestInPeriod : '0.06',
    marginInPeriod : '0.01',
    tlpInPeriod : '0.01',
    indexPeriod : '0.01',
    loading :false,
    message :[]
     }
    }
    changeHandler = (e) => {
     this.setState( { [e.target.name] : e.target.value } )
    }

    submitHandler = (e) => {
     e.preventDefault()
         console.log(this.state)
         this.setState({
         loading : true

         }) 
     axios.post('http://localhost:8009/goalseek',this.state)
      .then(response =>  {
             console.log(response)
             this.setState({
             loading : false,
             message : response.data
             })
             console.log(response.data)
             console.log(response.request)
             console.log(response.statusText)
         })
      .catch(error => {
        console.log(error) 
        this.setState({
          loading : false
          })
      })
    }

    loadOrShowMsg() {
      if(this.state.loading) {
        return <p>Loading......</p>
      } else 
       {
        
          return this.state.message.map((invoices, index) => {
             const { period, openingBalance, depreciation,closingBalance,interestRate,margin,tlp,leaseFee } = invoices //destructuring
             return (
                <tr key={period} bgcolor="#C5E415">
                   <td>{period}</td>
                   <td>{openingBalance}</td>
                   <td>{depreciation}</td>
                   <td>{closingBalance}</td>
                   <td>{interestRate}</td>
                   <td>{margin}</td>
                   <td>{tlp}</td>
                   <td>{leaseFee}</td>
                </tr>
             )
          })
       
        //  return (
        //    <ul>
        //      <u>Period</u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        //      <u>OB</u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        //      <u>Depreciation</u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        //      <u>CB</u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        //      <u>Interest</u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        //      <u>margin</u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
        //      <u>tlp</u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
        //      <u>leaseFee</u>
        //     {this.state.message.map(invoices => (
        // <p key={invoices.period}>
        // {invoices.period}&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
        // {invoices.openingBalance}&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
        // {invoices.depreciation}&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
        // {invoices.closingBalance}&nbsp; &nbsp; &nbsp;&nbsp;&nbsp; 
        // {invoices.interestRate}&nbsp; &nbsp; &nbsp;&nbsp;&nbsp; 
        // {invoices.margin}&nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &nbsp;
        // {invoices.tlp}&nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &nbsp;
        // {invoices.leaseFee}&nbsp; &nbsp; &nbsp;&nbsp;&nbsp; &nbsp; &nbsp;
        //  </p>
        //  ))}
        // </ul>
        //  );
       }
    }

    render() {
      const {openingBalance,expectedClosingBalance,
        totalNoPeriod,interestInPeriod,marginInPeriod,tlpInPeriod,indexPeriod} = this.state
      return (
<div>
  <h3>Goalseek Input</h3>
      <form onSubmit={this.submitHandler.bind(this)} >
     <div> <input type="text" placeholder = "openingBalance" name="openingBalance"  value={openingBalance} onChange={this.changeHandler}/></div>
     <div> <input type="text" placeholder = "expectedClosingBalance" name="expectedClosingBalance"  value={expectedClosingBalance} onChange={this.changeHandler}/></div>
     <div> <input type="text" placeholder = "totalNoPeriod" name="totalNoPeriod"  value={totalNoPeriod} onChange={this.changeHandler}/></div>
     <div> <input type="text" placeholder = "interestInPeriod" name="interestInPeriod" value={interestInPeriod} onChange={this.changeHandler}/></div>
     <div> <input type="text" placeholder = "marginInPeriod" name="marginInPeriod" value={marginInPeriod} onChange={this.changeHandler}/></div>  
     <div> <input type="text" placeholder = "tlpInPeriod" name="tlpInPeriod" value={tlpInPeriod} onChange={this.changeHandler}/></div>
     <div> <input type="text" placeholder = "indexPeriod" name="indexPeriod" value={indexPeriod} onChange={this.changeHandler}/></div>
     <button type="submit">Submit</button>
    	</form>
<table border="2" cellspacing="5" width="50%"  align="center">
  <tr bgcolor="#E3D3CF">
    <td>Period</td>
    <td>OB</td>
    <td>Depreciation</td>
    <td>CB</td>
    <td>Interest</td>
    <td>Margin</td> 
    <td>TLP</td>
    <td>LeaseFee</td>
  </tr>
  {this.loadOrShowMsg()}
</table>

      
</div>
      );
    }
  } 
  