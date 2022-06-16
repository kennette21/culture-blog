import React from "react";
import styled from "styled-components";
import { PieceCategory } from "../../eventStore";
import { GradientColors } from "../../gradients";
import FancyBackground from "../../styles";
import Footer from "./Footer";
import Header from "./Header";

const Container = styled.div`
	text-align: center;
`;

interface AppContainerProps {
	colors: GradientColors;
	filter: string;
	showFilter: boolean;
	onChangeCategory: (cat: PieceCategory) => void;
}

const AppContainer: React.FC<AppContainerProps> = ({
	colors,
	filter,
	showFilter,
	onChangeCategory,
	children,
}) => {
	return (
		<Container>
            <FancyBackground colors={colors} className="App-content">
                <Header />
                {children}
                <Footer
                    colors={colors}
                    filter={filter}
                    showFilter={showFilter}
                    onChangeCategory={onChangeCategory}
                />
            </FancyBackground>
		</Container>
	);
};

export default AppContainer;
