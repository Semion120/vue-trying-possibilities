export default {
  mounted(el, binding) {
    const options = {
      rootMargin: '0px',
      threshold: 1.0,
    };
    var callback = (entries, observer) => {
      observer;
      if (entries[0].isIntersecting) {
        binding.value();
      }
    };
    var observer = new IntersectionObserver(callback, options);
    observer.observe(el);
  },
  name: 'intersection',
};
