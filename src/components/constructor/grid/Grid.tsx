"use client";

import React from "react";
import styles from "./Grid.module.scss";
import Text from "@/components/constructor/text/Text";
import { GridProps } from "./types";

const Grid: React.FC<GridProps> = ({
                                       title,
                                       description,
                                       columns = 12,
                                       gap = "16px",
                                       alignItems = "stretch",
                                       justifyItems = "stretch",
                                       style,
                                       children,
                                   }) => {
    return (
        <div className={styles.wrapper}>
            {(title || description) && (
                <Text
                    title={title}
                    description={description}
                    centerTitle
                    centerDescription
                />
            )}

            <div
                className={styles.grid}
                style={{
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    gap,
                    alignItems,
                    justifyItems,
                    ...style,
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default Grid;