import styled from "styled-components";
import { GradientColors } from "./gradients";

export interface FancyProps {
	colors: GradientColors;
}

export const FancyBackground = styled.div<FancyProps>`
	background: ${(props) => props.colors.first || "#bdc3c7"};
	background: -webkit-linear-gradient(
		to right,
		${(props) => props.colors.first},
		${(props) => props.colors.second}
	);
	background: linear-gradient(
		to right,
		${(props) => props.colors.first},
		${(props) => props.colors.second}
	);
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: calc(10px + 2vmin);
	color: white;
`;

export const FancyInput = styled.input<FancyProps>`
	background: transparent;
	font-size: 42px;
	transition: all 0.3s;
	border: none;
	border-bottom: 0.3rem solid transparent;
	outline-width: 0;
	color: ${(props) => props.colors.first};

	&:focus {
		outline-width: 0;
		border-bottom: 0.3rem solid ${(props) => props.colors.first};
	}
`;

export const FancySelect = FancyInput.withComponent("select");

export const FancyButton = styled(FancyInput)<FancyProps>`
	margin: 10px 0;
	border: 0.3rem solid ${(props) => props.colors.first};
	border-radius: 9px;
	color: ${(props) => props.colors.first};
	width: 100%;

	&:hover {
		background-color: rgba(41.2%, 41.2%, 41.2%, 30%);
	}
`;

export default FancyBackground;
