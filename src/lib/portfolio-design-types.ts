export type DesignVariant = 'light' | 'dark';

export type DesignColors = {
	background: string; // HSL without hsl()
	foreground: string; // HSL without hsl()
	primary: string;    // HSL without hsl()
	accent: string;     // HSL without hsl()
};

export type DesignHeroBackground = {
	type: 'solid' | 'gradient' | 'radial' | 'conic' | 'mesh';
	from: string;
	to: string;
	via?: string;
	fromSize: number;
	toSize: number;
	viaSize?: number;
	fromOpacity: number;
	toOpacity: number;
	viaOpacity?: number;
	rotation?: number;
	animationType?: 'none' | 'pulse' | 'rotate' | 'float' | 'wave';
	animationSpeed?: number;
	blendMode?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'soft-light';
	shape?: 'circle' | 'ellipse' | 'square' | 'polygon';
	intensity?: number;
};

export type PortfolioDesignVariant = {
	colors: DesignColors;
	heroBackground: DesignHeroBackground;
	nameFont?: string; // maps to hero.nameFont
};

export type PortfolioDesign = {
	id: string;
	title: string;
	description: string;
	tags: string[];
	light: PortfolioDesignVariant;
	dark: PortfolioDesignVariant;
};

