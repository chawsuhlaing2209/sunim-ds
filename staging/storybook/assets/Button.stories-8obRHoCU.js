import{r as J}from"./iframe-RmDRT5xj.js";import"./preload-helper-PPVm8Dsz.js";var E={exports:{}},i={};var A;function M(){if(A)return i;A=1;var s=Symbol.for("react.transitional.element"),n=Symbol.for("react.fragment");function m(N,r,a){var t=null;if(a!==void 0&&(t=""+a),r.key!==void 0&&(t=""+r.key),"key"in r){a={};for(var o in r)o!=="key"&&(a[o]=r[o])}else a=r;return r=a.ref,{$$typeof:s,type:N,key:t,ref:r!==void 0?r:null,props:a}}return i.Fragment=n,i.jsx=m,i.jsxs=m,i}var q;function $(){return q||(q=1,E.exports=M()),E.exports}var e=$();const L=J.forwardRef(function({children:n,variant:m="primary",size:N="md",loading:r=!1,disabled:a=!1,trailingIcon:t,className:o,type:F="button",...V},D){const H=["sunim-button",`sunim-button--${m}`,`sunim-button--${N}`,r?"sunim-button--loading":"",o??""].filter(C=>C!=="").join(" ");return e.jsxs("button",{...V,ref:D,type:F,className:H,disabled:a,"aria-busy":r||void 0,"aria-disabled":r?!0:void 0,onClick:r?void 0:V.onClick,children:[r?e.jsx("span",{className:"sunim-button__spinner","aria-hidden":"true"}):null,e.jsx("span",{className:"sunim-button__label",children:n}),t===void 0?null:e.jsx("span",{className:"sunim-button__trailing","aria-hidden":"true",children:t})]})});try{L.displayName="Button",L.__docgenInfo={description:`The Button, built from the Figma node in the Airtable row.

Three variants, two sizes, five states. Hover and focus belong to CSS, so
they are not props: a state the browser owns is not a state to re-implement
in JavaScript. Disabled and loading are props, because only the caller
knows them.`,displayName:"Button",filePath:"/Users/chawsuhlaing/CLAUDE CODE/sunim-ds/src/components/Button/Button.tsx",methods:[],props:{children:{defaultValue:null,declarations:[{fileName:"sunim-ds/src/components/Button/Button.tsx",name:"ButtonProps"}],description:"What the button says. A button with no label has nothing to announce.",name:"children",parent:{fileName:"sunim-ds/src/components/Button/Button.tsx",name:"ButtonProps"},required:!0,tags:{},type:{name:"ReactNode"}},variant:{defaultValue:{value:"primary"},declarations:[{fileName:"sunim-ds/src/components/Button/Button.tsx",name:"ButtonProps"}],description:"",name:"variant",parent:{fileName:"sunim-ds/src/components/Button/Button.tsx",name:"ButtonProps"},required:!1,tags:{},type:{name:"enum",raw:"ButtonVariant",value:[{value:'"primary"'},{value:'"secondary"'},{value:'"ghost"'}]}},size:{defaultValue:{value:"md"},declarations:[{fileName:"sunim-ds/src/components/Button/Button.tsx",name:"ButtonProps"}],description:"",name:"size",parent:{fileName:"sunim-ds/src/components/Button/Button.tsx",name:"ButtonProps"},required:!1,tags:{},type:{name:"enum",raw:"ButtonSize",value:[{value:'"md"'},{value:'"lg"'}]}},loading:{defaultValue:{value:"false"},declarations:[{fileName:"sunim-ds/src/components/Button/Button.tsx",name:"ButtonProps"}],description:`Waiting on something. The button stays in the tab order and keeps its
width, so a page does not jump, and it stops taking clicks. Announced
with aria-busy rather than by swapping the label, so a screen reader
keeps the name it already read out.`,name:"loading",parent:{fileName:"sunim-ds/src/components/Button/Button.tsx",name:"ButtonProps"},required:!1,tags:{},type:{name:"boolean"}},trailingIcon:{defaultValue:null,declarations:[{fileName:"sunim-ds/src/components/Button/Button.tsx",name:"ButtonProps"}],description:`Something small after the label, 16px square.

The design says this with two properties, a switch and a slot, because a
design tool has no way to say a slot is optional. Here, leaving it out is
the off position, so it is one prop.

It is hidden from screen readers. The label already names the button, and
an arrow read out after it says nothing a person needs.`,name:"trailingIcon",parent:{fileName:"sunim-ds/src/components/Button/Button.tsx",name:"ButtonProps"},required:!1,tags:{},type:{name:"ReactNode"}}},tags:{}}}catch{}const d=()=>e.jsx("svg",{viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:"1.5",children:e.jsx("path",{d:"M3 8h10M9 4l4 4-4 4",strokeLinecap:"round",strokeLinejoin:"round"})}),W={title:"UI/Button",component:L,parameters:{layout:"centered",docs:{description:{component:`One story per thing the design shows. The contract lists three variants,
two sizes and five states, and QA owes one test case per combination, so a
state with no story here is a state nobody ever looked at.

Hover and focus belong to the browser, so their stories set the pseudo
state rather than faking it with a class.`}}},args:{children:"Get started"},argTypes:{variant:{control:"select",options:["primary","secondary","ghost"]},size:{control:"select",options:["md","lg"]},disabled:{control:"boolean"},loading:{control:"boolean"},trailingIcon:{control:"boolean",mapping:{true:e.jsx(d,{}),false:void 0}}}},u={args:{variant:"primary",size:"md"}},p={args:{variant:"primary",size:"md"},parameters:{pseudo:{hover:!0}}},l={args:{variant:"primary",size:"md"},parameters:{pseudo:{focusVisible:!0}}},g={args:{variant:"primary",size:"md",disabled:!0}},h={args:{variant:"primary",size:"md",loading:!0}},v={args:{variant:"primary",size:"lg"}},y={args:{variant:"secondary",size:"md"}},f={args:{variant:"secondary",size:"md"},parameters:{pseudo:{hover:!0}}},z={args:{variant:"secondary",size:"md"},parameters:{pseudo:{focusVisible:!0}}},b={args:{variant:"secondary",size:"md",disabled:!0}},x={args:{variant:"secondary",size:"md",loading:!0}},S={args:{variant:"secondary",size:"lg"}},B={args:{variant:"ghost",size:"md"}},w={args:{variant:"ghost",size:"md"},parameters:{pseudo:{hover:!0}}},P={args:{variant:"ghost",size:"md"},parameters:{pseudo:{focusVisible:!0}}},_={args:{variant:"ghost",size:"md",disabled:!0}},j={args:{variant:"ghost",size:"md",loading:!0}},R={args:{variant:"ghost",size:"lg"}},c={render:()=>e.jsx("div",{style:{display:"grid",gap:"1rem"},children:["md","lg"].map(s=>e.jsx("div",{style:{display:"flex",gap:"1rem"},children:["primary","secondary","ghost"].map(n=>e.jsx(L,{variant:n,size:s,children:"Get started"},n))},s))})},k={args:{variant:"primary",size:"md",trailingIcon:e.jsx(d,{})}},I={args:{variant:"secondary",size:"md",trailingIcon:e.jsx(d,{})}},T={args:{variant:"ghost",size:"md",trailingIcon:e.jsx(d,{})}},G={args:{variant:"primary",size:"lg",trailingIcon:e.jsx(d,{})}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'md'
  }
}`,...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'md'
  },
  parameters: {
    pseudo: {
      hover: true
    }
  }
}`,...p.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'md'
  },
  parameters: {
    pseudo: {
      focusVisible: true
    }
  }
}`,...l.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'md',
    disabled: true
  }
}`,...g.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'md',
    loading: true
  }
}`,...h.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'lg'
  }
}`,...v.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    size: 'md'
  }
}`,...y.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    size: 'md'
  },
  parameters: {
    pseudo: {
      hover: true
    }
  }
}`,...f.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    size: 'md'
  },
  parameters: {
    pseudo: {
      focusVisible: true
    }
  }
}`,...z.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    size: 'md',
    disabled: true
  }
}`,...b.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    size: 'md',
    loading: true
  }
}`,...x.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    size: 'lg'
  }
}`,...S.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    size: 'md'
  }
}`,...B.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    size: 'md'
  },
  parameters: {
    pseudo: {
      hover: true
    }
  }
}`,...w.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    size: 'md'
  },
  parameters: {
    pseudo: {
      focusVisible: true
    }
  }
}`,...P.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    size: 'md',
    disabled: true
  }
}`,..._.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    size: 'md',
    loading: true
  }
}`,...j.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    size: 'lg'
  }
}`,...R.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'grid',
    gap: '1rem'
  }}>
      {(['md', 'lg'] as const).map(size => <div key={size} style={{
      display: 'flex',
      gap: '1rem'
    }}>
          {(['primary', 'secondary', 'ghost'] as const).map(variant => <Button key={variant} variant={variant} size={size}>
              Get started
            </Button>)}
        </div>)}
    </div>
}`,...c.parameters?.docs?.source},description:{story:`Every variant and size at once, which is the view a person compares
against the Figma frame.`,...c.parameters?.docs?.description}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'md',
    trailingIcon: <ArrowRight />
  }
}`,...k.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    size: 'md',
    trailingIcon: <ArrowRight />
  }
}`,...I.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    size: 'md',
    trailingIcon: <ArrowRight />
  }
}`,...T.parameters?.docs?.source}}};G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'lg',
    trailingIcon: <ArrowRight />
  }
}`,...G.parameters?.docs?.source}}};const Y=["Primary","PrimaryHover","PrimaryFocus","PrimaryDisabled","PrimaryLoading","PrimaryLarge","Secondary","SecondaryHover","SecondaryFocus","SecondaryDisabled","SecondaryLoading","SecondaryLarge","Ghost","GhostHover","GhostFocus","GhostDisabled","GhostLoading","GhostLarge","EveryVariant","PrimaryTrailingIcon","SecondaryTrailingIcon","GhostTrailingIcon","TrailingIconLarge"];export{c as EveryVariant,B as Ghost,_ as GhostDisabled,P as GhostFocus,w as GhostHover,R as GhostLarge,j as GhostLoading,T as GhostTrailingIcon,u as Primary,g as PrimaryDisabled,l as PrimaryFocus,p as PrimaryHover,v as PrimaryLarge,h as PrimaryLoading,k as PrimaryTrailingIcon,y as Secondary,b as SecondaryDisabled,z as SecondaryFocus,f as SecondaryHover,S as SecondaryLarge,x as SecondaryLoading,I as SecondaryTrailingIcon,G as TrailingIconLarge,Y as __namedExportsOrder,W as default};
