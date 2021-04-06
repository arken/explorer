/*
 * Literally just a link that open in a new tab. Got tired of adding target and
 * rel props to what ends up being the majority of anchors in the app.
 */
import React from "react";

type NewTabLinkProps = {
  children: React.ReactNode;
  [rest: string]: any;
};

const NewTabLink = ({ children, ...rest }: NewTabLinkProps) => (
  <a {...rest} target={"_blank"} rel={"noreferrer"}>
    {children}
  </a>
);

export default NewTabLink;
