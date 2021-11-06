import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Translation from 'libs/Translation';
import Text from './../Text/index';

import { postAPI } from 'redux/core/actions';
import ToastManager from './../../libs/ToastManager';
import { changeMoney } from './../../redux/user/actions';

const FormContainer = styled.div`
    margin-top: 30px;
    display: flex;
    align-items: center;
    flex-direction: column;
`

const FormItem = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    margin-bottom: 15px;
    ${p => p.error && `
        border: 2px solid red;
    `}
    ${p => p.success && `
        border: 2px solid green;
    `}
    border-radius: 4px;
    .input {
        background-color: white;
        padding: 10px;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        height: 45px;
    }
`

const NameContainer = styled.div`
    background-color: rgb(14, 186, 197);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 45px;
    color: white;
    font-size: 16px;
    padding: 10px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
`

const FormBox = styled.div`
    padding: 0px 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .count-text {
        margin-top: 15px;
        margin-bottom: 10px;
    }
`

const Main = styled.div`
    margin: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const Button = styled.div`
    margin-top: 30px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 30px;
    background-color: rgb(255, 200, 10);
    color: black;
    border-radius: 24px;
    padding: 20px 10px;
    box-shadow: 0 4px 8px 0 rgba(255, 200, 10, 0.2), 0 6px 20px 0 rgba(255, 200, 10, 0.2);
`

const BuyProductModal = ({ id, price, user, inventory, postAPI, changeMoney }) => {

    const [count, setCount] = useState()

    const changePrice = (e) => {
        setCount(e.target.value)
    }

    const BuyProduct = () => {
        if( count * price <= user.profile.money && count <= inventory) {
            postAPI('buyProduct', { productId: id, quantity: count, username: user.profile.email }).then(res => {
                ToastManager.show(`محصول با موفقیت خریداری شد`, 'success')
                changeMoney(user.profile.money - price).then(res => {
                }).catch(err => {
                })
            }).catch(err => {
                ToastManager.show(`خریداری محصول ناموفق بود`, 'error')
            })
        } else {
            ToastManager.show(`خریداری محصول ناموفق بود`, 'error')
        }
    }

    return(
        <Main>
            <FormContainer>
                <FormBox>
                    <FormItem>
                        <NameContainer>
                            {Translation.t('label.modal.count')}
                        </NameContainer>
                        <input
                            className="input count"
                            type="number"
                            required={true}
                            value={count}
                            onChange={changePrice}
                            placeholder={Translation.t('label.placeholder.count')}/>
                    </FormItem>
                    <Text className="count-text">
                        {`${Translation.t('label.modal.finalPrice')}` + " : "}
                        { count * price }
                    </Text>
                </FormBox>
            </FormContainer>
            <Button  onClick={BuyProduct}>
                {Translation.t('label.modal.buyProduct')}
            </Button>
        </Main>
    );
}

/* Props ========================================= */
BuyProductModal.propTypes = {
    user: PropTypes.object,
    fixedTheme: PropTypes.string,
};

BuyProductModal.defaultProps = {
    fixedTheme: 'transparent'
};

/* Export ===================================== */
const mapStateToProps = store => ({
    user: store.user,
    core: store.core
});

// Any actions to map to the component?
const mapDispatchToProps = {
    postAPI,
    changeMoney
};

/* Export ===================================== */
export default connect(mapStateToProps, mapDispatchToProps)(BuyProductModal);
