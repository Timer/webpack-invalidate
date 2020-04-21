console.log("init Child");

export const isGood = "ab";

const currentExports = module.__proto__.exports || {};
const prevExports = (module.hot.data && module.hot.data.prevExports) || null;

if (currentExports.isGood) {
  module.hot.dispose((data) => {
    data.prevExports = currentExports;
  });
  module.hot.accept();

  if (prevExports !== null) {
    if (prevExports.isGood[0] !== currentExports.isGood[0]) {
      console.log(module.id, "invalidating due to signature change");
      module.hot.invalidate();
    } else {
      console.log(module.id, "is updated OK");
    }
  }
} else {
  if (prevExports !== null) {
    console.log(module.id, "invalidating due to no longer being a boundary");
    module.hot.invalidate();
  }
}
