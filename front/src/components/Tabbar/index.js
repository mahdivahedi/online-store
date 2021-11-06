import React, { useState } from 'react'
import styled from 'styled-components'

const Main = styled.div`
    width: fit-content;
    height: 50px;
    border-radius: 24px; 
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #A5A2A2;
    margin: 0px auto;
`

const Item = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    height: 50px;
    padding: 20px 10px;
    min-width: 120px;
    ${p => p.selected && `
        border-top: 2px solid #A5A2A2;
        border-bottom: 2px solid #A5A2A2;
        background-color: rgb(238, 238, 238);
        color: rgb(138, 138, 138);
    `}
    &:first-child {
        border-top-right-radius: 24px;
        border-bottom-right-radius: 24px;
    }
    &:last-child {
        border-top-left-radius: 24px;
        border-bottom-left-radius: 24px;
    }
`

const TabBar = ({ data, changeTab }) => {

    const [selected, setSelected] = useState(0);

    const changeSelected = (id) => {
        changeTab(id);
        setSelected(id);
    }

    return(
        <Main>
            {
                data.map((r, i) =>
                    <Item onClick={() => changeSelected(r.id)} key={i} selected={r.id === selected}>
                        {r.name}
                    </Item>
                )
            }
        </Main>
    );
}

export default TabBar;