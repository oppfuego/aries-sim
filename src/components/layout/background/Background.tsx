"use client";

import React from "react";
import styles from "./Background.module.scss";
import { RiSimCardLine } from "react-icons/ri";
import { HiOutlineGlobeAlt } from "react-icons/hi";

const ICONS = [
    <RiSimCardLine />,
    <HiOutlineGlobeAlt />,
];

const ITEMS_COUNT = 18;

const Background = () => {
    return (
        <div className={styles.layer}>
            {Array.from({ length: ITEMS_COUNT }).map((_, i) => {
                const icon = ICONS[i % ICONS.length];

                const style = {
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 10}s`,
                    animationDuration: `${12 + Math.random() * 10}s`,
                    fontSize: `${20 + Math.random() * 24}px`,
                    opacity: 0.08 + Math.random() * 0.15,
                };

                return (
                    <span key={i} className={styles.icon} style={style}>
            {icon}
          </span>
                );
            })}
        </div>
    );
};

export default Background;