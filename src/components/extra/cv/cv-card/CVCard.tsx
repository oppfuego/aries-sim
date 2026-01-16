import React from "react";
import styles from "./CVCard.module.scss";

interface CVCardProps {
    title: string;
    description: string;
    pdf: string;
    preview: string;
}

const CVCard: React.FC<CVCardProps> = ({ title, description, pdf, preview }) => {
    return (
        <div className={styles.card}>
            <a href={pdf} target="_blank" rel="noopener noreferrer" className={styles.preview}>
                <img src={preview} alt={title} className={styles.img} />
            </a>

            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>

            <a href={pdf} download className={styles.button}>
                Download PDF
            </a>
        </div>
    );
};

export default CVCard;
