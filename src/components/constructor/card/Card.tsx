"use client";

import React from "react";
import Media from "../image/Media";
import styles from "./Card.module.scss";
import { StaticImageData } from "next/image";
import ButtonUI from "@/components/ui/button/ButtonUI";
import { FaArrowRight } from "react-icons/fa6";
import { renderIcon } from "@/utils/renderIcon";

interface CardProps {
    image?: string | StaticImageData;
    icon?: string | React.ReactNode;
    title: string;
    description: string;
    buttonText?: string;
    buttonLink?: string;
}

const Card: React.FC<CardProps> = ({
                                       image,
                                       icon,
                                       title,
                                       description,
                                       buttonText,
                                       buttonLink,
                                   }) => {
    const isImageCard = Boolean(image);

    return (
        <div
            className={`${styles.card} ${
                isImageCard ? styles.imageCard : styles.iconCard
            }`}
        >
            {/* 🖼 IMAGE MODE */}
            {isImageCard && (
                <div className={styles.imageWrapper}>
                    <Media
                        src={image!}
                        type="image"
                        alt={title}
                        width="100%"
                        height="100%"
                        objectFit="cover"
                    />
                </div>
            )}

            {/* 🔹 ICON MODE */}
            {!isImageCard && icon && (
                <div className={styles.iconWrapper}>
                    <span className={styles.icon}>{renderIcon(icon)}</span>
                </div>
            )}

            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>

                {buttonText && buttonLink && (
                    <a href={buttonLink} className={styles.link}>
                        <ButtonUI
                            shape="rounded"
                            variant="plain"
                            size="sm"
                            color="secondary"
                            endIcon={<FaArrowRight />}
                            hoverColor="none"
                        >
                            {buttonText}
                        </ButtonUI>
                    </a>
                )}
            </div>
        </div>
    );
};

export default Card;
