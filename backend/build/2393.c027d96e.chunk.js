"use strict";(self.webpackChunkbackend=self.webpackChunkbackend||[]).push([[2393],{42393:(W,s,_)=>{_.r(s),_.d(s,{HomePageEE:()=>m});var P=_(92132),D=_(67232),n=_(90229),T=_(21272),C=_(55506),R=_(14718),l=_(58401),v=_(55151),U=_(79077),B=_(39229),t=_(15126),i=_(63299),L=_(67014),d=_(59080),I=_(79275),M=_(82437),A=_(61535),O=_(5790),E=_(12083),a=_(35223),K=_(5409),o=_(74930),h=_(2600),r=_(48940),f=_(41286),g=_(56336),S=_(13426),y=_(84624),N=_(77965),j=_(54257),H=_(71210),x=_(51187),F=_(39404),G=_(58692),V=_(501),$=_(57646),c=_(23120),e=_(44414),Y=_(25962),z=_(14664),J=_(42588),X=_(90325),Z=_(62785),Q=_(87443),u=_(41032),p=_(22957),k=_(93179),w=_(73055),b=_(15747),q=_(85306),__=_(26509),E_=_(32058),t_=_(81185),s_=_(82261),M_=_(28155),O_=_(67031);const m=()=>((0,n.u)(),(0,P.jsx)(D.HomePageCE,{}))},90229:(W,s,_)=>{_.d(s,{u:()=>B});var P=_(21272),D=_(55506),n=_(67031),T=_(54894),C=_(17703),R=_(39229);const l="strapi-notification-seat-limit",v="https://cloud.strapi.io/profile/billing",U="https://strapi.io/billing/request-seats",B=()=>{const{formatMessage:t}=(0,T.A)(),{license:i,isError:L,isLoading:d}=(0,R.m)(),I=(0,D.hN)(),{pathname:M}=(0,C.zy)(),{enforcementUserCount:A,permittedSeats:O,licenseLimitStatus:E,isHostedOnStrapiCloud:a}=i??{};P.useEffect(()=>{if(L||d)return;const K=!n(O)&&!window.sessionStorage.getItem(`${l}-${M}`)&&(E==="AT_LIMIT"||E==="OVER_LIMIT");let o;E==="OVER_LIMIT"?o="warning":E==="AT_LIMIT"&&(o="softWarning"),K&&I({type:o,message:t({id:"notification.ee.warning.over-.message",defaultMessage:"Add seats to {licenseLimitStatus, select, OVER_LIMIT {invite} other {re-enable}} Users. If you already did it but it's not reflected in Strapi yet, make sure to restart your app."},{licenseLimitStatus:E}),title:t({id:"notification.ee.warning.at-seat-limit.title",defaultMessage:"{licenseLimitStatus, select, OVER_LIMIT {Over} other {At}} seat limit ({enforcementUserCount}/{permittedSeats})"},{licenseLimitStatus:E,enforcementUserCount:A,permittedSeats:O}),link:{url:a?v:U,label:t({id:"notification.ee.warning.seat-limit.link",defaultMessage:"{isHostedOnStrapiCloud, select, true {ADD SEATS} other {CONTACT SALES}}"},{isHostedOnStrapiCloud:a})},blockTransition:!0,onClose(){window.sessionStorage.setItem(`${l}-${M}`,"true")}})},[I,i,M,t,d,O,E,A,a,L])}}}]);