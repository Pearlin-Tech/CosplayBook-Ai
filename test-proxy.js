const createChainableMock = () => {
  const mock = new Proxy(() => {}, {
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
  return mock;
};
const p = createChainableMock();
async function run() {
  const res = await p.from('x').select('*').eq('id', 1).maybeSingle();
  console.log("Result:", res);
}
run();
