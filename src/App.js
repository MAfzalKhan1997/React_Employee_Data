import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import swal from 'sweetalert'

class App extends Component {



constructor(){

  super()
 
  this.state = {

    adminEmail:"",
    adminPass:"",

    loginDiv: true,

    employArr : [
      {fName:"Muhammad Afzal",lName:"Khan",email:"afzal_k1997@yahoo.com",salary: 200000 ,joiningDate: "2019-01-01"},
      {fName:"Ahmed",lName:"Ali",email:"ali@yahoo.com",salary:150000,joiningDate: "2019-05-01"},
      
    ],
    
    employData: false,
    addEmployDiv :false,
    currentIndex : null,

    firstName:'',
    lastName:'',
    email:'',
    salary:'',
    joiningDate:''

 

  }
 
//  this.edit = this.edit.bind(this);
//  this.del = this.del.bind(this);
}

loginDiv(){
  return ( <div id="loginDiv">
  <input
    id="adminEmail" 
    type="text"
    placeholder="UserName"
    onChange={(e)=>this.setState({adminEmail:e.target.value})}
    value={this.state.adminEmail}
  /><br/>
  <input 
    id="adminPass"
    type="password"
    placeholder="Password"
    onChange={(e)=>this.setState({adminPass:e.target.value})}
    value={this.state.adminPass}
  /><br/>

  <button id="loginBtn" onClick={()=>this.login()}>Log In</button>

  <p><strong>(Email:admin/Password:admin)</strong></p>
</div>
)
}

login(){
  const loginEmail = "admin";
  const loginPass = "admin";

  const {adminEmail,adminPass} = this.state;

  if(loginEmail === adminEmail && loginPass === adminPass){
    swal({
      title: "Done!",
      text: "Successfuly LogIn!",
      icon: "success",
      button: "Ok",
    });
    this.setState({
      loginDiv:false,
      employData:true,

      adminEmail:"", 
      adminPass:"",
    })
  }
  else{
    swal({
      title: "Error!",
      text: "Invalid Email/Password!",
      icon: "warning",
      button: "Ok",
    });

    this.setState({ 
  
      adminPass:"",
    })
  }

}

logout(){

  swal({
    title: "Done!",
    text: "Successfuly LogOut!",
    icon: "success",
    button: "Ok",
  });

  this.setState({
    loginDiv:true,
    employData:false, 
  })  
}

addEmployDiv(){
  const {currentIndex} = this.state;
 return( <div id="addEmployDiv">

<input 
          type="text"
          placeholder="First Name"
          onChange={(e)=>this.setState({fName:e.target.value})}
          value={this.state.fName}
          /> 
<input 
          type="text"
          placeholder="Last Name"
          onChange={(e)=>this.setState({lName:e.target.value})}
          value={this.state.lName}
          />
<input 
          type="email"
          placeholder="Email"
          onChange={(e)=>this.setState({email:e.target.value})}
          value={this.state.email}
          />
<input 
          type="number"
          placeholder="Salary"
          onChange={(e)=>this.setState({salary:e.target.value})}
          value={this.state.salary}
          />
<input 
          type="date"
          placeholder="Joining Date"
          onChange={(e)=>this.setState({joiningDate:e.target.value})}
          value={this.state.joiningDate}
          />

      {currentIndex === null ? <button id="addBtn" onClick={()=>this.add()}>Add</button>
      :
      <button id="saveBtn" onClick={()=>this.updateEmploy(currentIndex)}>Save Changes</button>}
      <button id="closeBtn" onClick={()=>this.cancel()}>Close</button>
   </div>
   ) 
}

add(){
  
  const {employArr,fName,lName,email,salary,joiningDate} = this.state;

  let employDetails = {
    fName,
    lName,
    email,
    salary,
    joiningDate
  }

  employArr.push(employDetails);
  console.log(employArr);

  swal({
    title: "Done!",
    text: "Employ Added!",
    icon: "success",
    button: "Ok",
  });

  this.setState({
    fName:"", 
    lName:"",
    email:"",
    salary:"",
    joiningDate:""
  })

}

cancel(){
 this.setState({
   addEmployDiv:false,
   employData:true,
   currentIndex:null,

    fName:"", 
    lName:"",
    email:"",
    salary:"",
    joiningDate:""
  }) 
}
 
employData(){

  const {employArr} = this.state;

return ( <div id="employData"  >
  <button id="logoutBtn" onClick={()=>this.logout()}>Log Out</button>

  <table className="employTable">
<thead className ="tHead">
  <tr className ="tRow">
     <th>S.No</th>
     <th>First Name</th>
     <th>Last Name</th>
     <th>Email</th>
     <th>Salary</th>
     <th>Joining Date</th>
     <th>Edit</th>
     <th>Delete</th>
  </tr>
</thead>

  {employArr.map((val,index)=>{
return <tbody className ="tBody"> 
 <tr className ="tRow">
  <td>{index+1}</td>
  <td>{val.fName}</td>
  <td>{val.lName}</td>
  <td>{val.email}</td>
  <td>{val.salary}</td>
  <td>{val.joiningDate}</td>
  <td><button id="editBtn" onClick={()=>this.edit(index)}>Edit</button></td>
  <td><button id="delBtn" onClick={()=>this.delete(index)}>X</button></td>
 </tr>
</tbody>
  })}

</table>  
 
 <button id="plusBtn" onClick={()=>this.setState({addEmployDiv:true,employData:false})}>+</button> 
 </div>
)
}

edit(index){

  const {employArr} = this.state;

  this.setState({
    addEmployDiv:true,
    employData:false,
    currentIndex:index,

    fName:employArr[index].fName ,
    lName:employArr[index].lName,
    email:employArr[index].email,
    salary:employArr[index].salary,
    joiningDate:employArr[index].joiningDate
  })
 
}

updateEmploy(index){

  const {employArr,currentIndex,fName,lName,email,salary,joiningDate} = this.state;

  let employDetails = {
    fName,
    lName,
    email,
    salary,
    joiningDate
  }

  employArr[index]=(employDetails);
  console.log(employArr);

  swal({
    title: "Done!",
    text: "Employ Details Edited!",
    icon: "success",
    button: "Ok",
  });

  this.setState({
    fName:"", 
    lName:"",
    email:"",
    salary:"",
    joiningDate:"",
    currentIndex:null
  })

}


delete(index){
const {employArr} = this.state;
employArr.splice(index,1)  
this.setState({
    // employArr:employArr.splice(index,1) // not working Y?
    employArr,
  })
console.log(index);
}

renderHead(){

return  <header> 
        <br/> <br/> 
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h1 className="App-title">Employees Data</h1>
        </header>
}

