import React, { useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import { connect } from 'react-redux';
import styled, {keyframes} from 'styled-components'
import PropTypes from 'prop-types';
import Router from 'next/router';

// Components

// Constants and libs
import Translation from './../../../libs/Translation';
import ModalManager from 'libs/ModalManager';
import APP_CONSTANTS from 'constants/app';

import { getInfo } from 'redux/core/actions';

// Layout
import Container from 'common/Layout/Container';

import { getAPI } from 'redux/core/actions';
import Icon from '@/components/Icon';
import Text from '@/components/Text';
import CustomLink from '@/components/Link';
import { logoutAction } from 'redux/user/actions';

const Main = styled.div`
    z-index: 10000;
    width: 100%;
    height: 65px;
    border: 1px solid black;
    background-color: white !important;
`

const MainContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: black;
`

const ItemsContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`

const Item = styled.div`
    margin: 0px 25px;
    cursor: pointer;
    ${p => p.mainLogo && `
        color: rgb(14, 186, 197);
        font-size: 19.2px;
        margin: 0px;
        margin-left: 25px;
    `}
    &:hover {
        color: rgb(14, 186, 197);
    }
`

const LoginButtonContainer = styled.div`
    position: relative;
    &:hover {
        .loginButton {
            background-color: rgb(255, 200, 10);
        }
    }
    .name-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`

const LoginButton = styled.div`
    position: relative;
    border-radius: 24px;
    padding: 10px 20px;
    width: 135px;
    border: 2px solid rgb(255, 200, 10);
    cursor: pointer;
    z-index: 100;
    &:hover {
        background-color: rgb(255, 200, 10);
    }
`

const MenuContainer = styled.div`
    background-color: rgb(238, 238, 238);
    width: 135px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    margin-top: -20px;
    padding-top: 30px;
    padding-bottom: 10px;
    z-index: auto;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
    @keyframes trans {
        from {
            opacity: 0%;
        }
        to {
            opacity: 100%;
        }
    }
    animation: trans 0.5s;
`

const MenuItem = styled.div`
    width: 135px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0px;
    cursor: pointer;
    &:hover {
        background-color: rgb(247, 247, 247);
    }
`

/* Header Component ================================== */
const Header = ({ query, main, user, logoutAction }) => {

    const list = [
        {id: 0, name: 'فروشگاه'},
        {id: 1, name: 'صفحه اول'},
        {id: 2, name: 'تماس با ما'},
        {id: 3, name: 'پشتیبانی'},
        {id: 4, name: 'محصولات'},
    ]

    const dropDownItems = [
        {id: 0, name: 'پروفایل', link: 'profile'},
        {id: 1, name: 'خروج از حساب', link: 'home'},
    ]

    const [menu, setMenu] = useState(0);

    const openMenu = () => {
        // if (user.authentication.status === APP_CONSTANTS.AUTH_STATUS.AUTHENTICATED) {
            setMenu(1);
        // }
    }

    const closeMenu = () => {
        setMenu(0);
    }

    const userLogout = () => {
        logoutAction().then(res => {}).catch(err => {})
        Router.push('/')
    }

    return(
        <Main>
            <Container>
                <MainContainer className="mainContainer">
                    <ItemsContainer>
                        {
                            list.map((r, i) =>
                                r.id == 0 ?
                                <CustomLink to={"home"}>
                                    <Item key={r.id} mainLogo={true}>
                                        <Text>{r.name}</Text>
                                    </Item>
                                </CustomLink> :
                                r.id === 4 ?
                                <CustomLink to={"home"} params={{id: 0}}>
                                    <Item key={r.id}>
                                        <Text>{r.name}</Text>
                                    </Item>
                                </CustomLink> :
                                <CustomLink to={"home"}>
                                    <Item key={r.id}>
                                        <Text>{r.name}</Text>
                                    </Item>
                                </CustomLink>
                            )
                        }
                    </ItemsContainer>
                    <LoginButtonContainer>
                        <LoginButton className="loginButton" onMouseEnter={openMenu} onMouseLeave={closeMenu}>
                            {
                                user.authentication.status === APP_CONSTANTS.AUTH_STATUS.NOT_AUTHENTICATED ?
                                <Text>ورود / ثبت نام</Text> :
                                <div className="name-container">
                                    <Text>{user.profile.firstName}</Text>
                                    <Icon
                                        width={"20px"}
                                        height={"20px"}
                                        name={"chevronDown"}/>
                                </div>
                            }
                        </LoginButton>
                        {
                            menu ?
                            <MenuContainer onMouseEnter={openMenu} onMouseLeave={closeMenu}>
                                {
                                  dropDownItems.map((r, i) =>
                                          r.id === 0 ?
                                          <CustomLink to={r.link}>
                                              <MenuItem key={r.id}>
                                                  {r.name}
                                              </MenuItem>
                                          </CustomLink> :
                                          <MenuItem key={r.id} onClick={userLogout}>
                                              {r.name}
                                          </MenuItem>
                                  )
                              }
                            </MenuContainer> : null
                        }
                    </LoginButtonContainer>
                </MainContainer>
            </Container>
        </Main>
    );
}

/* Props ========================================= */
Header.propTypes = {
    user: PropTypes.object,
    fixedTheme: PropTypes.string,
};

Header.defaultProps = {
    fixedTheme: 'transparent'
};

/* Export ===================================== */
const mapStateToProps = store => ({
    user: store.user,
    core: store.core
});

// Any actions to map to the component?
const mapDispatchToProps = {
    getInfo,
    getAPI,
    logoutAction
};

/* Export ===================================== */
export default connect(mapStateToProps, mapDispatchToProps)(Header);
