export default {
  methods: {
    formatPrice(value) {
      const centsFactor = 100;
      return value / centsFactor;
    }
  }
}