  render() {
    const {loginDiv,employData,addEmployDiv,currentIndex} = this.state;
    return (
      <div className="App">
      
      {this.renderHead()}
      {loginDiv === true && this.loginDiv()}
      <center>  

      {employData === true && this.employData()} 
      {currentIndex !== null && <p>Updating Employ # {currentIndex+1}</p>}
      { addEmployDiv === true && this.addEmployDiv() 
      
}   
      
      </center> 

      </div>
    );
  }
}

export default App;

// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
// // import Search from './screens/Search/Search'

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       todos: [],
//       text: '',
//       currentIndex: null
//     }

//     this.add = this.add.bind(this);
//     this.updateText = this.updateText.bind(this);
//     this.cancel = this.cancel.bind(this);
//   }

//   updateText(e) {
//     console.log("target value",e.target.value);
//     this.setState({text: e.target.value})
//     // console.log("text value",this.state.text);
//   }

//   add() {
//     const {text, todos} = this.state;
//     todos.push(text);
//     this.setState({todos, text: ''});
//   }

//   edit(index) {
//     const {todos} = this.state;
    
//     this.setState({text: todos[index], currentIndex: index})
//   }

//   delete(index) {
//     const {todos} = this.state;
//     todos.splice(index, 1);

//     this.setState({todos, currentIndex: null});
//   }

//   cancel() {
//     this.setState({text: '', currentIndex: null})
//   }

//   renderHeader() {
//     return (
//       <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Search</h1>
//       </header>
//     )
//   }

//   renderTodos() {
//     const {todos} = this.state;

//     return <ol>{todos.map((item, index) => {
//       return <li>
//         {item}
//         <button onClick={this.edit.bind(this, index)}>Edit</button>
//         <button onClick={this.delete.bind(this, index)}>Delete</button>
//       </li>
//     })}
//   </ol>
//   }

//   render() {
//     const {currentIndex} = this.state;

//     return (
//       <div className="App">
//         {this.renderHeader()}
//         <input 
//           placeholder="Enter something"
//           onChange={this.updateText}
//           value={this.state.text}
//           />
//         {currentIndex == null ? 
//           <button onClick={this.add}>Add</button>
//           : 
//           <div>
//             <button onClick={() => {}}>Update</button>
//             <button onClick={this.cancel}>Cancel</button>
//           </div>
//         }
//         <br/>
//         {currentIndex != null && <p>You editing item # {currentIndex + 1} currently!</p>}

//         {this.renderTodos()}
//       </div>
//     );
//   }
// }

// export default App;


