interface ShadyCSS {
  nativeCss: boolean;
  nativeShadow: boolean;
  styleElement(host: Element, overrideProps?: {[key: string]: string}): void;
  prepareTemplateDom(template: Element, elementName: string): void;
  prepareTemplateStyles(
      template: Element, elementName: string, typeExtension?: string): void;
  getComputedStyleValue(template: Element, property: string): void;
}

interface ShadyDOM {
  inUse: boolean;
}

declare global {
  interface Window {
    ShadyCSS?: ShadyCSS;
    ShadyDOM?: ShadyDOM;
    ShadowRoot: new() => ShadowRoot;
  }
}

/** Allows code to check `instanceof ShadowRoot`. */
declare type ShadowRootConstructor = new() => ShadowRoot;
export declare const ShadowRoot: ShadowRootConstructor;

export const stripExpressionDelimiters = (html: string) => html.replace(/<!---->/g, '');

export const nextFrame = () => new Promise(yay => requestAnimationFrame(yay));

export const getComputedStyleValue = (element: Element, property: string) =>
  window.ShadyCSS
    ? window.ShadyCSS!.getComputedStyleValue(element, property)
  : getComputedStyle(element).getPropertyValue(property);

export const shadowQuery =
  (target: Element | HTMLElement, selector: string) =>
    target.shadowRoot!.querySelector<HTMLElement>(selector)!;

export const shadowQueryAll =
  (target: Element | HTMLElement, selector: string) =>
    Array.from(target.shadowRoot!.querySelectorAll<HTMLElement>(selector))!;

export const getShadowInnerHTML = (target: Element | HTMLElement) => {
  const root = (target.shadowRoot || target);
  return root.innerHTML && stripExpressionDelimiters(root.innerHTML!);
};

export const getOuterHTML =
  (target: Element | HTMLElement) =>
    target && target.outerHTML && stripExpressionDelimiters(target.outerHTML!);

export const getComputedStylePropertyValue =
  (target: Element | HTMLElement, property: string) =>
    getComputedStyle && getComputedStyle(target)[property as any];
