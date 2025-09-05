import{r as n,g as me,u as pe,d as ge,a as fe,j as t,b as Z,c as G,I as he,v as xe}from"./index-C6vj1wcG.js";const be=e=>{const[s,r]=n.useState([]),[o,i]=n.useState(!1),[l,a]=n.useState(null),d=n.useRef([]),u=n.useCallback(async()=>{if(e)try{const c=await me(e);r(c)}catch{r([])}},[e]);n.useEffect(()=>{d.current=s},[s]);const p=n.useCallback(async c=>{if(!e||c.length===0)return[];i(!0);try{const g=await Promise.all(c.map(P=>pe(e,P))),f=[...s,...g];return r(f),await u(),g}finally{i(!1)}},[e,s,u]),m=n.useCallback(async c=>{if(e){a(c);try{await ge(e,c);const g=s.filter(f=>f.id!==c);r(g),await u()}finally{a(null)}}},[e,s,u]);return{deliveryProofs:s,fetchProofs:u,uploadFiles:p,deleteProof:m,uploading:o,deletingId:l}};let ye={data:""},ve=e=>typeof window=="object"?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||ye,we=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,je=/\/\*[^]*?\*\/|  +/g,K=/\n+/g,S=(e,s)=>{let r="",o="",i="";for(let l in e){let a=e[l];l[0]=="@"?l[1]=="i"?r=l+" "+a+";":o+=l[1]=="f"?S(a,l):l+"{"+S(a,l[1]=="k"?"":s)+"}":typeof a=="object"?o+=S(a,s?s.replace(/([^,])+/g,d=>l.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,u=>/&/.test(u)?u.replace(/&/g,d):d?d+" "+u:u)):l):a!=null&&(l=/^--/.test(l)?l:l.replace(/[A-Z]/g,"-$&").toLowerCase(),i+=S.p?S.p(l,a):l+":"+a+";")}return r+(s&&i?s+"{"+i+"}":i)+o},k={},Q=e=>{if(typeof e=="object"){let s="";for(let r in e)s+=r+Q(e[r]);return s}return e},Ne=(e,s,r,o,i)=>{let l=Q(e),a=k[l]||(k[l]=(u=>{let p=0,m=11;for(;p<u.length;)m=101*m+u.charCodeAt(p++)>>>0;return"go"+m})(l));if(!k[a]){let u=l!==e?e:(p=>{let m,c,g=[{}];for(;m=we.exec(p.replace(je,""));)m[4]?g.shift():m[3]?(c=m[3].replace(K," ").trim(),g.unshift(g[0][c]=g[0][c]||{})):g[0][m[1]]=m[2].replace(K," ").trim();return g[0]})(e);k[a]=S(i?{["@keyframes "+a]:u}:u,r?"":"."+a)}let d=r&&k.g?k.g:null;return r&&(k.g=k[a]),((u,p,m,c)=>{c?p.data=p.data.replace(c,u):p.data.indexOf(u)===-1&&(p.data=m?u+p.data:p.data+u)})(k[a],s,o,d),a},ke=(e,s,r)=>e.reduce((o,i,l)=>{let a=s[l];if(a&&a.call){let d=a(r),u=d&&d.props&&d.props.className||/^go/.test(d)&&d;a=u?"."+u:d&&typeof d=="object"?d.props?"":S(d,""):d===!1?"":d}return o+i+(a??"")},"");function O(e){let s=this||{},r=e.call?e(s.p):e;return Ne(r.unshift?r.raw?ke(r,[].slice.call(arguments,1),s.p):r.reduce((o,i)=>Object.assign(o,i&&i.call?i(s.p):i),{}):r,ve(s.target),s.g,s.o,s.k)}let V,Y,q;O.bind({g:1});let C=O.bind({k:1});function Ce(e,s,r,o){S.p=s,V=e,Y=r,q=o}function E(e,s){let r=this||{};return function(){let o=arguments;function i(l,a){let d=Object.assign({},l),u=d.className||i.className;r.p=Object.assign({theme:Y&&Y()},d),r.o=/ *go\d+/.test(u),d.className=O.apply(r,o)+(u?" "+u:"");let p=e;return e[0]&&(p=d.as||e,delete d.as),q&&p[0]&&q(d),V(p,d)}return s?s(i):i}}var Pe=e=>typeof e=="function",T=(e,s)=>Pe(e)?e(s):e,Se=(()=>{let e=0;return()=>(++e).toString()})(),X=(()=>{let e;return()=>{if(e===void 0&&typeof window<"u"){let s=matchMedia("(prefers-reduced-motion: reduce)");e=!s||s.matches}return e}})(),Ee=20,J="default",ee=(e,s)=>{let{toastLimit:r}=e.settings;switch(s.type){case 0:return{...e,toasts:[s.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(a=>a.id===s.toast.id?{...a,...s.toast}:a)};case 2:let{toast:o}=s;return ee(e,{type:e.toasts.find(a=>a.id===o.id)?1:0,toast:o});case 3:let{toastId:i}=s;return{...e,toasts:e.toasts.map(a=>a.id===i||i===void 0?{...a,dismissed:!0,visible:!1}:a)};case 4:return s.toastId===void 0?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(a=>a.id!==s.toastId)};case 5:return{...e,pausedAt:s.time};case 6:let l=s.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(a=>({...a,pauseDuration:a.pauseDuration+l}))}}},z=[],te={toasts:[],pausedAt:void 0,settings:{toastLimit:Ee}},j={},se=(e,s=J)=>{j[s]=ee(j[s]||te,e),z.forEach(([r,o])=>{r===s&&o(j[s])})},re=e=>Object.keys(j).forEach(s=>se(e,s)),De=e=>Object.keys(j).find(s=>j[s].toasts.some(r=>r.id===e)),B=(e=J)=>s=>{se(s,e)},Fe={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},Le=(e={},s=J)=>{let[r,o]=n.useState(j[s]||te),i=n.useRef(j[s]);n.useEffect(()=>(i.current!==j[s]&&o(j[s]),z.push([s,o]),()=>{let a=z.findIndex(([d])=>d===s);a>-1&&z.splice(a,1)}),[s]);let l=r.toasts.map(a=>{var d,u,p;return{...e,...e[a.type],...a,removeDelay:a.removeDelay||((d=e[a.type])==null?void 0:d.removeDelay)||e?.removeDelay,duration:a.duration||((u=e[a.type])==null?void 0:u.duration)||e?.duration||Fe[a.type],style:{...e.style,...(p=e[a.type])==null?void 0:p.style,...a.style}}});return{...r,toasts:l}},Ie=(e,s="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:s,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:r?.id||Se()}),M=e=>(s,r)=>{let o=Ie(s,e,r);return B(o.toasterId||De(o.id))({type:2,toast:o}),o.id},y=(e,s)=>M("blank")(e,s);y.error=M("error");y.success=M("success");y.loading=M("loading");y.custom=M("custom");y.dismiss=(e,s)=>{let r={type:3,toastId:e};s?B(s)(r):re(r)};y.dismissAll=e=>y.dismiss(void 0,e);y.remove=(e,s)=>{let r={type:4,toastId:e};s?B(s)(r):re(r)};y.removeAll=e=>y.remove(void 0,e);y.promise=(e,s,r)=>{let o=y.loading(s.loading,{...r,...r?.loading});return typeof e=="function"&&(e=e()),e.then(i=>{let l=s.success?T(s.success,i):void 0;return l?y.success(l,{id:o,...r,...r?.success}):y.dismiss(o),i}).catch(i=>{let l=s.error?T(s.error,i):void 0;l?y.error(l,{id:o,...r,...r?.error}):y.dismiss(o)}),e};var Me=1e3,_e=(e,s="default")=>{let{toasts:r,pausedAt:o}=Le(e,s),i=n.useRef(new Map).current,l=n.useCallback((c,g=Me)=>{if(i.has(c))return;let f=setTimeout(()=>{i.delete(c),a({type:4,toastId:c})},g);i.set(c,f)},[]);n.useEffect(()=>{if(o)return;let c=Date.now(),g=r.map(f=>{if(f.duration===1/0)return;let P=(f.duration||0)+f.pauseDuration-(c-f.createdAt);if(P<0){f.visible&&y.dismiss(f.id);return}return setTimeout(()=>y.dismiss(f.id,s),P)});return()=>{g.forEach(f=>f&&clearTimeout(f))}},[r,o,s]);let a=n.useCallback(B(s),[s]),d=n.useCallback(()=>{a({type:5,time:Date.now()})},[a]),u=n.useCallback((c,g)=>{a({type:1,toast:{id:c,height:g}})},[a]),p=n.useCallback(()=>{o&&a({type:6,time:Date.now()})},[o,a]),m=n.useCallback((c,g)=>{let{reverseOrder:f=!1,gutter:P=8,defaultPosition:D}=g||{},v=r.filter(x=>(x.position||D)===(c.position||D)&&x.height),w=v.findIndex(x=>x.id===c.id),L=v.filter((x,F)=>F<w&&x.visible).length;return v.filter(x=>x.visible).slice(...f?[L+1]:[0,L]).reduce((x,F)=>x+(F.height||0)+P,0)},[r]);return n.useEffect(()=>{r.forEach(c=>{if(c.dismissed)l(c.id,c.removeDelay);else{let g=i.get(c.id);g&&(clearTimeout(g),i.delete(c.id))}})},[r,l]),{toasts:r,handlers:{updateHeight:u,startPause:d,endPause:p,calculateOffset:m}}},$e=C`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,Ae=C`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Ue=C`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Re=E("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${$e} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${Ae} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${Ue} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,ze=C`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,Te=E("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${ze} 1s linear infinite;
`,Oe=C`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,Be=C`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,He=E("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${Oe} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${Be} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,We=E("div")`
  position: absolute;
`,Ge=E("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Ye=C`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,qe=E("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Ye} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Je=({toast:e})=>{let{icon:s,type:r,iconTheme:o}=e;return s!==void 0?typeof s=="string"?n.createElement(qe,null,s):s:r==="blank"?null:n.createElement(Ge,null,n.createElement(Te,{...o}),r!=="loading"&&n.createElement(We,null,r==="error"?n.createElement(Re,{...o}):n.createElement(He,{...o})))},Ze=e=>`
0% {transform: translate3d(0,${e*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Ke=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${e*-150}%,-1px) scale(.6); opacity:0;}
`,Qe="0%{opacity:0;} 100%{opacity:1;}",Ve="0%{opacity:1;} 100%{opacity:0;}",Xe=E("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,et=E("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,tt=(e,s)=>{let r=e.includes("top")?1:-1,[o,i]=X()?[Qe,Ve]:[Ze(r),Ke(r)];return{animation:s?`${C(o)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${C(i)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},st=n.memo(({toast:e,position:s,style:r,children:o})=>{let i=e.height?tt(e.position||s||"top-center",e.visible):{opacity:0},l=n.createElement(Je,{toast:e}),a=n.createElement(et,{...e.ariaProps},T(e.message,e));return n.createElement(Xe,{className:e.className,style:{...i,...r,...e.style}},typeof o=="function"?o({icon:l,message:a}):n.createElement(n.Fragment,null,l,a))});Ce(n.createElement);var rt=({id:e,className:s,style:r,onHeightUpdate:o,children:i})=>{let l=n.useCallback(a=>{if(a){let d=()=>{let u=a.getBoundingClientRect().height;o(e,u)};d(),new MutationObserver(d).observe(a,{subtree:!0,childList:!0,characterData:!0})}},[e,o]);return n.createElement("div",{ref:l,className:s,style:r},i)},at=(e,s)=>{let r=e.includes("top"),o=r?{top:0}:{bottom:0},i=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:X()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${s*(r?1:-1)}px)`,...o,...i}},it=O`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,R=16,ot=({reverseOrder:e,position:s="top-center",toastOptions:r,gutter:o,children:i,toasterId:l,containerStyle:a,containerClassName:d})=>{let{toasts:u,handlers:p}=_e(r,l);return n.createElement("div",{"data-rht-toaster":l||"",style:{position:"fixed",zIndex:9999,top:R,left:R,right:R,bottom:R,pointerEvents:"none",...a},className:d,onMouseEnter:p.startPause,onMouseLeave:p.endPause},u.map(m=>{let c=m.position||s,g=p.calculateOffset(m,{reverseOrder:e,gutter:o,defaultPosition:s}),f=at(c,g);return n.createElement(rt,{id:m.id,key:m.id,onHeightUpdate:p.updateHeight,className:m.visible?it:"",style:f},m.type==="custom"?T(m.message,m):i?i(m):n.createElement(st,{toast:m,position:c}))}))},lt=y;const nt=e=>{const[s,r]=n.useState({}),o=n.useCallback(async l=>{if(e){r(a=>({...a,[l]:!0}));try{await fe(e,l),window.location.reload()}catch(a){console.error("Failed to update status:",a);const d=a,u=d?.response?.data?.message||d?.message||"Failed to update status. Please try again.";lt.error(u),r(p=>({...p,[l]:!1}))}}},[e]),i=n.useCallback(l=>s[l]||!1,[s]);return{handleUpdateSubmission:o,isLoading:i}},dt=({previews:e,uploading:s,uploadProgress:r,onRemove:o})=>e.length===0?null:t.jsxs("div",{className:"mt-3 space-y-3 border-2 border-green-500 p-4 rounded-lg bg-green-50",children:[t.jsx("div",{className:"flex justify-between items-center",children:t.jsxs("h5",{className:"text-sm font-medium text-green-900",children:["Selected Images (",e.length,")"]})}),t.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto",children:e.map(i=>t.jsxs("div",{className:"relative group",children:[t.jsx("img",{src:i.preview,alt:`Preview ${i.file.name}`,className:"w-full h-16 sm:h-20 object-cover rounded-lg border border-gray-300 shadow-sm"}),s&&r[i.id]!==void 0&&t.jsx("div",{className:"absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg",children:t.jsxs("div",{className:"text-white text-xs",children:[r[i.id],"%"]})}),t.jsx("button",{onClick:()=>o(i.id),disabled:s,className:"absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed",title:"Remove image",children:"×"}),t.jsx("div",{className:"absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg truncate",children:i.file.name})]},i.id))})]}),ct=({proofs:e,deletingId:s,onDelete:r,onPreview:o})=>e.length===0?null:t.jsxs("div",{children:[t.jsxs("h5",{className:"text-sm font-medium text-gray-700 mb-3",children:["Uploaded Proofs (",e.length,")"]}),t.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-3 gap-3",children:e.map(i=>t.jsxs("div",{className:"relative group",children:[t.jsx("img",{src:Z(i.image_path),alt:`Delivery proof ${i.id}`,className:"w-full h-20 sm:h-24 object-cover rounded-lg border cursor-pointer hover:opacity-90 transition-opacity",onClick:()=>o(Z(i.image_path))}),t.jsx("button",{onClick:l=>{l.stopPropagation(),r(i.id)},disabled:s===i.id,className:"absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed",title:"Delete image",children:s===i.id?t.jsx("div",{className:"animate-spin rounded-full h-3 w-3 border-b border-white"}):"×"}),t.jsx("div",{className:"absolute bottom-1 right-1 bg-green-600 text-white text-xs px-1.5 py-0.5 rounded",children:"✓"})]},i.id))})]}),ut=({uploading:e,count:s,onUpload:r,onCancelAll:o})=>t.jsxs("div",{className:"flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full",children:[t.jsx("button",{onClick:r,disabled:e,className:"flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm flex items-center justify-center gap-2",children:e?t.jsxs(t.Fragment,{children:[t.jsx("div",{className:"animate-spin rounded-full h-4 w-4 border-b-2 border-white"}),"Uploading ",s," image(s)..."]}):t.jsxs(t.Fragment,{children:[t.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"})}),"Upload ",s," image(s)"]})}),t.jsx("button",{onClick:o,disabled:e,className:"px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm",children:"Cancel All"})]}),mt=({uploading:e,onClick:s})=>t.jsx("div",{className:"border-2 border-dashed border-gray-300 rounded-lg p-4",children:t.jsx("button",{type:"button",onClick:s,disabled:e,className:`w-full cursor-pointer flex flex-col items-center justify-center ${e?"opacity-50 cursor-not-allowed":"hover:bg-gray-50"} rounded-lg p-4 transition-colors border-none bg-transparent`,children:e?t.jsxs(t.Fragment,{children:[t.jsx("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"}),t.jsx("p",{className:"text-sm text-gray-600",children:"Uploading..."})]}):t.jsxs(t.Fragment,{children:[t.jsx("svg",{className:"w-8 h-8 text-gray-400 mb-2",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 4v16m8-8H4"})}),t.jsx("p",{className:"text-sm text-gray-600",children:"Click to select images (Multiple supported)"}),t.jsx("p",{className:"text-xs text-gray-500 mt-1",children:"Max 2MB per image • JPEG, PNG, JPG, GIF"})]})})});function gt({card:e}){const[s,r]=n.useState(!1),{deliveryProofs:o,fetchProofs:i,uploadFiles:l,deleteProof:a,deletingId:d}=be(e?.id),[u,p]=n.useState(null),[m,c]=n.useState([]),[g,f]=n.useState(!1),[P,D]=n.useState({}),v=n.useRef(null),w=e?.latest_status.status,L=n.useCallback(()=>{i()},[i]),x=n.useRef({previewImages:[],uploadSuccessful:!1,timestamp:0,cancelled:!1,cancelledTimestamp:0});n.useEffect(()=>{x.current={previewImages:m,uploadSuccessful:g,timestamp:Date.now()}},[m,g]),n.useEffect(()=>{x.current.previewImages.length>0&&!x.current.uploadSuccessful&&x.current.timestamp>Date.now()-3e4&&(c(x.current.previewImages),f(!1))},[]);const F=n.useCallback(()=>{x.current.previewImages.length>0&&!x.current.uploadSuccessful&&m.length===0&&!g&&Date.now()-x.current.timestamp>1e3&&c(x.current.previewImages)},[m,g]);n.useEffect(()=>(window.addEventListener("resize",F),()=>window.removeEventListener("resize",F)),[F]),n.useEffect(()=>{w==="received_by_customer"&&L()},[w,L]);const{handleUpdateSubmission:H,isLoading:I}=nt(e?.id),ae=()=>Math.random().toString(36).substring(2)+Date.now().toString(36),ie=h=>{const b=h.target.files;if(!b||b.length===0)return;const{valid:N,errors:_}=xe(Array.from(b));if(_.length>0){alert(_.join(`
`)),h.target.value="";return}if(N.length===0){h.target.value="";return}f(!1);const $=N.map(A=>new Promise(U=>{const W=new FileReader,ue=ae();W.onloadend=()=>{U({file:A,preview:W.result,id:ue})},W.readAsDataURL(A)}));Promise.all($).then(A=>{const U=[...m,...A];c(U),x.current={previewImages:U,uploadSuccessful:!1,timestamp:Date.now()}}),h.target.value=""},oe=async()=>{if(!(m.length===0||!e?.id)){r(!0),D({});try{const h=m.map(N=>N.file);await l(h),f(!0),x.current={previewImages:[],uploadSuccessful:!0,timestamp:Date.now()},setTimeout(()=>{L()},500),setTimeout(()=>{c([]),D({})},100);const b=document.getElementById("delivery-proof-upload");b&&(b.value=""),v.current&&(v.current.value="")}catch(h){const b=h;console.error("Error uploading delivery proofs:",b),f(!1);const N=b?.response?.data?.message||"Failed to upload one or more delivery proofs";alert(N)}finally{r(!1),D({})}}},le=async h=>{e?.id&&(await a(h),u&&u.includes(`delivery-proof/${h}`)&&p(null))},ne=h=>{const b=m.filter(N=>N.id!==h);c(b),x.current={previewImages:b,uploadSuccessful:!1,timestamp:Date.now()}},de=()=>{const h=Date.now();c([]),f(!1),D({}),x.current={previewImages:[],uploadSuccessful:!1,timestamp:h,cancelled:!0,cancelledTimestamp:h};const b=document.getElementById("delivery-proof-upload");b&&(b.value=""),v.current&&(v.current.value=""),[100,300,600,1e3,1500].forEach(_=>{setTimeout(()=>{x.current={previewImages:[],uploadSuccessful:!1,timestamp:h,cancelled:!0,cancelledTimestamp:h},c($=>$.length>0?[]:$)},_)})},ce=()=>{let h=v.current;if(h||(h=document.getElementById("delivery-proof-upload")),h)try{h.click()}catch{try{const b=new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window});h.dispatchEvent(b)}catch(b){console.error("Failed to trigger file input:",b)}}};return w==="data_input"?t.jsxs("div",{className:"bg-white border border-gray-200 rounded-lg shadow-sm p-3 sm:p-4 lg:p-6",children:[t.jsx("div",{className:"mb-4",children:t.jsxs("div",{className:"flex items-center justify-between mb-3",children:[t.jsx("span",{className:"text-sm font-medium text-gray-600",children:"Current Status:"}),t.jsx("span",{className:"text-sm font-medium text-gray-900 capitalize",children:G(w)})]})}),t.jsxs("div",{children:[t.jsxs("div",{className:"mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200",children:[t.jsx("h4",{className:"text-sm font-medium text-blue-900 mb-2",children:"Action Required"}),t.jsx("p",{className:"text-sm text-blue-700",children:"Please confirm when you have sent your card to Grading Facility for grading."})]}),t.jsx("button",{onClick:()=>H("delivery_to_jp"),disabled:I("delivery_to_jp"),className:"w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg font-medium transition-colors text-sm sm:text-base flex items-center justify-center gap-2",children:I("delivery_to_jp")?t.jsxs(t.Fragment,{children:[t.jsx("div",{className:"animate-spin rounded-full h-4 w-4 border-b-2 border-white"}),"Confirming..."]}):t.jsxs(t.Fragment,{children:[t.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 13l4 4L19 7"})}),"Confirm Sent to Grading Facility"]})})]})]}):w==="payment_request"?t.jsxs("div",{className:"bg-white border border-gray-200 rounded-lg shadow-sm p-3 sm:p-4 lg:p-6",children:[t.jsx("div",{className:"mb-4",children:t.jsxs("div",{className:"flex items-center justify-between mb-3",children:[t.jsx("span",{className:"text-sm font-medium text-gray-600",children:"Current Status:"}),t.jsx("span",{className:"text-sm font-medium text-gray-900 capitalize",children:G(w)})]})}),t.jsxs("div",{children:[t.jsxs("div",{className:"mb-4 p-3 bg-green-50 rounded-lg border border-green-200",children:[t.jsx("h4",{className:"text-sm font-medium text-green-900 mb-2",children:"Payment Required"}),t.jsx("p",{className:"text-sm text-green-700",children:"Your card grading is complete! Please proceed with payment to continue with delivery."})]}),t.jsxs("div",{className:"space-y-3",children:[e?.payment_url?t.jsxs("button",{onClick:()=>window.open(e.payment_url,"_blank"),className:"w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium transition-colors text-sm sm:text-base flex items-center justify-center gap-2",children:[t.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"})}),"Proceed to Payment"]}):t.jsx("div",{className:"w-full bg-gray-100 text-gray-600 px-4 py-3 rounded-lg font-medium text-sm sm:text-base text-center",children:"Payment link not available yet"}),t.jsx("button",{onClick:()=>H("delivery_to_customer"),disabled:I("delivery_to_customer"),className:"w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg font-medium transition-colors text-sm sm:text-base flex items-center justify-center gap-2",children:I("delivery_to_customer")?t.jsxs(t.Fragment,{children:[t.jsx("div",{className:"animate-spin rounded-full h-4 w-4 border-b-2 border-white"}),"Confirming..."]}):t.jsxs(t.Fragment,{children:[t.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M5 13l4 4L19 7"})}),"Confirm Payment"]})}),t.jsxs("div",{className:"mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200",children:[t.jsx("h5",{className:"text-xs font-medium text-gray-700 mb-2",children:"Instructions:"}),t.jsxs("ol",{className:"text-xs text-gray-600 space-y-1",children:[t.jsx("li",{children:'1. Click "Proceed to Payment" to complete your payment'}),t.jsx("li",{children:'2. After successful payment, click "Confirm Payment"'}),t.jsx("li",{children:"3. Your card will be prepared for delivery"})]})]})]})]})]}):w==="received_by_customer"?t.jsxs("div",{className:"bg-white border border-gray-200 rounded-lg shadow-sm p-3 sm:p-4 lg:p-6",children:[t.jsx("div",{className:"mb-4",children:t.jsxs("div",{className:"flex items-center justify-between mb-3",children:[t.jsx("span",{className:"text-sm font-medium text-gray-600",children:"Current Status:"}),t.jsx("span",{className:"text-sm font-medium text-gray-900 capitalize",children:G(w)})]})}),t.jsxs("div",{children:[t.jsxs("div",{className:"mb-4 p-3 bg-orange-50 rounded-lg border border-orange-200",children:[t.jsx("h4",{className:"text-sm font-medium text-orange-900 mb-2",children:"Proof Required"}),t.jsx("p",{className:"text-sm text-orange-700",children:"Please upload photos as proof that you have received your graded card. You can select multiple images at once."})]}),t.jsxs("div",{className:"space-y-4",children:[!g&&t.jsxs("div",{children:[t.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Upload Delivery Proof (Multiple Images Supported)"}),t.jsx("input",{ref:v,type:"file",accept:"image/jpeg,image/png,image/jpg,image/gif",onChange:ie,disabled:s,multiple:!0,className:"hidden",id:"delivery-proof-upload"}),t.jsx(mt,{uploading:s,onClick:ce}),m.length>0&&!g&&t.jsxs(t.Fragment,{children:[t.jsx(dt,{previews:m,uploading:s,uploadProgress:P,onRemove:ne}),t.jsx(ut,{uploading:s,count:m.length,onUpload:oe,onCancelAll:de})]})]}),g&&t.jsxs("div",{className:"p-4 bg-green-100 border-2 border-green-500 rounded-lg",children:[t.jsxs("div",{className:"flex items-center gap-2 text-green-800",children:[t.jsx("svg",{className:"w-5 h-5",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12l2 2 4-4"})}),t.jsx("span",{className:"font-medium",children:"Upload Successful!"})]}),t.jsx("p",{className:"text-sm text-green-700 mt-1",children:"Your delivery proof images have been uploaded successfully. You can upload more images or complete your submission."})]}),o.length>0&&t.jsx(ct,{proofs:o,deletingId:d,onDelete:le,onPreview:h=>p(h)}),g&&t.jsxs("button",{onClick:()=>{f(!1)},className:"w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm flex items-center justify-center gap-2",children:[t.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M12 4v16m8-8H4"})}),"Add More Images"]}),o.length>0&&t.jsx("button",{onClick:()=>H("done"),disabled:I("done"),className:"w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg font-medium transition-colors text-sm sm:text-base flex items-center justify-center gap-2",children:I("done")?t.jsxs(t.Fragment,{children:[t.jsx("div",{className:"animate-spin rounded-full h-4 w-4 border-b-2 border-white"}),"Processing..."]}):t.jsxs(t.Fragment,{children:[t.jsx("svg",{className:"w-4 h-4",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:t.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12l2 2 4-4"})}),"Complete Submission"]})}),t.jsxs("div",{className:"mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200",children:[t.jsx("h5",{className:"text-xs font-medium text-gray-700 mb-2",children:"Instructions:"}),t.jsxs("ol",{className:"text-xs text-gray-600 space-y-1",children:[t.jsx("li",{children:'1. Click "Click to select images" to choose multiple photos at once'}),t.jsx("li",{children:"2. Review the previews and remove any unwanted images by clicking the × button"}),t.jsx("li",{children:'3. Click "Upload Images" to upload all selected photos'}),t.jsx("li",{children:'4. Click "Add More Images" to upload additional photos if needed'}),t.jsx("li",{children:'5. Click "Complete Submission" when all photos are uploaded'})]})]})]})]}),t.jsx(he,{url:u,onClose:()=>p(null)}),t.jsx(ot,{position:"top-right",toastOptions:{error:{duration:5e3}}})]}):null}export{gt as default};
