export type AlignmentKey = "left" | "center" | "right";

export interface AlignmentResult {
    title: string;
    description: string;
    quote: string;
    glyph: string[];
}

export interface AlignmentResults {
    left: AlignmentResult;
    center: AlignmentResult;
    right: AlignmentResult;
}

export interface AxisResult {
    title: string;
    description: string;
    quote: string;
    glyph: string[];
}

export interface AxisStat {
    sign: string;
    percent: number;
    id: string;
}
