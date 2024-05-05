export type RGBColor = `rgb(${number}, ${number}, ${number})`
export type RGBAColor = `rgba(${number}, ${number}, ${number}, ${number})`
export type HEXColor = `#${string}`
export type Color = RGBColor | RGBAColor | HEXColor

export type PNG = `${string}.png` | `${string}.PNG`

export type PxSize = `${number}px`
export type RpxSize = `${number}rpx`
export type PercentageSize = `${number}%`
