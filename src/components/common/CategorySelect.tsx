import React from "react";
import { Piece, PieceCategory } from "../../eventStore";
import { GradientColors } from "../../gradients";
import { FancySelect } from "../../styles";

type Props = {
	colors: GradientColors;
	filter: string;
	onChangeCategory: (category: PieceCategory) => void;
}; /* use `interface` if exporting so that consumers can extend */

const CategorySelect = ({
	colors,
	filter,
	onChangeCategory,
}: Props) => {
	return (
		<FancySelect
			colors={colors}
			value={filter}
			onChange={(e) => onChangeCategory(e.target.value as PieceCategory)} // todo generate options from PieceCategory
		>
			<option value="the">the</option>
			<option value="listen">listen</option>
			<option value="watch">watch</option>
			<option value="read">read</option>
			<option value="look">look</option>
			<option value="do">do</option>
		</FancySelect>
	);
};

export default CategorySelect;
