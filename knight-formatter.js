const s = `;=xE P;=yE P;=i~1W>^x 2=i+1iO+0>y%+x%--/i x iTx x`;

let c = s;

function f() {
  if (!c) return null;
  if (" \t\r\n".includes(c[0])) {
    const t = c[0];
    c = c.slice(1);
    const r = f();
    return r === null
      ? t
      : Array.isArray(r)
      ? [t + r[0], ...r.slice(1)]
      : t + r;
  }

  const funcTypes = [
    /^((['"]).*?\2|\d+|[TFNPR][A-Z_]*|[_a-z][_a-z0-9]*)/, // nilads
    /^([~!:]|[OLADBCQ][A-Z_]*)/, // monads
    /^([+\-*\/%^<>?&|;=W]|[W][A-Z_]*)/, // dyads
    /^[IG][A-Z_]*/, // triads
    /^S[A-Z_]*/, // tetrads
  ];

  for (const idx in funcTypes) {
    const match = c.match(funcTypes[idx]);
    if (match) {
      c = c.slice(match[0].length);
      return +idx === 0
        ? match[0]
        : [match[0], ...[...Array(+idx)].map(() => f())];
    }
  }
}

console.log(f());