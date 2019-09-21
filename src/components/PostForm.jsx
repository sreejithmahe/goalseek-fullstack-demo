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
     axios.post('http://13.58.35.69/goalseek',this.state)
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
        
          // return this.state.message.map((invoices, index) => {
          //    const { period, openingBalance, closingBalance, leaseFee } = invoices //destructuring
          //    return (
          //       <tr key={period}>
          //          <td>{period}</td>
          //          <td>{openingBalance}</td>
          //          <td>{closingBalance}</td>
          //          <td>{leaseFee}</td>
          //       </tr>
          //    )
          // })
       
         return (
           <ul>
             <u>Period</u> &nbsp;&nbsp;&nbsp;&nbsp; <u>OB</u>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <u>CB</u>  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             &nbsp;<u>leaseFee</u>
            {this.state.message.map(invoices => (
        <p key={invoices.period}>{invoices.period}&nbsp; &nbsp; &nbsp;{invoices.openingBalance} 
        &nbsp; &nbsp; &nbsp;{invoices.closingBalance}&nbsp; &nbsp; &nbsp;
         {invoices.leaseFee}
         </p>
         ))}
        </ul>
         );
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
      {this.loadOrShowMsg()}
</div>
      );
    }
  } 
  