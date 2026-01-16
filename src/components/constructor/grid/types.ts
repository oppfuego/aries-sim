import { CSSProperties, ReactNode } from "react";

export interface GridProps {
    title?: string;
    description?: string;

    columns?: number;
    gap?: string;
    alignItems?: CSSProperties["alignItems"];
    justifyItems?: CSSProperties["justifyItems"];
    style?: CSSProperties;

    children: ReactNode;
}
