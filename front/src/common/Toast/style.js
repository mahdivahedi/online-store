import styled from 'styled-components';

export const Wrapper = styled.div`
	position: fixed;
	z-index: 2000;
	bottom: 10px;
	left: 0;
	right: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
	justify-content: center;
	pointer-events: none;

	.toast {
		margin-bottom: 10px;
	}
	
`;

export const ToastWrapper = styled.div`
	
	padding: 10px;
	border-radius: 5px;
	min-width: 150px;
	text-align: center;

	${p => p.type === 'error' ? `
		background-color: red;

	` : p.type === 'success' ? `
		background-color: green;

	` : `
		background-color: grey;
	`}
`;