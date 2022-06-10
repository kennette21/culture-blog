import React, { Component } from "react";
import styled from "styled-components";
import { PieceCategory } from "../../eventStore";
import { GradientColors } from "../../gradients";
import { FancyProps } from "../../styles";
import CategorySelect from "./CategorySelect";

const FooterComp = styled.div<FancyProps>`
	color: ${(props) => props.colors.first};
	font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
		"Lucida Sans", Arial, sans-serif;
	position: fixed;
	bottom: 0;
	right: 0;
	font-size: 42px;
	margin-top: 10px;
	margin-right: 10px;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	width: 100%;
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
		{props.showFilter && (
			<CategorySelect
				colors={props.colors}
				filter={props.filter}
				onChangeCategory={(cat: PieceCategory) =>
					props.onChangeCategory(cat)
				}
			/>
		)}
		<div> culture blog</div>
	</FooterComp>
);

export default Footer;
