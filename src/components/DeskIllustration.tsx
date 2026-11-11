
export default function DeskIllustration() {
  // Substituir por public/assets/ensaio-principal.webp quando a fotografia original for exportada do Figma.
  return <svg className="desk-illustration" viewBox="0 0 470 520" role="img" aria-label="Ilustração temporária de uma mesa com computador portátil">
    <defs><linearGradient id="deskBg" x2=".9" y2="1"><stop stopColor="#f4f4f4"/><stop offset="1" stopColor="#bfbfbf"/></linearGradient><linearGradient id="laptopColor" x2="1" y2=".7"><stop stopColor="#282828"/><stop offset="1" stopColor="#555"/></linearGradient></defs>
    <rect width="470" height="520" fill="url(#deskBg)"/><path d="M0 60H470M0 210H470M0 362H470" stroke="#c5c5c5" strokeWidth="3" opacity=".6"/>
    <path d="M0 382 470 318V520H0Z" fill="#e5e5e5"/>
    <rect x="62" y="178" width="330" height="206" rx="14" transform="rotate(-4 62 178)" fill="#303030"/>
    <rect x="80" y="191" width="303" height="176" rx="4" transform="rotate(-4 80 191)" fill="url(#laptopColor)"/>
    <g transform="rotate(-4 235 260)" stroke="#9c9c9c" strokeWidth="3" opacity=".7"><path d="M110 230h94M110 246h132M110 263h77M110 279h143M110 298h124M110 314h83"/><path d="M279 229h64M279 247h77M279 266h68" stroke="#ddd"/></g>
    <path d="M48 390 391 363 456 422 95 465Z" fill="#c9c9c9"/><path d="m103 415 291-20" stroke="#9a9a9a" strokeWidth="4"/><path d="m115 430 271-20" stroke="#aaa" strokeWidth="3"/><ellipse cx="73" cy="446" rx="47" ry="11" fill="#bcbcbc"/><rect x="41" y="412" width="61" height="34" rx="4" fill="#f3f3f3"/><path d="M100 421c22-2 18 25-1 19" fill="none" stroke="#666" strokeWidth="5"/>
  </svg>;
}

