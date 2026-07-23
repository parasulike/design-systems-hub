import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

export type ButtonHierarchy =
  | "primary"
  | "secondary"
  | "secondaryGray"
  | "tertiaryGray";

export type ButtonSize = "sm" | "md" | "lg" | "xl";

type SharedProps = {
  children: ReactNode;
  className?: string;
  hierarchy?: ButtonHierarchy;
  leadingIcon?: ReactNode;
  size?: ButtonSize;
  trailingIcon?: ReactNode;
};

type ButtonProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type ButtonLinkProps = SharedProps & {
  href: string;
  target?: string;
  rel?: string;
};

function classes(hierarchy: ButtonHierarchy, size: ButtonSize, className?: string) {
  return [styles.button, styles[hierarchy], styles[size], className].filter(Boolean).join(" ");
}

function ButtonContent({
  children,
  leadingIcon,
  trailingIcon,
}: Pick<SharedProps, "children" | "leadingIcon" | "trailingIcon">) {
  return (
    <>
      {leadingIcon}
      <span>{children}</span>
      {trailingIcon}
    </>
  );
}

export function Button({
  children,
  className,
  hierarchy = "primary",
  leadingIcon,
  size = "md",
  trailingIcon,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={classes(hierarchy, size, className)} {...props}>
      <ButtonContent leadingIcon={leadingIcon} trailingIcon={trailingIcon}>
        {children}
      </ButtonContent>
    </button>
  );
}

export function ButtonLink({
  children,
  className,
  hierarchy = "primary",
  href,
  leadingIcon,
  size = "md",
  trailingIcon,
  target,
  rel,
}: ButtonLinkProps) {
  const content = (
    <ButtonContent leadingIcon={leadingIcon} trailingIcon={trailingIcon}>
      {children}
    </ButtonContent>
  );
  const classNames = classes(hierarchy, size, className);

  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} className={classNames} target={target} rel={rel}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classNames}>
      {content}
    </Link>
  );
}
