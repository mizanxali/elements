export function fibonacciSphere(n: number): [number, number, number][] {
  if (n <= 0) return [];
  if (n === 1) return [[0, 0, 0]];
  const points: [number, number, number][] = [];
  const phi = Math.PI * (Math.sqrt(5) - 1);
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    points.push([Math.cos(theta) * r, y, Math.sin(theta) * r]);
  }
  return points;
}

export function packedSphere(n: number): [number, number, number][] {
  if (n <= 0) return [];
  if (n === 1) return [[0, 0, 0]];

  if (n === 2) {
    return [
      [-0.28, 0, 0],
      [0.28, 0, 0],
    ];
  }

  if (n === 3) {
    return [
      [0, 0.32, 0],
      [-0.28, -0.16, 0],
      [0.28, -0.16, 0],
    ];
  }

  if (n === 4) {
    const s = 0.28;
    return [
      [s, s, s],
      [-s, -s, s],
      [-s, s, -s],
      [s, -s, -s],
    ];
  }

  const cell = 0.6;
  const basis: [number, number, number][] = [
    [0, 0, 0],
    [0.5, 0.5, 0],
    [0.5, 0, 0.5],
    [0, 0.5, 0.5],
  ];
  const extent = Math.ceil(Math.cbrt(n) * 1.8);
  const candidates: [number, number, number][] = [];

  for (let x = -extent; x <= extent; x += 1) {
    for (let y = -extent; y <= extent; y += 1) {
      for (let z = -extent; z <= extent; z += 1) {
        basis.forEach(([bx, by, bz]) => {
          candidates.push([(x + bx) * cell, (y + by) * cell, (z + bz) * cell]);
        });
      }
    }
  }

  const points = candidates
    .sort((a, b) => {
      const ar = a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
      const br = b[0] * b[0] + b[1] * b[1] + b[2] * b[2];
      return ar - br;
    })
    .slice(0, n);

  const center = points.reduce(
    (acc, point) => {
      acc[0] += point[0];
      acc[1] += point[1];
      acc[2] += point[2];
      return acc;
    },
    [0, 0, 0] as [number, number, number],
  );

  center[0] /= n;
  center[1] /= n;
  center[2] /= n;

  return points.map(([x, y, z]) => [x - center[0], y - center[1], z - center[2]]);
}
