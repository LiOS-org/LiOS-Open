# Connect 

`connect(node)` is a [StyleEngine](../style-engine.md) static method, which connects to the `node` to provide fluent styling for example:-

```JS
const block = main.child("div");

const style = ui.styleEngine.connect(block);

style.background("red").padding("5px").display("block");
```
## Why it is needed

It is first of all not "needed", `UI` module already have fully fledged [StyleEngine](../style-engine.md), specially [nodeMethods.style().set()](../node-methods/style.md) which will do all of your work but I wanna show you an example:-

```JS
block.style().set({
    background:"blue",
    padding:"5px",
    fontSize:"15px",
    justifySelf:"center"
});

// Multiply it with 10 or even 20
```
It will make your codebase look like a spaghetti and highly unreadable. `connect()` is intended to make styling more fluent, and because most of the `CSS` you will use standard properties, the error surface is not disastrous.

It also has a good side effect, because `connect()` returns JS methods, and if for some reason you wrote `justufySelf` instead of `justifySelf` which happens surprisingly often, you will catch the error while testing, but as mentioned a side effect, definitely not to encourage uses.


## How it works

Upon invoked, [StyleEngine](../style-engine.md) initiated an internal class which under the hood asks the browser for the `CSSDeclarations`:

```JS
const style = document.createElement("div").style; //For reference only, actual implementation might differ
```

Because the `CSSDeclarations` are key-value pairs, and keys are already in camelCase, [StyleEngine](../style-engine.md) uses it as it is, and creates property methods on the go (done only once).

After you invoke `connect()`, the internal class links the `ruleSheet` of the `node` to the dynamically generated methods.

Because all of this happens inside browser, and at runtime neither me (the author), nor you (the user) knows that which property is available and which are not, hence it is recommended to use [nodeMethods.style().set()](../node-methods/style.md), and use `connect` just for convenience.

## Limitations

Because of this dynamic and browser dependant behavior there are some intentional and obvious limitations.

1. No support for pseudo state:
   
   In order to encourage the use of [nodeMethods.style().set()](../node-methods/style.md), `connect()` is intentionally limited to normal styling pseudo state is not allowed.
2. Might be inconsistent:
   
   Browser history is fully of inconsistent standards implementations, and as mentioned before neither me or nor you know which properties are available. It will be wise to only use properties that are common and widely supported
3. Extra overhead:
   
   Even though it is the part of [StyleEngine](../style-engine.md), every invocation of `connect()` initiates an additional instance of internal class, on top of critical classes (at least 3, just after initialization of `UI` module)