// Geometry helpers for icon sources. All coordinates are in the 24×24 grid.

const n = (v) => +v.toFixed(2);

/** Four-point sparkle with concave sides. k controls how pinched the waist is. */
export function star(cx, cy, r, k = 0.22) {
  const c = k * r;
  return [
    `M${n(cx)} ${n(cy - r)}`,
    `Q${n(cx + c)} ${n(cy - c)} ${n(cx + r)} ${n(cy)}`,
    `Q${n(cx + c)} ${n(cy + c)} ${n(cx)} ${n(cy + r)}`,
    `Q${n(cx - c)} ${n(cy + c)} ${n(cx - r)} ${n(cy)}`,
    `Q${n(cx - c)} ${n(cy - c)} ${n(cx)} ${n(cy - r)}Z`,
  ].join('');
}

/** Regular polygon with `sides` sides, circumradius r, first vertex at `rotDeg` (0 = pointing right). */
export function poly(cx, cy, r, sides, rotDeg = 0) {
  const pts = [];
  for (let i = 0; i < sides; i++) {
    const a = ((rotDeg + (360 / sides) * i) * Math.PI) / 180;
    pts.push(`${n(cx + r * Math.cos(a))} ${n(cy + r * Math.sin(a))}`);
  }
  return `M${pts.join('L')}Z`;
}

/** Gear outline: `teeth` teeth, tip radius rO, root radius rI, half-angles (rad) of tooth tip and base. */
export function gear(cx, cy, teeth, rO, rI, tipHalf, baseHalf) {
  const pt = (r, a) => `${n(cx + r * Math.cos(a))} ${n(cy + r * Math.sin(a))}`;
  const step = (2 * Math.PI) / teeth;
  let d = '';
  for (let i = 0; i < teeth; i++) {
    const a = -Math.PI / 2 + i * step;
    if (i === 0) d += `M${pt(rI, a - baseHalf)}`;
    d += `L${pt(rO, a - tipHalf)}`;
    d += `A${rO} ${rO} 0 0 1 ${pt(rO, a + tipHalf)}`;
    d += `L${pt(rI, a + baseHalf)}`;
    d += `A${rI} ${rI} 0 0 1 ${pt(rI, a + step - baseHalf)}`;
  }
  return d + 'Z';
}
