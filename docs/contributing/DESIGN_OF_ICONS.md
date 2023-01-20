# Design of Icons

Our icons follow a few conventions to make everything simplier and consistent.

## Geometry

### SVG

Here are some resources that helps you understand how our [SVG](https://developer.mozilla.org/en-US/docs/Web/SVG) files are expected to be configured while designing icons.

The basic styleguides our icons follow are listed bellow:

- The path element should be aligned with the viewport's center.
- The size (`width` or `height`) of the path element cannot be more than `16` pixels.
- The path element can only have the [draw](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d) attribute and no other transformation or styles attributes, as showed in the [Draw Elements](#draw-elements) examples.

#### Viewport

> Note: The term "SVG viewport" differs from the term "viewport" used in CSS.

The **viewport** is the region of the SVG that is visible. An SVG can logically be as wide and high as desired, but only a portion of the content can be visible at any given moment. The visible region is referred to as the **viewport**.

You specify the size of the **viewport** using the `width` and `height` attributes of the SVG element. Here is an example:

```svg
<svg width="24" height="24"></svg>
```

This example defines a viewport with dimensions of `24` pixels wide by `24` pixels high. Which is our **default viewport**.

#### Coordinate System Units

The units you provide for the SVG element only impact its size (the viewport). The units you select for each shape define the size of the SVG shapes displayed in the SVG picture. If no units are supplied, pixels are used by default.

Here is a list of the units that are available for SVG elements:

| Units | Description                                                |
| ----- | ---------------------------------------------------------- |
| em    | The default font size - usually the height of a character. |
| ex    | The height of the character x                              |
| px    | Pixels (Default)                                           |
| pt    | Points (1 / 72 of an inch)                                 |
| pc    | Picas (1 / 6 of an inch)                                   |
| cm    | Centimeters                                                |
| mm    | Millimeters                                                |
| in    | Inches                                                     |

#### Viewbox

Adding a **viewBox** property to a viewport element alters the [user coordinate system](https://www.w3.org/TR/SVG2/coords.html#InitialCoordinateSystem) relative to the viewport coordinate system, as explained in the [viewBox attribute](https://www.w3.org/TR/SVG2/coords.html#ViewBoxAttribute).

```svg
<svg viewBox="0 0 24 24" width="24" height="24"></svg>
```

The above example is our **default viewBox**.

## Draw elements

While drawing icons, you may use a variety of [SVG elements](https://developer.mozilla.org/en-US/docs/Web/SVG/Element); however, before appending it to the JSON schema, all elements must be combined into a single [path](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path) element.

For example, the [rect element](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/rect) bellow:

```svg
<svg viewBox="0 0 24 24" width="24" height="24">
  <rect x="4" y="4" width="16" height="16"/>
</svg>
```

It should be converted into a single path.

```svg
<svg viewBox="0 0 24 24" width="24" height="24">
  <path d="M 4 4 H 20 V 20 H 4 V 4 Z"/>
</svg>
```

The same goes if you have multiple elements:

```svg
<svg viewBox="0 0 24 24" width="24px" height="24px">
  <rect x="4.01" y="4.01" width="8" height="8"/>
  <rect x="11.99" y="11.99" width="8" height="8"/>
</svg>
```

They all should be combined into one path:

```svg
<svg viewBox="0 0 24 24" width="24" height="24">
  <path d="M 4.01 4.01 L 12.01 4.01 L 12.01 11.99 L 19.99 11.99 L 19.99 19.99 L 11.99 19.99 L 11.99 12.01 L 4.01 12.01 Z"/>
</svg>
```

Fortunately, the most common SVG editors can accomplish this for you automatically 😋 ✨
