/** The four `+` registration marks of a blueprint frame. The parent element
    draws the hairline border and must be position: relative. */
export function BlueprintCorners() {
  return (
    <>
      <i className="bp-corner tl" /><i className="bp-corner tr" />
      <i className="bp-corner bl" /><i className="bp-corner br" />
    </>
  )
}
