import styled from "styled-components"

const FollowStock = ({currentStock, email}) =>{
    const follow = (ticker) =>{
        fetch("/api/follow-ticker", {
            method: 'POST',
            headers:{
            'Content-type':'application/json',
            },
            body: JSON.stringify({ticker: currentStock, email: email})
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        })
}
    return(
        <StyledButton onClick={() => follow(currentStock, email)} >Follow stock</StyledButton>
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