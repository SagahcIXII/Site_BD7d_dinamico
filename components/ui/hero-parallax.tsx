"use client";

import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type Product = {
  title: string;
  link: string;
  thumbnail: string;
};

export const HeroParallax = ({ products }: { products: Product[] }) => {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );

  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);

  return (
    <div
      ref={ref}
      className="h-[300vh] py-40 overflow-hidden antialiased relative flex flex-col [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />

      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              key={product.title}
              product={product}
              translate={translateX}
            />
          ))}
        </motion.div>

        <motion.div className="flex flex-row space-x-20 mb-20">
          {secondRow.map((product) => (
            <ProductCard
              key={product.title}
              product={product}
              translate={translateXReverse}
            />
          ))}
        </motion.div>

        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product) => (
            <ProductCard
              key={product.title}
              product={product}
              translate={translateX}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

const Header = () => (
  <div className="max-w-7xl mx-auto py-20 px-4">
    <h1 className="text-5xl font-bold text-white">
      BD7D Solutions
      <br />
      <span className="text-emerald-400">Engenharia · Energia · Performance</span>
    </h1>
    <p className="max-w-2xl mt-6 text-neutral-300">
      Projetamos e implementamos soluções inteligentes para energia, construção,
      automação e performance, conectando engenharia ao resultado do seu negócio.
    </p>
  </div>
);

export const ProductCard = ({
  product,
  translate,
}: {
  product: Product;
  translate: MotionValue<number>;
}) => (
  <motion.div
    style={{ x: translate }}
    whileHover={{ y: -20 }}
    className="group h-80 w-[30rem] relative flex-shrink-0"
  >
    <Link href={product.link} className="block">
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={600}
        height={600}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </Link>

    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition"></div>

    <h2 className="absolute bottom-4 left-4 text-xl font-semibold text-white opacity-0 group-hover:opacity-100 transition">
      {product.title}
    </h2>
  </motion.div>
);