const s = { display: "inline-flex", alignItems: "center", justifyContent: "center" };
const a = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };

export function HomeIcon(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24" {...props} style={{ ...s, ...props.style }}><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" {...a} /></svg>;
}

export function UserIcon(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24" {...props} style={{ ...s, ...props.style }}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" {...a} /><circle cx="12" cy="7" r="4" {...a} /></svg>;
}

export function GraduationIcon(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24" {...props} style={{ ...s, ...props.style }}><path d="M22 10v6M2 10l10-5 10 5-10 5z" {...a} /><path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5" {...a} /></svg>;
}

export function BoltIcon(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24" {...props} style={{ ...s, ...props.style }}><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" {...a} /></svg>;
}

export function BriefcaseIcon(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24" {...props} style={{ ...s, ...props.style }}><rect x="2" y="7" width="20" height="14" rx="2" ry="2" {...a} /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" {...a} /></svg>;
}

export function TrophyIcon(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24" {...props} style={{ ...s, ...props.style }}><path d="M6 9H4.5a2.5 2.5 0 010-5H6" {...a} /><path d="M18 9h1.5a2.5 2.5 0 000-5H18" {...a} /><path d="M6 9v2a6 6 0 0012 0V9" {...a} /><path d="M12 15v6" {...a} /><path d="M8 21h8" {...a} /></svg>;
}

export function EnvelopeIcon(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24" {...props} style={{ ...s, ...props.style }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" {...a} /><polyline points="22,6 12,13 2,6" {...a} /></svg>;
}

export function NoteIcon(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24" {...props} style={{ ...s, ...props.style }}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" {...a} /><polyline points="14,2 14,8 20,8" {...a} /><line x1="8" y1="13" x2="16" y2="13" {...a} /><line x1="8" y1="17" x2="16" y2="17" {...a} /></svg>;
}

export function ChevronDownIcon(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24" {...props} style={{ ...s, ...props.style }}><polyline points="6 9 12 15 18 9" {...a} /></svg>;
}

export function PaletteIcon(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24" {...props} style={{ ...s, ...props.style }}><circle cx="13.5" cy="6.5" r="1.5" fill="currentColor" /><circle cx="17.5" cy="10.5" r="1.5" fill="currentColor" /><circle cx="8.5" cy="7.5" r="1.5" fill="currentColor" /><circle cx="6.5" cy="12.5" r="1.5" fill="currentColor" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-1 0-.83.67-1.5 1.5-1.5H16c3.31 0 6-2.69 6-6 0-5.5-4.5-10-10-10z" {...a} /></svg>;
}

export function GithubIcon(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24" {...props} style={{ ...s, ...props.style }}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" {...a} /></svg>;
}

export function LinkedinIcon(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24" {...props} style={{ ...s, ...props.style }}><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" {...a} /><rect x="2" y="9" width="4" height="12" {...a} /><circle cx="4" cy="4" r="2" {...a} /></svg>;
}

export function TwitterIcon(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24" {...props} style={{ ...s, ...props.style }}><path d="M4 4l11.733 16h4.267l-11.733 -16zM4 20l6.768 -6.768M19.5 4l-6.768 6.768" {...a} /></svg>;
}

export function YoutubeIcon(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24" {...props} style={{ ...s, ...props.style }}><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33 2.78 2.78 0 001.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" {...a} /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" {...a} /></svg>;
}

export function InstagramIcon(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24" {...props} style={{ ...s, ...props.style }}><rect x="2" y="2" width="20" height="20" rx="5" ry="5" {...a} /><circle cx="12" cy="12" r="5" {...a} /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" /></svg>;
}

export function AwardIcon(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 24 24" {...props} style={{ ...s, ...props.style }}><circle cx="12" cy="8" r="7" {...a} /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" {...a} /></svg>;
}

export function DownloadIcon(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24" {...props} style={{ ...s, ...props.style }}><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" {...a} /><polyline points="7 10 12 15 17 10" {...a} /><line x1="12" y1="15" x2="12" y2="3" {...a} /></svg>;
}

export function BookIcon(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24" {...props} style={{ ...s, ...props.style }}><path d="M4 19.5A2.5 2.5 0 016.5 17H20" {...a} /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" {...a} /></svg>;
}

export function CalendarIcon(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24" {...props} style={{ ...s, ...props.style }}><rect x="3" y="4" width="18" height="18" rx="2" ry="2" {...a} /><line x1="16" y1="2" x2="16" y2="6" {...a} /><line x1="8" y1="2" x2="8" y2="6" {...a} /><line x1="3" y1="10" x2="21" y2="10" {...a} /></svg>;
}

export function MapPinIcon(props) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24" {...props} style={{ ...s, ...props.style }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" {...a} /><circle cx="12" cy="10" r="3" {...a} /></svg>;
}
