import React from "react";
import styled from "styled-components";
import { PieceCategory } from "../../eventStore";
import { GradientColors } from "../../gradients";
import { FancyProps } from "../../styles";
import CategorySelect from "./CategorySelect";
import { AiFillPlusCircle, AiOutlineSwitcher } from "react-icons/ai";
import { navigate } from "@reach/router";

const FooterComp = styled.div<FancyProps>`
	color: ${(props) => props.colors.first};
	font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
		"Lucida Sans", Arial, sans-serif;
	font-size: 42px;
	display: flex;
	justify-self: flex-end;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
`;

const ColorFlag = styled.div`
	font-size: 20px;
	color: black;
	background-color: sandybrown;
`;

const LeftSide = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
`;

const RightSide = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const ActionContainer = styled.div`
	margin-left: 12px;
`;

const TitleContianer = styled.div`
	margin-right: 12px;
`;

/***
 * adding users to the "the"
 *
 * add a dropdown component instead of the the.
 * The options are all the users in the culture blog
 *
 * When you select on you only see those users currated posts
 *
 * change the url to something like:
 * www.{the}.cultureblog.com
 * www.cultureblog.{the}.com
 * www.the.cultureblog.com/{the}/{category}
 * ??? probably the third is easiest
 *
 *
 */

interface Props {
	colors: GradientColors;
	filter: string;
	showFilter: boolean;
	onChangeCategory: (cat: PieceCategory) => void;
}

const Footer = (props: Props) => (
	<FooterComp colors={props.colors}>
		<LeftSide>
			<ActionContainer
				onClick={() =>
					navigate(props.showFilter ? "/create" : "/random")
				}
			>
				{props.showFilter ? (
					<AiFillPlusCircle
						style={{ display: "block" }}
						color={props.colors.second}
						size={"1em"}
					/>
				) : (
					<AiOutlineSwitcher
						style={{ display: "block" }}
						color={props.colors.second}
						size={"1em"}
					/>
				)}
			</ActionContainer>
			<ColorFlag
				onClick={() => {
					console.log("colors: ", props.colors);
				}}
			>
				SHIT COLORS
			</ColorFlag>
		</LeftSide>
		<RightSide>
			{props.showFilter && (
				<CategorySelect
					colors={props.colors}
					filter={props.filter}
					onChangeCategory={(cat: PieceCategory) =>
						props.onChangeCategory(cat)
					}
				/>
			)}
			<TitleContianer> culture blog</TitleContianer>
		</RightSide>
	</FooterComp>
);

export default Footer;
