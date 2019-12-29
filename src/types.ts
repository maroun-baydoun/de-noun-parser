
export type Gender = 'm' | 'f' | 'n';

export type ParseResult = {
    gender: Gender,
    plural: string,
    genetive: string | null,
    diminutive?: string,
    genderedForm?: string,
};