import Translation from 'libs/Translation'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Main = styled.div`
    height: 50px;
    width: fit-content;
    background-color: transparent;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

const Item = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    padding: 10px 12px;
    color: black;
    cursor: pointer;
    margin: 0px 5px;
    ${p => p.selected && `
        border: 1px solid rgb(14, 186, 197);
        background-color: rgb(14, 186, 197);
        color: white;
    `}
    ${p => p.disabled && `
        cursor: default;
        color: #8B8A8A;
        user-select: none;
    `}
    ${p => p.side && `
        border: 1px solid #8B8A8A;
    `}
`

const Pagination = ({ pageCount, changePage }) => {

    const [selected, setSelected] = useState(1)
    const [list, setList] = useState([]);

    useEffect(() => {
        let temp = []
        for(let i=0; i<pageCount; ++i) {
            temp.push(i+1);
        }
        setList(temp)
    }, [])

    const changeSelected = (id) => {
        changePage(id);
        setSelected(id);
    }

    return(
        <Main>
            <Item side={true} onClick={() => selected !== 1 ? changeSelected(selected - 1) : null} disabled={selected === 1}>{"<"}</Item>
            {
                list.map((r, i) =>
                    <Item onClick={() => changeSelected(i+1)} key={i} selected={i+1 === selected}>{Translation.n(r)}</Item>
                )
            }
            <Item side={true} onClick={() => selected !== list.length ? changeSelected(selected + 1) : null} disabled={selected === list.length}>{">"}</Item>
        </Main>
    );
}

export default Pagination;