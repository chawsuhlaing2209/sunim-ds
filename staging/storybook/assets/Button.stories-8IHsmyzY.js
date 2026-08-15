import{r as D}from"./iframe-BTIQUYPv.js";import"./preload-helper-PPVm8Dsz.js";var R={exports:{}},i={};var N;function q(){if(N)return i;N=1;var a=Symbol.for("react.transitional.element"),s=Symbol.for("react.fragment");function c(G,e,r){var n=null;if(r!==void 0&&(n=""+r),e.key!==void 0&&(n=""+e.key),"key"in e){r={};for(var o in e)o!=="key"&&(r[o]=e[o])}else r=e;return e=r.ref,{$$typeof:a,type:G,key:n,ref:e!==void 0?e:null,props:r}}return i.Fragment=s,i.jsx=c,i.jsxs=c,i}var j;function A(){return j||(j=1,R.exports=q()),R.exports}var t=A();const E=D.forwardRef(function({children:s,variant:c="primary",size:G="md",loading:e=!1,disabled:r=!1,className:n,type:o="button",...L},V){const T=["sunim-button",`sunim-button--${c}`,`sunim-button--${G}`,e?"sunim-button--loading":"",n??""].filter(F=>F!=="").join(" ");return t.jsxs("button",{...L,ref:V,type:o,className:T,disabled:r,"aria-busy":e||void 0,"aria-disabled":e?!0:void 0,onClick:e?void 0:L.onClick,children:[e?t.jsx("span",{className:"sunim-button__spinner","aria-hidden":"true"}):null,t.jsx("span",{className:"sunim-button__label",children:s})]})});try{E.displayName="Button",E.__docgenInfo={description:`The Button, built from the Figma node in the Airtable row.

Three variants, two sizes, five states. Hover and focus belong to CSS, so
they are not props: a state the browser owns is not a state to re-implement
in JavaScript. Disabled and loading are props, because only the caller
knows them.`,displayName:"Button",filePath:"/Users/chawsuhlaing/CLAUDE CODE/sunim-ds/src/components/Button/Button.tsx",methods:[],props:{children:{defaultValue:null,declarations:[{fileName:"sunim-ds/src/components/Button/Button.tsx",name:"ButtonProps"}],description:"What the button says. A button with no label has nothing to announce.",name:"children",parent:{fileName:"sunim-ds/src/components/Button/Button.tsx",name:"ButtonProps"},required:!0,tags:{},type:{name:"ReactNode"}},variant:{defaultValue:{value:"primary"},declarations:[{fileName:"sunim-ds/src/components/Button/Button.tsx",name:"ButtonProps"}],description:"",name:"variant",parent:{fileName:"sunim-ds/src/components/Button/Button.tsx",name:"ButtonProps"},required:!1,tags:{},type:{name:"enum",raw:"ButtonVariant",value:[{value:'"primary"'},{value:'"secondary"'},{value:'"ghost"'}]}},size:{defaultValue:{value:"md"},declarations:[{fileName:"sunim-ds/src/components/Button/Button.tsx",name:"ButtonProps"}],description:"",name:"size",parent:{fileName:"sunim-ds/src/components/Button/Button.tsx",name:"ButtonProps"},required:!1,tags:{},type:{name:"enum",raw:"ButtonSize",value:[{value:'"md"'},{value:'"lg"'}]}},loading:{defaultValue:{value:"false"},declarations:[{fileName:"sunim-ds/src/components/Button/Button.tsx",name:"ButtonProps"}],description:`Waiting on something. The button stays in the tab order and keeps its
width, so a page does not jump, and it stops taking clicks. Announced
with aria-busy rather than by swapping the label, so a screen reader
keeps the name it already read out.`,name:"loading",parent:{fileName:"sunim-ds/src/components/Button/Button.tsx",name:"ButtonProps"},required:!1,tags:{},type:{name:"boolean"}}},tags:{}}}catch{}const J={title:"UI/Button",component:E,parameters:{layout:"centered",docs:{description:{component:`One story per thing the design shows. The contract lists three variants,
two sizes and five states, and QA owes one test case per combination, so a
state with no story here is a state nobody ever looked at.

Hover and focus belong to the browser, so their stories set the pseudo
state rather than faking it with a class.`}}},args:{children:"Get started"},argTypes:{variant:{control:"select",options:["primary","secondary","ghost"]},size:{control:"select",options:["md","lg"]},disabled:{control:"boolean"},loading:{control:"boolean"}}},m={args:{variant:"primary",size:"md"}},u={args:{variant:"primary",size:"md"},parameters:{pseudo:{hover:!0}}},p={args:{variant:"primary",size:"md"},parameters:{pseudo:{focusVisible:!0}}},l={args:{variant:"primary",size:"md",disabled:!0}},g={args:{variant:"primary",size:"md",loading:!0}},v={args:{variant:"primary",size:"lg"}},y={args:{variant:"secondary",size:"md"}},h={args:{variant:"secondary",size:"md"},parameters:{pseudo:{hover:!0}}},b={args:{variant:"secondary",size:"md"},parameters:{pseudo:{focusVisible:!0}}},f={args:{variant:"secondary",size:"md",disabled:!0}},z={args:{variant:"secondary",size:"md",loading:!0}},S={args:{variant:"secondary",size:"lg"}},B={args:{variant:"ghost",size:"md"}},x={args:{variant:"ghost",size:"md"},parameters:{pseudo:{hover:!0}}},P={args:{variant:"ghost",size:"md"},parameters:{pseudo:{focusVisible:!0}}},w={args:{variant:"ghost",size:"md",disabled:!0}},_={args:{variant:"ghost",size:"md",loading:!0}},k={args:{variant:"ghost",size:"lg"}},d={render:()=>t.jsx("div",{style:{display:"grid",gap:"1rem"},children:["md","lg"].map(a=>t.jsx("div",{style:{display:"flex",gap:"1rem"},children:["primary","secondary","ghost"].map(s=>t.jsx(E,{variant:s,size:a,children:"Get started"},s))},a))})};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'md'
  }
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'md'
  },
  parameters: {
    pseudo: {
      hover: true
    }
  }
}`,...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'md'
  },
  parameters: {
    pseudo: {
      focusVisible: true
    }
  }
}`,...p.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'md',
    disabled: true
  }
}`,...l.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'md',
    loading: true
  }
}`,...g.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    size: 'lg'
  }
}`,...v.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    size: 'md'
  }
}`,...y.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    size: 'md'
  },
  parameters: {
    pseudo: {
      hover: true
    }
  }
}`,...h.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    size: 'md'
  },
  parameters: {
    pseudo: {
      focusVisible: true
    }
  }
}`,...b.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    size: 'md',
    disabled: true
  }
}`,...f.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    size: 'md',
    loading: true
  }
}`,...z.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    size: 'lg'
  }
}`,...S.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    size: 'md'
  }
}`,...B.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    size: 'md'
  },
  parameters: {
    pseudo: {
      hover: true
    }
  }
}`,...x.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    size: 'md'
  },
  parameters: {
    pseudo: {
      focusVisible: true
    }
  }
}`,...P.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    size: 'md',
    disabled: true
  }
}`,...w.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    size: 'md',
    loading: true
  }
}`,..._.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    size: 'lg'
  }
}`,...k.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source},description:{story:`Every variant and size at once, which is the view a person compares
against the Figma frame.`,...d.parameters?.docs?.description}}};const $=["Primary","PrimaryHover","PrimaryFocus","PrimaryDisabled","PrimaryLoading","PrimaryLarge","Secondary","SecondaryHover","SecondaryFocus","SecondaryDisabled","SecondaryLoading","SecondaryLarge","Ghost","GhostHover","GhostFocus","GhostDisabled","GhostLoading","GhostLarge","EveryVariant"];export{d as EveryVariant,B as Ghost,w as GhostDisabled,P as GhostFocus,x as GhostHover,k as GhostLarge,_ as GhostLoading,m as Primary,l as PrimaryDisabled,p as PrimaryFocus,u as PrimaryHover,v as PrimaryLarge,g as PrimaryLoading,y as Secondary,f as SecondaryDisabled,b as SecondaryFocus,h as SecondaryHover,S as SecondaryLarge,z as SecondaryLoading,$ as __namedExportsOrder,J as default};
