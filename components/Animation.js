export const fadeIn = {
  transition: {
    type: "spring",
    delay: 0,
    stiffness: 500,
    damping: 60,
    mass: 5,
  },
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const colorGradient = {
  animate: {
    backgroundColor: ["#a14af0", "#f04a80", "#f0874a"],
  },
  transition: {
    duration: 4,
    yoyo: Infinity,
  },
  backgroundColor: "rgb(23, 43, 77)",
};
