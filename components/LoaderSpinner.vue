<template>
  <div class="loader-spinner">
    <svg viewBox="0 0 50 50" class="spinner">
      <circle
        class="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke-width="4"
      />
    </svg>
  </div>
</template>

<style lang="scss" scoped>
.loader-spinner {
  display: inline-block;
  position: relative;
  width: 24px;
  height: 24px;

  .spinner {
    animation: rotate 2s linear infinite;
    width: 100%;
    height: 100%;
    
    .path {
      stroke: #ffffff;
      stroke-linecap: round;
      animation: dash 1.5s ease-in-out infinite;
    }
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
</style> 