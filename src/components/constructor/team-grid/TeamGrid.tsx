"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import styles from "./TeamGrid.module.scss";
import Text from "@/components/constructor/text/Text";
import Media from "@/components/constructor/image/Media";
import ButtonUI from "@/components/ui/button/ButtonUI";

interface TeamMember {
    name: string;
    role: string;
    bio: string;
    image: string;
    buttonText?: string;
    buttonLink?: string;
}

interface TeamGridProps {
    title?: string;
    description?: string;
    members: TeamMember[];
}

const TeamGrid: React.FC<TeamGridProps> = ({ title, description, members }) => {
    return (
        <section className={styles.section}>
            <motion.div
                className={styles.head}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <Text
                    title={title}
                    titleLevel={2}
                    description={description}
                    centerTitle
                    centerDescription
                />
            </motion.div>

            <div className={styles.sliderWrapper}>
                <Swiper
                    modules={[Autoplay, Pagination, Navigation]}
                    spaceBetween={30}
                    slidesPerView={3}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    pagination={{ clickable: true }}

                    navigation={true}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className={styles.slider}
                >
                    {members.map((m, i) => (
                        <SwiperSlide key={i}>
                            <motion.div
                                className={styles.memberCard}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.15, duration: 0.5 }}
                                viewport={{ once: true }}
                            >
                                <div className={styles.imageWrapper}>
                                    <Media
                                        src={m.image}
                                        type="image"
                                        width="100%"
                                        height="100%"
                                        alt={m.name}
                                        objectFit="cover"
                                    />
                                </div>

                                <div className={styles.info}>
                                    <h3>{m.name}</h3>
                                    <span className={styles.role}>{m.role}</span>
                                    <p>{m.bio}</p>

                                </div>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default TeamGrid;
