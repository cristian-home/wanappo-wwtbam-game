const zoomIn = {
  initial: {
    opacity: 0,
    scale: 0,
  },
  enter: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 500,
    },
  },
  leave: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 500,
    },
  },
}

const slideLeftIn = {
  initial: {
    opacity: 0,
    transform: 'translateX(100%)',
  },
  enter: {
    opacity: 1,
    transform: 'translateX(0%)',
    transition: {
      duration: 500,
    },
  },
  leave: {
    opacity: 0,
    transform: 'translateX(100%)',
    transition: {
      duration: 500,
    },
  },
}

const appear = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 500,
    },
  },
  leave: {
    opacity: 0,
    transition: {
      duration: 500,
    },
  },
}

export const motions = {
  zoomIn,
  slideLeftIn,
  appear,
}
