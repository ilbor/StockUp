import styled from "styled-components"

const FollowStock = () =>{
    const follow = (ticker) =>{
        fetch("api/follow-ticker", {
            method: 'POST',
            headers:{
            'Content-type':'application/json',
            },
            body: JSON.stringify({tickerId: "58bf7fa8-2892-46dd-a0dc-0f95188acea1" , ticker: ticker})
        })
        .then((res) => res.json())
        .then((data) =>{               
        })                            
}
    return(
        <StyledButton onClick={() => follow()} >Follow stock</StyledButton>
    )
}

export default FollowStock;

const StyledButton = styled.button`
width: auto;
padding-left: 0.5vw;
padding-right: 0.5vw;
height: 3vh;
font-size: 15px;
border:none;
color: #F9F7F7;
border-radius: 5px;
font-weight: 2px;
background-color: #3F72AF;
&:hover {
    opacity: 0.7;
}

&:active {
    /* opacity: 0.8; */
    /* box-shadow: 0 5px #666; */
    transform: translateY(2px);
    }
`