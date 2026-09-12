const createChainableMock = () => {
  return new Proxy(() => {}, {
    get: (target, prop) => {
      if (prop === 'then') {
        return (resolve) => resolve({ data: null, error: new Error('unavailable') });
      }
      return createChainableMock();
    },
    apply: () => {
      return createChainableMock();
    }
  });
};
const p = createChainableMock();
try {
  JSON.stringify(p);
  console.log("Success");
} catch(e) {
  console.log("Error:", e.message);
}
