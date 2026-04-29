import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function IconBase({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ChevronUp(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m6 15 6-6 6 6" />
    </IconBase>
  );
}

export function ChevronDown(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m6 9 6 6 6-6" />
    </IconBase>
  );
}

export function ChevronLeft(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m15 18-6-6 6-6" />
    </IconBase>
  );
}

export function ChevronRight(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m9 18 6-6-6-6" />
    </IconBase>
  );
}

export function GripHorizontal(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M8 9h8" />
      <path d="M8 15h8" />
    </IconBase>
  );
}

export function GripVertical(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M9 8v8" />
      <path d="M15 8v8" />
    </IconBase>
  );
}

export function PanelRightOpen(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M15 3v18" />
      <path d="m8 9 3 3-3 3" />
    </IconBase>
  );
}

export function PanelRightClose(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M15 3v18" />
      <path d="m11 9-3 3 3 3" />
    </IconBase>
  );
}

export function PanelBottomOpen(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 15h18" />
      <path d="m9 8 3-3 3 3" />
    </IconBase>
  );
}

export function PanelBottomClose(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 15h18" />
      <path d="m9 11 3 3 3-3" />
    </IconBase>
  );
}
