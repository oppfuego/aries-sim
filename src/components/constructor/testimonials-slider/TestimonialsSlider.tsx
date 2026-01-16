"use client";

import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination, Autoplay} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import styles from "./TestimonialsSlider.module.scss";
import {media} from "@/resources/media";

interface Testimonial {
    name: string;
    image: keyof typeof media;
    text: string;
}

interface Props {
    title: string;
    description: string;
    testimonials: Testimonial[];
}

export default function TestimonialsSlider({
                                               title,
                                               description,
                                               testimonials,
                                           }: Props) {
    return (
        <section className={styles.wrapper}>
            <div className={styles.header}>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>

            <div className={styles.content}>
                <Swiper
                    className={styles.slider}
                    modules={[Pagination, Autoplay]}
                    pagination={{clickable: true}}
                    autoplay={{delay: 6000, disableOnInteraction: false}}
                    loop
                >
                    {testimonials.map((item, i) => (
                        <SwiperSlide key={i}>
                            <div className={styles.card}>
                                <div className={styles.user}>
                                    <img
                                        src={media[item.image].src}
                                        alt={item.name}
                                    />
                                    <span>{item.name}</span>
                                </div>

                                <p className={styles.text}>{item.text}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className={styles.trust}>
                    <div className={styles.trustTitle}>Trustpilot</div>

                    <div className={styles.stars}>
                        {Array.from({length: 5}).map((_, i) => (
                            <span key={i}>★</span>
                        ))}
                    </div>

                    <div className={styles.trustMeta}>
                        <strong>TrustScore 4.8</strong>
                        <span>251 reviews</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
