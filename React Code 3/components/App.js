import React from 'react';
import Search from "./Search"
import "../css/app.css"
class App extends React.Component {
    
    constructor(props){
        super(props)
        
    }
    
  render(){
      return (  
        <div className="App">
              <Search />
        </div>
      );
  }
}

export default App;
