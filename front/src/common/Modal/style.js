import styled from 'styled-components';

export default styled.div`
	position: fixed;
	z-index: 6000;
	width: 100vw;
	height: 100vh;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;

    padding-top: 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
	justify-content: center;
	

	.backdrop {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		background: rgba(10, 10, 10, 0.7);
		user-select: none;
		outline: none;
		animation: fade-in 180ms ease;
	}

	@keyframes fade-in {
		0%   { opacity: 0 }
		100% { opacity: 1 }
	}

	@keyframes slide-up {
		0%   { transform: translateY(20px); }
		100% { transform: translateY(0); }
	}

	.modal-box {
		position: relative;
		display: flex;
		flex-direction: column;
		width: 100vw;
		max-width: 100vw;
		max-height: 90vh;
		border-radius: 12px;

		border-radius: ${p => p.theme.border_radius.md};
		box-shadow: rgba(0, 0, 0, 0.28) 0px 8px 28px;
		background-color: #fff;

		animation: slide-up 200ms ease;

		> .head {
			border-bottom: 1px solid ${p => p.theme.border_color.l};
			padding: 0 64px;
			position: relative;
			height: 64px;
			min-height: 64px;
			display: flex;
    		justify-content: center;
    		align-items: center;
			text-align: center;
			line-height: 25px;
		}

		> .foot {
			padding: 0 24px 24px;
			margin: 0 -5px;
			/* text-align: center; */

			button {
				margin: 0 5px;
				width: 80px;
			}
		}

		> .content {
			padding: 24px;
			overflow: scroll;
		}

		> .message {
			padding: 32px 24px;
			overflow: scroll;
			/* text-align: center; */
		}
	}
	
	&.sm {
		.modal-box {
			max-width: 350px;
		}
	}

	&.md {
		.modal-box {
			max-width: 95vw;
			@media (min-width: ${p => p.theme.mobile_width}) {
				max-width: 500px;
			}
		}
	}

	&.lg {
		.modal-box {
			max-width: 1032px;
			height: 600px;
		}
	}

	.close-btn {
		cursor: pointer;
		position: absolute;
		display: flex;
		top: 0;
		right: 0;
		padding: 24px;

		@media (min-width: ${p => p.theme.breakpoint.sm}) {
			top: 0 !important;
		}
	}
`