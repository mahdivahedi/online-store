import React from 'react'
import styled from 'styled-components'

import Translation from 'libs/Translation'
import Text from '../Text'

const Main = styled.div`
    .success {
        font-size: 16px;
        color: green;
    }
    .error {
        font-size: 16px;
        color: red;
    }
`

const ModalText = ({ valid }) => {
    return(
        <Main>
            {
                valid ?
                <Text className="success">{Translation.t('label.modal.success')}</Text> :
                <Text className="error">{Translation.t('label.modal.error')}</Text>
            }
        </Main>
    );
}

export default ModalText;