// plugins in webpack are simply classes
class ExamplePlugin {
  // that have an apply method
  // allows the author of the plugin to hook into diff events and add functionality
  apply(compiler) {
    compiler.hooks.done.tap("run", () => {
      console.log("ExamplePlugin IS RUNNING");
    });
  }
}

module.exports = ExamplePlugin;
