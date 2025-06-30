import { ref, onMounted, onBeforeUnmount } from 'vue';

export function useIsMobile(threshold = 750) {
  const isMobile = ref(false);

  const checkScreenWidth = () => {
    isMobile.value = window.innerWidth < threshold;
  };

  onMounted(() => {
    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', checkScreenWidth);
  });

  return { isMobile };
}
