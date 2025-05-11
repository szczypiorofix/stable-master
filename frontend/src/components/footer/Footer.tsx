import { JSX, PropsWithChildren } from 'react';

type FooterProps = PropsWithChildren;

export function Footer(props: FooterProps): JSX.Element {
    return <footer>{props.children}</footer>;
}
