import React from "react";

class Guide extends React.Component{
 
    render(){
        const guides = [
/*0*/       'You can select any square in the green area.', 
/*1*/       ''
        ];
        return(
            <Container>
                <p>Each player controls 5 squares in the middle. On each turn, a player selects
                    a square from his controlled squares 
                </p>
            </Container>
        );
    }
    
}
export default Guide;