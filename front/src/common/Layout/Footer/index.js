import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux';

// Components

// Layout
import Container from './../Container/index';

// Constants and libs
import Translation from 'libs/Translation';
import APP_CONSTANTS from 'constants/app';
import Text from '@/components/Text';
import Icon from '@/components/Icon';
import CustomLink from '@/components/Link';

// styles
const Main = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 200px;
    background-color: rgb(49, 52, 54);
    color: white;
    user-select: none;
`

const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    .text {
        color: rgb(114, 120, 125);
        font-size: 16px;
    }
`

/* Footer Component ================================== */
const Footer = ({ }) => {

    return(
        <Main>
            <Container>
                <MainContainer>
                    <Text className="text">{Translation.t('label.footer')}</Text>
                </MainContainer>
            </Container>
        </Main>
    );
}

/* Props ========================================= */
Footer.propTypes = {
};

Footer.defaultProps = {
};

/* Export ===================================== */
const mapStateToProps = store => ({
});

// Any actions to map to the component?
const mapDispatchToProps = {
};

/* Export ===================================== */
export default connect(mapStateToProps, mapDispatchToProps)(Footer);