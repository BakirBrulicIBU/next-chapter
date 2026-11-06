export const Colors = {
  light: {
    text: '#15171C', 
    muted: '#5B6070', // secondary text: authors, labels
    background: '#F3F3EF',
    card: '#FFFFFF', 
    border: '#E6E6E1', 
    primary: '#2F4BFF', 
    onPrimary: '#FFFFFF', // text and icons on top of primary
    star: '#FFB020', 
    starOff: '#D9D9D3', // empty rating star
    finished: '#1E6B3F', // status pill text
    finishedSoft: '#DDF5E6', // status pill background
    reading: '#2336C7',
    readingSoft: '#E6EAFF',
    toRead: '#7A4F00',
    toReadSoft: '#FFF1D6',
  },
  dark: {
    text: '#F3F3EF',
    muted: '#9BA1AF',
    background: '#0F131A',
    card: '#1A1F29',
    border: '#2A303C',
    primary: '#7088FF', 
    onPrimary: '#0F131A',
    star: '#FFB020',
    starOff: '#3A404C',
    finished: '#7FE0A6',
    finishedSoft: '#173D2A',
    reading: '#AEBBFF',
    readingSoft: '#1F2756',
    toRead: '#FFD27A',
    toReadSoft: '#3D2E0D',
  },
} as const;

export type Theme = (typeof Colors)['light'];

export const Spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 } as const;
export const FontSize = { small: 13, body: 15, title: 17, hero: 30 } as const;
export const Radius = { sm: 12, md: 20, pill: 999 } as const;
